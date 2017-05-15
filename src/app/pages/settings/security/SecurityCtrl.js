(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SecurityCtrl', SecurityCtrl);

    /** @ngInject */
    function SecurityCtrl($rootScope,$scope,$location,API,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.changePassword = function(){
            $location.path('/password/change');
        };

        $scope.enableTwoFactorAuth = function(){
            $location.path('/authentication/two-factor');
        };

    }
})();
