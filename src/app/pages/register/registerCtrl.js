(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($rootScope,$scope,$http,toastr,API,errorToasts,$location,cookieManagement) {

        //var vm = this;
        $scope.registerData = {
            first_name: '',
            last_name: '',
            email: '',
            mobile_number: '',
            company: '',
            password1: '',
            password2: ''
        };

        $scope.registerUser = function() {
            $rootScope.$pageFinishedLoading = false;
            $http.post(API + '/auth/company/register/', $scope.registerData)
                .then(function (res) {
                    if (res.status === 201) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    $rootScope.$pageFinishedLoading = true;
                    $rootScope.userVerified = false;
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
