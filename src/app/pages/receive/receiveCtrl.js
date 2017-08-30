(function () {
    'use strict';

    angular.module('BlurAdmin.pages.receive')
        .controller('ReceiveCtrl', ReceiveCtrl);

    /** @ngInject */
    function ReceiveCtrl($rootScope,$scope,$location,toastr,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCurrencies = true;
        $scope.showView = '';

        vm.getUserInfo = function(){
            if(vm.token) {
                $scope.loadingUserInfo = true;
                $http.get(environmentConfig.API + '/user/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingUserInfo = false;
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                        console.log($scope.user);
                    }
                }).catch(function (error) {
                    $scope.loadingCurrencies = false;
                    if(error.status == 403){
                        errorHandler.handle403();
                        return;
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserInfo();

        $scope.addressCopied = function(){
            toastr.success('Address copies','Message');
        }
    }

})();
