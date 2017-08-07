(function () {
    'use strict';

    angular.module('BlurAdmin.pages.confirmMobile')
        .controller('ConfirmMobileCtrl', ConfirmMobileCtrl);

    /** @ngInject */
    function ConfirmMobileCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();
    }
})();
