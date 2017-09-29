(function () {
    'use strict';

    angular.module('BlurAdmin.pages.multiFactorAuth')
        .controller('MultiFactorAuthCtrl', MultiFactorAuthCtrl);

    /** @ngInject */
    function MultiFactorAuthCtrl($scope,$http,environmentConfig,cookieManagement,errorToasts,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.getMfa = function(){
            if(vm.token) {
                $scope.loadingMfa = true;
                $http.get(environmentConfig.API + '/auth/mfa/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.multiFactorAuthOptions = res.data.data;
                        $scope.loadingMfa = false;
                    }
                }).catch(function (error) {
                    $scope.loadingMfa = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        $scope.getMfa();

        $scope.goToMultiAuthMethod = function (path) {
            if(path == 'sms'){
                $location.path('/authentication/multi-factor/' + path);
            } else {
                $location.path('/authentication/multi-factor/verify/' + path);
            }
        };


    }
})();
