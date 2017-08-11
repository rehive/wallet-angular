(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('RegisterProgressCtrl', RegisterProgressCtrl);

    /** @ngInject */
    function RegisterProgressCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();

        // $scope.login = function(user, password) {
        //     $rootScope.$pageFinishedLoading = false;
        //
        //     $http.post(environmentConfig.API + '/auth/login/', {
        //         user: user,
        //         company: environmentConfig.COMPANY,
        //         password: password
        //     }).then(function (res) {
        //         if (res.status === 200) {
        //             $rootScope.notRegistering = true;
        //             cookieManagement.setCookie('TOKEN','Token ' + res.data.data.token);
        //             cookieManagement.setCookie('User', res.data.data.token);
        //             $rootScope.USER = res.data.data.user;
        //
        //             $location.path('/home');
        //             $rootScope.$pageFinishedLoading = true;
        //
        //         }
        //     }).catch(function (error) {
        //         $rootScope.$pageFinishedLoading = true;
        //         errorToasts.evaluateErrors(error.data);
        //     });
        // };

    }
})();
