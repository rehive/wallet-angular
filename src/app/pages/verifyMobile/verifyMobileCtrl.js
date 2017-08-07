(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyMobile')
        .controller('VerifyMobileCtrl', VerifyMobileCtrl);

    /** @ngInject */
    function VerifyMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();
    }
})();
