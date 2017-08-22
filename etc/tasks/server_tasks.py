from invoke import task
import json
import yaml
import semver
import dotenv

from fabric.api import run, local
from fabric.tasks import execute

from .fabfile import set_env
from .fabfile import upload as fab_upload
from .fabfile import build as fab_build
from .fabfile import push as fab_push
from .utils import get_config, latest_version

import os

# Build Server Commands:
@task
def upload(ctx, config):
    """Rsync project to server"""
    execute(set_env, config)
    execute(fab_upload)

@task
def build(ctx, config, version_tag, packages=False):
    """
    Build project's docker image on remote server using fabric
    """
    upload(ctx, config)
    execute(set_env, config, version_tag)
    execute(fab_build)

@task
def push(ctx, config, version_tag):
    """Push image to container registry"""
    execute(set_env, config, version_tag)
    execute(fab_push)

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
