(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDocumentsCtrl', UserDocumentsCtrl);

    /** @ngInject */
    function UserDocumentsCtrl($scope,environmentConfig,$uibModal,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserDocuments = true;

        vm.getUserDocuments = function(){
            if(vm.token) {
                $scope.loadingUserDocuments = true;
                $http.get(environmentConfig.API + '/admin/users/documents/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserDocuments = false;
                    if (res.status === 200) {
                      $scope.userDocuments = res.data.data.results;
                    }
                }).catch(function (error) {
                    $scope.loadingUserDocuments = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserDocuments();

        $scope.openUserDocumentModal = function (page, size, document) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserDocumentModalCtrl',
                scope: $scope,
                resolve: {
                    document: function () {
                        return document;
                    }
                }
            });

            vm.theModal.result.then(function(document){
                if(document){
                    vm.getUserDocuments();
                }
            }, function(){
            });
        };

        $scope.openAddUserDocumentModal = function (page, size) {
            vm.theAddModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'AddUserDocumentModalCtrl',
                scope: $scope,
                resolve: {
                    uuid: function () {
                        return vm.uuid;
                    }
                }
            });

            vm.theAddModal.result.then(function(){
                vm.getUserDocuments();
            }, function(){
            });
        };



    }
})();
