from invoke import task
import json
import yaml
import semver
import dotenv

from fabric.api import run, local
from fabric.tasks import execute

import fabfile as fab

import os

from distutils.util import strtobool
from invoke.exceptions import ParseError

# Utility functions

def format_yaml(template, config):
    """Replace in ${ENV_VAR} in template with value"""
    formatted = template
    for k, v in config.items():
        formatted = formatted.replace('${%s}' % k, v)
    return formatted


def get_config(config):
    """Import config file as dictionary"""
    if config[-5:] != '.yaml':
        config += '.yaml'

    # Use /server as base path
    dir_path = os.path.dirname(os.path.realpath(__file__))
    server_dir_path = dir_path
    if not os.path.isabs(config):
        config = os.path.join(server_dir_path, config)

    with open(config, 'r') as stream:
        config_dict = yaml.load(stream)

    return config_dict


# Build Server Commands:
@task
def upload(ctx, config):
    """Rsync project to server"""
    execute(fab.set_env, config)
    execute(fab.upload)

@task
def create_build_image(ctx, config, version_tag):
    upload(ctx, config)
    execute(fab.set_env, config, version_tag)
    execute(fab.create_build_image)

@task
def build(ctx, config, version_tag, packages=False):
    """
    Build project's docker image on remote server using fabric
    """
    upload(ctx, config)
    execute(fab.set_env, config, version_tag)
    execute(fab.build)

@task
def push(ctx, config, version_tag):
    """Push image to container registry"""
    upload(ctx, config)
    execute(fab.set_env, config, version_tag)
    execute(fab.push)

@task
def compose(ctx, cmd, config, version_tag):
    """Push image to container registry"""
    execute(fab.set_env, config, version_tag)
    execute(fab.compose, cmd, version_tag)


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
def docker_release(ctx, config):
    """Build and push docker images for current release"""
    config_dict = get_config(config)

    # Create, tag and push docker image:
    tag = latest_version(ctx)

    image_name = config_dict['IMAGE'].split(':')[0]
    # build(ctx, config, tag) # included in push for now.
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
