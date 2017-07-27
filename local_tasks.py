from invoke import task
from invoke.exceptions import Failure
import json
import yaml
import semver
import dotenv
import os

from distutils.util import strtobool
from invoke.exceptions import ParseError


def get_config(config):
    """Import config file as dictionary"""
    if config[-5:] != '.yaml':
        config += '.yaml'

    dir_path = os.path.dirname(os.path.realpath(__file__))
    server_dir_path = dir_path
    if not os.path.isabs(config):
        config = os.path.join(server_dir_path, config)

    with open(config, 'r') as stream:
        config_dict = yaml.load(stream)

    return config_dict


@task
def compose(ctx, cmd='--help', version='latest'):
    """
    Local only function: Wrapper for docker-compose
    """
    config_dict = get_config('local')
    image_name = config_dict['IMAGE']
    if version:
        image_name += ':' + version

    dir_path = os.path.dirname(os.path.realpath(__file__))
    env_file = os.path.join(dir_path, config_dict.get('ENV_FILE', ''))

    env_vars = ("IMAGE_NAME={image_name} "
                "ENV_FILE={env_file} "
                "CELERY_ID={celery_id}  "
                "COMPOSE_PROJECT_NAME={compose_project_name} "
                "POSTGRES_PORT={postgres_port} "
                ).format(image_name=image_name,
                         env_file=env_file,
                         celery_id=config_dict.get('CELERY_ID', ''),
                         compose_project_name=config_dict['PROJECT_NAME'],
                         postgres_port=config_dict.get('POSTGRES_PORT', 5432))

    path = 'etc/compose/docker-compose.yml'

    ctx.run(
        '{env} docker-compose -f {path} {cmd}'.format(env=env_vars, cmd=cmd, path=path))


@task
def manage(ctx, cmd):
    """Wrapper for manage function"""
    config_dict = get_config('local')
    venv_python = config_dict['VENV_PYTHON']

    # Switched to run via fabric as invoke was not displaying stdout correctly
    ctx.run('{python} src/manage.py {cmd}'.format(python=venv_python, cmd=cmd), pty=True)


@task
def build(ctx, config, version_tag):
    """
    Build project's docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name, version_tag)

    prebuild(ctx, config, version_tag)

    cmd = 'docker build -t %s .' % image
    ctx.run(cmd, echo=True)
    return image


@task
def create_build_image(ctx, config, version_tag):
    """
    Build project's docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name + '-js-build', version_tag)

    cmd = 'docker build -f etc/docker/jsbuild -t {image} .'.format(image=image)
    ctx.run(cmd, echo=True)
    return image


@task
def push_build_image(ctx, config, version_tag):
    """
    Build, tag and push docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name + '-js-build', version_tag)

    ctx.run('gcloud docker -- push %s' % image, echo=True)


@task
def prebuild(ctx, config, version_tag):
    """
    Pre-build steps
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name + '-js-build', version_tag)
    env_string = ':staging' if 'staging' in config else ''

    # Compile js using docker image:
    try:
        ctx.run(
            "docker run --rm -v $PWD/release:/app/release:rw {image} bash -c 'gulp clean && gulp build{env_string}'".format(
                image=image,
                env_string=env_string),
            echo=True)

    # If the build image is not found, build it and then run
    except Failure:
        create_build_image(ctx, config, version_tag)
        push_build_image(ctx, config, version_tag)
        ctx.run(
            "docker run --rm -v $PWD/release:/app/release:rw {image} bash -c 'gulp clean && gulp build{env_string}'".format(
                image=image,
                env_string=env_string),
            echo=True)


@task
def push(ctx, config, version_tag):
    """
    Build, tag and push docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name, version_tag)

    ctx.run('gcloud docker -- push %s' % image, echo=True)


@task
def next_version(ctx, bump='prerelease'):
    """
    Returns incremented version number by looking at git tags
    """
    # Get latest git tag:
    latest_tag = latest_version(ctx)

    if latest_tag:
        increment = {'prerelease': semver.bump_prerelease,
                     'patch': semver.bump_patch,
                     'minor': semver.bump_minor,
                     'major': semver.bump_major}

        incremented = increment[bump](latest_tag)

    else:
        incremented = '0.0.1'

    print(incremented)

    return incremented


@task
def latest_version(ctx):
    """Checks the git tags and returns the current latest version"""
    ctx.run('git fetch && git fetch --tags')
    result = ctx.run('git tag --sort=-v:refname', hide='both')
    latest_tag = result.stdout.split('\n')[0]
    print(latest_tag)
    return latest_tag


@task
def git_release(ctx, version_bump='prerelease'):
    """
    Bump version, push git tag
    N.B. Commit changes first
    """

    confirm('Did you remember to commit all changes? ')

    bumped_version = next_version(ctx, bump=version_bump)
    tag = bumped_version
    comment = 'Version ' + bumped_version

    # Create an push git tag:
    ctx.run("git tag '%s' -m '%s'" % (tag, comment), echo=True)
    ctx.run("git push origin %s" % tag, echo=True)

    print('Tag: {}\n'.format(tag))


@task
def docker_release(ctx, config):
    """Build and push docker images for current release"""
    config_dict = get_config(config)

    # Create, tag and push docker image:
    tag = latest_version(ctx)

    image_name = config_dict['IMAGE'].split(':')[0]
    build(ctx, config, tag)
    push(ctx, config, tag)

    print('Release Info:\n'
          'Tag: {}\n'
          'Image: {}\n'.format(tag, image_name))


def confirm(prompt='Continue?\n', failure_prompt='User cancelled task'):
    '''
    Prompt the user to continue. Repeat on unknown response. Raise
    ParseError on negative response
    '''
    response = input(prompt)

    try:
        response_bool = strtobool(response)
    except ValueError:
        print('Unkown Response. Confirm with y, yes, t, true, on or 1; cancel with n, no, f, false, off or 0.')
        confirm(prompt, failure_prompt)

    if not response_bool:
        raise ParseError(failure_prompt)
