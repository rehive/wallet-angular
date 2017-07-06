(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('tiers', tiers);

    /** @ngInject */
    function tiers() {
        return {
            restrict: 'E',
            controller: 'TiersCtrl',
            templateUrl: 'app/pages/currency/settings/tiers/tiers.html'
        };
    }
})();
