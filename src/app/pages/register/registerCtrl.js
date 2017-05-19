(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($rootScope,$scope,$http,toastr,API,errorToasts,$location,cookieManagement,stringService) {

        var vm = this;

        $scope.registerUser = function(first_name,last_name, email, mobile_number, company_id, password1, password2) {
            $rootScope.$pageFinishedLoading = false;
            $http.post(API + '/auth/company/register/', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile_number: mobile_number,
                company_id: company_id,
                password1: password1,
                password2: password2
            }).then(function (res) {
                if (res.status === 201) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    //cookieManagement.setCookie('COMPANY',companyName);
                    $rootScope.$pageFinishedLoading = true;
                    $location.path('/verification');
                } else {
                 }
            }).catch(function (error) {
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
