(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($rootScope,$scope,$http,toastr,environmentConfig,errorToasts,$location,cookieManagement) {

        //var vm = this;
        $scope.path = $location.path();
        $scope.havePersonalDetails = false;
        $scope.registerData = {
            first_name: '',
            last_name: '',
            email: '',
            nationality: '',
            password: ''
        };

        $scope.registerUser = function() {
            $rootScope.$pageFinishedLoading = false;
            $http.post(environmentConfig.API + '/auth/company/register/', $scope.registerData)
                .then(function (res) {
                    if (res.status === 201) {
                        cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                        $rootScope.$pageFinishedLoading = true;
                        $rootScope.userVerified = false;
                        $rootScope.newUser = true;
                    $location.path('/verification');
                    } else {

                    }
            }).catch(function (error) {
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.fixformat = function(){
            $scope.registerData.company = $scope.registerData.company.toLowerCase();
            $scope.registerData.company = $scope.registerData.company.replace(/ /g, '_');
        }

    }
})();
