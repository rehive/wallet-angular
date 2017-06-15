(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService')
        .directive('bitcoinServiceNavigation', bitcoinServiceNavigation);

    /** @ngInject */
    function bitcoinServiceNavigation() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/services/bitcoinService/bitcoinServiceNavigation/bitcoinServiceNavigation.html'
        };
    }
})();
