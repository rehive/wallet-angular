(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDocumentsCtrl', UserDocumentsCtrl);

    /** @ngInject */
    function UserDocumentsCtrl($scope,environmentConfig,$stateParams,$http,cookieManagement,errorToasts,toastr) {

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



    }
})();
