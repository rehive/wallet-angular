(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('accountBalance', accountBalance);

    /** @ngInject */
    function accountBalance() {
        return {
            restrict: 'E',
            require: '^parent',
            templateUrl: 'app/pages/home/accountBalance/accountBalance.html'
        };
    }
})();