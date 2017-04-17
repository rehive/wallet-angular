(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SecurityCtrl', SecurityCtrl);

    /** @ngInject */
    function SecurityCtrl($rootScope,$scope,$location,API,IMAGEURL,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $scope.changePassword = function(){
            $location.path('/changePassword');
        };

        $scope.enableTwoFactorAuth = function(){
            $location.path('/twoFactorAuthentication');
        };

    }
})();
