(function () {
    'use strict';

    angular.module('BlurAdmin.pages.login')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location) {

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
                    cookieManagement.setCookie('COMPANY',res.data.data.user.company);
                    toastr.success('You have successfully logged in with the email address ' + res.data.data.user.email +'!');
                    $location.path('/dashboard');
                }
            }).catch(function (error) {

                console.log(error);
                $rootScope.$pageFinishedLoading = true;
                toastr.error(error.data.message);
            });
        };

    }
})();
