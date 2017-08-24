from invoke import Collection, task
from etc.tasks import local_tasks
from etc.tasks import k8s_tasks
from etc.tasks import server_tasks
import base64

@task
def base64encode(ctx, string):
    encoded = base64.b64encode(bytes(string, "utf-8"))
    ctx.run('echo ' + encoded.decode("utf-8"))

ns = Collection()
ns.add_collection(Collection.from_module(local_tasks, name='local'))
ns.add_collection(Collection.from_module(k8s_tasks, name='k8s'))
ns.add_collection(Collection.from_module(server_tasks, name='server'))
ns.add_task(base64encode, name='base64')
