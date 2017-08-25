# Rehive Angular admin dashboard

### Dashboard | Management and operations

Rehive's dashboard is designed to help you manage your product from end-to-end:
* invite new users, collect KYC documents, verify user information,
* clear deposits and withdrawals, manage and review transactions,
* manage customer support,
* set transaction fees, set transaction limits, set notification preferences,
* configure employee and user permissions
* and more.

### Open-source

Rehive's back office dashboard is an open sourced project in Angular JS which advanced users can host in order to extend functionality.

### Getting started

* fork the repository
* git clone  `https://github.com/{{username}}/dashboard-angular.git`,
* cd into `dashboard-angular`
* run `npm install` to install the dependencies,
* to run local copy in development mode, execute: `gulp serve`,
* to run local copy in staging mode, with the rehive staging API (`https://staging.rehive.com/api/3/`), execute: `gulp serve:staging`,
* to run local copy in production mode, execute: `gulp serve:dist`.

Deployment pre-requisites:
--------------------------
1. `pip install invoke python-dotenv fabric3 pyyaml semver nose`
2. Helm client: https://docs.helm.sh/using_helm/#installing-helm

Deployment:
-----------
1. Commit all changes and then tag and push the release with the following command:  
`inv local.git_release`  
The default version increment is `prerelease`, but you can also specify `patch`, `minor` or `major`:
`inv local.git_release -v patch`

2. Build and push the docker image for this release:  
`inv local.docker_release production` or `inv server.docker_release production`

3. Update kubernetes deployment using the version number of the release. E.g.  
`inv k8s.upgrade production 0.0.1`

### Where can I learn more ?

Check us out at [Rehive](http://www.rehive.com/)

License
-------------
<a href=/LICENSE.txt target="_blank">MIT</a> license.
