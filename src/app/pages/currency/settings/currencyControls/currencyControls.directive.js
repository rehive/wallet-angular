(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('currencyControls', currencyControls);

    /** @ngInject */
    function currencyControls() {
        return {
            restrict: 'E',
            controller: 'currencyControlsCtrl',
            templateUrl: 'app/pages/currency/settings/currencyControls/currencyControls.html'
        };
    }
})();