(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,stringService) {

        var vm = this;

        $scope.login = function(identifier, company_id, password) {
            $rootScope.$pageFinishedLoading = false;

            $http.post(API + '/auth/login/', {
                identifier: identifier,
                company_id: company_id,
                password: password
            }).then(function (res) {
                $rootScope.$pageFinishedLoading = true;
                if (res.status === 200) {
                    cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
                    var companyName = vm.getCompanyName(res.data.data.user.company.split("_"));
                    cookieManagement.setCookie('COMPANY',companyName);
                    toastr.success('You have successfully logged in with the email address ' + res.data.data.user.email +'!');
                    $location.path('/dashboard');
                }
            }).catch(function (error) {
                $rootScope.$pageFinishedLoading = true;
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.getCompanyName = function(companyNameArray){
            var companyName = '';
            companyNameArray.forEach(function(word){
                companyName += stringService.capitalizeWord(word) + ' ';
            });
            return companyName;
        };

    }
})();
