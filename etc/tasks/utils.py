import os
import yaml
from invoke import task
import semver

# Utility functions
def get_path():
    file_path = os.path.dirname(os.path.realpath(__file__))
    root_path = os.path.dirname(os.path.dirname(file_path))
    return root_path


def format_yaml(template, config):
    """Replace in ${ENV_VAR} in template with value"""
    formatted = template
    for k, v in config.items():
        formatted = formatted.replace('${%s}' % k, v)
    return formatted


def get_config(config):
    """Import config file as dictionary"""

    config += '.yaml'

    server_dir_path = get_path()
    if not os.path.isabs(config):
        config = os.path.join(server_dir_path, config)

    with open(config, 'r') as stream:
        config_dict = yaml.load(stream)

    return config_dict


def get_env(config):
    """Read env variables from file"""
    if config[-5:] == '.yaml':
        config = config[:-5]
    file_path = get_path() + '/etc/env/' + config + '.env'
    with open(file_path, 'r') as f:
        output = f.read()
        output = output.split('\n')
    env_dict = {k: v for k, v in (line.split(
        '=', maxsplit=1) for line in output if line)}
    return env_dict


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
