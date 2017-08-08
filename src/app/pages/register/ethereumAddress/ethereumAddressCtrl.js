(function () {
    'use strict';

    angular.module('BlurAdmin.pages.ethereumAddress')
        .controller('EthereumAddressCtrl', EthereumAddressCtrl);

    /** @ngInject */
    function EthereumAddressCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.path = $location.path();
    }
})();
