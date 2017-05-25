import os
import dotenv
import yaml
from io import BytesIO

from fabric.api import env, local, run, task, settings, abort, put, cd, prefix, get, sudo, shell_env, open_shell, prompt, lcd
from fabric.colors import red, green, yellow, white
from fabric.context_managers import hide
from fabric.contrib.project import rsync_project
import posixpath

def set_env():
    """
    Fabric environmental variable setup
    """
    env.local_dotenv_path = os.path.join(os.path.dirname(__file__), '.buildserver.env')
    dotenv.load_dotenv(env.local_dotenv_path)
    env.project_name = os.environ.get('PROJECT_NAME', '')
    env.project_dir = posixpath.join('/srv/images/', env.project_name)
    env.use_ssh_config = True

    # Bug: when setting this inside a function. Using host_string as workaround
    env.hosts = [os.environ.get('HOST_NAME', ''), ]
    env.host_string = os.environ.get('HOST_NAME', '')

    env.base_image_name = os.environ.get('BASE_IMAGE_NAME', '')
    env.build_dir = '/srv/build'
    env.local_path = os.path.dirname(__file__)

def B():
    """
    Shortcut to set build server environment
    """
    set_env()

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

    file_buffer = BytesIO()
    with cd(env.project_dir):
        get(config, file_buffer)
    config_dict = yaml.load(file_buffer.getvalue())

    return config_dict

def upload():
    """Upload entire project to build server"""
    rsync_project(
        env.project_dir, './',
        exclude=(
            '.git', '.gitignore', '__pycache__', '*.pyc', '.DS_Store', 'environment.yml',
            'fabfile.py', 'Makefile', '.idea', 'bower_components', 'node_modules',
            '.env.example', 'README.md', 'var'
        ), delete=True)

# Wrapper Functions:
def docker(cmd='--help'):
    """
    Wrapper for docker
    """
    set_env()
    template = 'docker {cmd}'.format(cmd=cmd)
    run(template)

def compose(cmd='--help', path=''):
    """
    Wrapper for docker-compose
    """
    set_env()
    with cd(path):
        run('docker-compose {cmd}'.format(cmd=cmd))

# App Image Builder:
def gcloud_login():
    """Authorise gcloud on build server"""
    #  TODO: figure out service accounts
    with cd(env.project_dir):
        run('gcloud auth login')

def build(config, version_tag):
    """
    Build project's docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name, version_tag)

    cmd = 'docker build -t %s .' % image
    with cd(env.project_dir):
        run(cmd)
    return image

def push(config, version_tag):
    """
    Build, tag and push docker image
    """
    config_dict = get_config(config)
    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name, version_tag)

    build(config, version_tag)
    with cd(env.project_dir):
        run('gcloud docker -- push %s' % image)
