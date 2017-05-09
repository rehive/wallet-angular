(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('AccountInfoCtrl', AccountInfoCtrl);

    /** @ngInject */
    function AccountInfoCtrl($scope,API,errorHandler,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingAccountInfo = true;
        vm.updatedAdministrator = {};

        $scope.accountInfoChanged = function(field){
            vm.updatedAdministrator[field] = $scope.administrator[field];
        };

        vm.getAdminAccountInfo = function () {
            if(vm.token) {
                $http.get(API + '/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAccountInfo = false;
                    if (res.status === 200) {
                        $scope.administrator = res.data.data;
                    }
                }).catch(function (error) {
                  console.log(error);
                    $scope.loadingAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getAdminAccountInfo();

        $scope.updateAdministratorAccount = function(){
            $scope.loadingAccountInfo = true;
            $http.patch(API + '/user', vm.updatedAdministrator ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingAccountInfo = false;
                if (res.status === 200) {
                    $scope.administrator = res.data.data;
                    toastr.success('You have successfully updated the administrator info!');
                }
                vm.updatedAdministrator = {};
            }).catch(function (error) {
                vm.updatedAdministrator = {};
                $scope.loadingAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
