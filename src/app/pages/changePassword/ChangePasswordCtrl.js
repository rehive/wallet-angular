(function () {
    'use strict';

    angular.module('BlurAdmin.pages.changePassword')
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    /** @ngInject */
    function ChangePasswordCtrl($rootScope,$scope,$http,API,cookieManagement,errorToasts,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.goToDashboard = function(){
            $rootScope.securityConfigured = true;
            $location.path('/dashboard');
        }



    }
})();
