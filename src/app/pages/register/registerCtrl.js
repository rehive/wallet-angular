(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($rootScope,$scope,$http,toastr,environmentConfig,errorToasts,$location,cookieManagement) {

        var vm = this;
        $scope.path = $location.path();
        $scope.havePersonalDetails = false;
        $scope.registerData = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            nationality: '',
            ageVerification: false
        };

        $scope.registerUser = function() {
            $rootScope.$pageFinishedLoading = false;
            var registerInfo = {
                first_name: $scope.registerData.first_name,
                last_name: $scope.registerData.last_name,
                email: $scope.registerData.email,
                company: environmentConfig.COMPANY,
                password1: $scope.registerData.password,
                password2: $scope.registerData.password
            };
            $http.post(environmentConfig.API + '/auth/register/',registerInfo)
                .then(function (res) {
                    if (res.status === 201) {
                        cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                        $rootScope.userEmailVerified = false;
                        $rootScope.userMobileVerified = false;
                        $rootScope.notRegistering = false;
                        vm.addNationality('Token ' + res.data.data.token);
                    }
            }).catch(function (error) {
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.addNationality = function(token){
            if(token){
                $http.patch(environmentConfig.API + '/user/', {nationality: $scope.registerData.nationality},{
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    })
                    .then(function (res) {
                        if (res.status === 200) {
                            $rootScope.$pageFinishedLoading = true;
                            $location.path('email/verify');
                        }
                    }).catch(function (error) {
                    $rootScope.$pageFinishedLoading = true;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };


    }
})();
