(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('makeEtherPayment', makeEtherPayment);

    /** @ngInject */
    function makeEtherPayment() {
        return {
            restrict: 'E',
            require: 'parent',
            templateUrl: 'app/pages/home/accountBalance/buyWithEther/makeEtherPayment/makeEtherPayment.html'
        };
    }
})();