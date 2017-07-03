(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('fees', fees);

    /** @ngInject */
    function fees() {
        return {
            restrict: 'E',
            controller: 'FeesCtrl',
            templateUrl: 'app/pages/currency/settings/fees/fees.html'
        };
    }
})();