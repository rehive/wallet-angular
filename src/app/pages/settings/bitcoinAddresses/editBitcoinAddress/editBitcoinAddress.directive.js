(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.bitcoinAddresses')
        .directive('editBitcoinAddress', editBitcoinAddress);

    /** @ngInject */
    function editBitcoinAddress() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/bitcoinAddresses/editBitcoinAddress/editBitcoinAddress.html'
        };
    }
})();
