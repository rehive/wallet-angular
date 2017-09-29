(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        cookieManagement.deleteCookie('TOKEN');
        $scope.showAuthNav = true;
        $scope.path = $location.path();

        $scope.login = function(user, password) {
            $rootScope.$pageFinishedLoading = false;

            $http.post(environmentConfig.API + '/auth/login/', {
                user: user,
                company: environmentConfig.COMPANY,
                password: password
            }).then(function (res) {
                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    vm.checkMultiFactorAuthEnabled(res.data.data.token);

                }
            }).catch(function (error) {
                $scope.gotCompanyName = false;
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.checkMultiFactorAuthEnabled = function (token) {
            if(token) {
                $http.get(environmentConfig.API + '/auth/mfa/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        var enabledObj = vm.checkMultiFactorAuthEnabledFromData(res.data.data);
                        if(enabledObj.enabled){
                            $rootScope.$pageFinishedLoading = true;
                            $location.path('/authentication/multi-factor/verify/' + enabledObj.key).search({prevUrl: 'login'});
                        } else {
                            $location.path('/home');
                            $rootScope.$pageFinishedLoading = true;
                        }

                    }
                }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.checkMultiFactorAuthEnabledFromData = function(multiFactorAuthObj){
            var enabledObj = {enabled: false,key: ''};
            for (var key in multiFactorAuthObj) {
                if (multiFactorAuthObj.hasOwnProperty(key)) {
                    if(multiFactorAuthObj[key] == true){
                        enabledObj.enabled = true;
                        enabledObj.key = key;
                        break;
                    }
                }
            }
            return enabledObj;
        };

    }
})();
