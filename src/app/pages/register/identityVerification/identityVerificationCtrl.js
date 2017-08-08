(function () {
    'use strict';

    angular.module('BlurAdmin.pages.identityVerification')
        .controller('IdentityVerificationCtrl', IdentityVerificationCtrl);

    /** @ngInject */
    function IdentityVerificationCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();
    }
})();
