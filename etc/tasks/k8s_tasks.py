from invoke import task
import fabfile as fab
import json
import yaml
import semver
import dotenv

import os

from .utils import get_path, format_yaml, get_config, get_env


@task
def install(ctx, config):
    """
    Installs kubernetes deployment
    """

    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    ctx.run('helm install --name {project_name} '
            '--namespace {namespace} '
            '-f ./etc/k8s/{config}/values.yaml '
            './etc/k8s/rehive-angular-chart'.format(project_name=config_dict['PROJECT_NAME'],
                                              config=config,
                                              namespace=config_dict['NAMESPACE']), echo=True)


@task
def upgrade(ctx, config, version):
    """
    Upgrades kubernetes deployment
    """

    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    ctx.run('helm upgrade {project_name} '
            './etc/k8s/rehive-angular-chart '
            '-f ./etc/k8s/{config}/values.yaml '
            '--set image.tag={version}'.format(project_name=config_dict['PROJECT_NAME'],
                                               config=config,
                                               version=version), echo=True)


@task
def kubectl(ctx, config, cmd):
    """Wrapper for the kubectl command"""
    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    ctx.run('kubectl {cmd} --namespace {namespace}'.format(cmd=cmd,
                                                           namespace=config_dict['NAMESPACE']), echo=True, pty=True)


@task
def run(ctx, config, version_tag, cmd, interactive=False):
    """Wrapper for kubectl run"""
    set_project(ctx, config)
    set_cluster(ctx, config)

    config_dict = get_config(config)
    env_dict = get_env(config)

    env_strings = []
    for k, v in env_dict.items():
        env_strings.append('%s="%s"' % (k, v))

    env = ','.join(env_strings)

    image_name = config_dict['IMAGE'].split(':')[0]
    image = '{}:{}'.format(image_name, version_tag)

    kubectl(ctx,
            config,
            'run --image={image} '
            '{project_name}-run '
            '--restart="Never" '
            '--env {env} '
            '--attach=True '
            '--tty={tty} --stdin={stdin} '
            '--rm {cmd}'.format(image=image,
                                project_name=config_dict['PROJECT_NAME'],
                                cmd=cmd,
                                env=env,
                                stdin=interactive,
                                tty=interactive))


@task
def manage(ctx, config, version_tag, cmd, interactive=False):
    """Wrappper for django's manage.py"""
    run(ctx, config, version_tag,
        'python manage.py {cmd}'.format(cmd=cmd), interactive=interactive)


@task
def upload_static(ctx, config):
    """Upload static files to gcloud bucket"""
    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    venv_python = config_dict['VENV_PYTHON']

    ctx.run(
        'echo "yes\n" | {python} src/manage.py collectstatic'.format(python=venv_python))
    ctx.run('gsutil -m rsync -d -r var/www/static gs://' +
            config_dict['GCLOUD_STATIC_BUCKET'] + '/')


@task
def create_bucket(ctx, config):
    """Creates gcloud bucket for static files"""
    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    bucket_name = config_dict['GCLOUD_STATIC_BUCKET']
    ctx.run('gsutil mb gs://{bucket_name}'.format(bucket_name=bucket_name))
    ctx.run(
        'gsutil defacl set public-read gs://{bucket_name}'.format(bucket_name=bucket_name))


@task
def secrets(ctx, config):
    """
    Updates kubernetes deployment to use specified version
    """
    config_dict = get_config(config)
    set_project(ctx, config)
    set_cluster(ctx, config)

    ctx.run(
        'kubectl delete secret {project_name} --namespace {namespace}'.format(
            project_name=config_dict['PROJECT_NAME'],
            namespace=config_dict['NAMESPACE']), warn=True)

    ctx.run(
        'kubectl create secret generic {project_name} --namespace {namespace} --from-env-file ./etc/env/{config}.env'.format(
            project_name=config_dict['PROJECT_NAME'],
            namespace=config_dict['NAMESPACE'],
            config=config))


@task
def ip(ctx, config):
    """
    Updates kubernetes deployment to use specified version
    """

    set_project(ctx, config)
    set_cluster(ctx, config)
    ctx.run('kubectl describe svc nginx --namespace nginx-ingress', echo=True)


@task
def live(ctx, config):
    """Checks which version_tag is live"""
    set_project(ctx, config)
    set_cluster(ctx, config)

    config_dict = get_config(config)

    result = ctx.run('kubectl get deployment/{} --output=json --namespace={}'.format(config_dict['PROJECT_NAME'],
                                                                                     config_dict['NAMESPACE']),
                     echo=True,
                     hide='stdout')

    server_config = json.loads(result.stdout)
    image = server_config['spec']['template']['spec']['containers'][0]['image']
    print(image)
    return image


@task
def execute(ctx, config, container, command):
    config_dict = get_config(config)

    result = ctx.run(
        'kubectl exec {} {} --namespace={}'.format(container,
                                                   command,
                                                   config_dict['NAMESPACE']),
        echo=True
    )


@task
def create_volume(ctx, name, zone, size, type='pd-standard'):
    ctx.run('gcloud compute disks create {name} --zone {zone} --size {size} --type {type}'.format(name=name,
                                                                                                  size=size,
                                                                                                  zone=zone,
                                                                                                  type=type))


# Cluster Management:
@task
def set_project(ctx, config):
    """Sets the active gcloud project"""
    config_dict = get_config(config)
    ctx.run('gcloud config set project {project}'.format(project=config_dict['CLUSTER_PROJECT']))


@task
def set_cluster(ctx, config):
    """Sets the active cluster"""
    config_dict = get_config(config)
    ctx.run('gcloud container clusters get-credentials {cluster} --zone europe-west1-c --project {project}'.format(
        cluster=config_dict['CLUSTER'],
        project=config_dict['CLUSTER_PROJECT']),
        echo=True)

@task
def redis(ctx, config):
    """Install redis"""
    set_project(ctx, config)
    set_cluster(ctx, config)
    config_dict = get_config(config)
    ctx.run('helm install --name redis --set usePassword=false,persistence.enabled=false --namespace {namespace} stable/redis'.format(
        namespace=config_dict['NAMESPACE']),
        echo=True)

@task
def proxy(ctx, config, port=8001):
    set_project(ctx, config)
    set_cluster(ctx, config)
    config_dict = get_config(config)
    ctx.run('kubectl proxy -p {port}'.format(port=port),
            echo=True)


