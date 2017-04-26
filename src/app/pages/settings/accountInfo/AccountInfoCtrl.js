(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('AccountInfoCtrl', AccountInfoCtrl);

    /** @ngInject */
    function AccountInfoCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingAccountInfo = true;
        vm.updatedAdministrator = {};

        $scope.accountInfoChanged = function(field){
            vm.updatedAdministrator[field] = $scope.administrator[field];
        };

        vm.getAdminAccountInfo = function () {
            $http.get(API + '/user', {
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
                $scope.loadingAccountInfo = false;
                errorToasts.evaluateErrors(error.data);
            });
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
                }
                vm.updatedAdministrator = {};
            }).catch(function (error) {
                vm.updatedAdministrator = {};
                $scope.loadingAccountInfo = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
