(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierFees')
        .directive('editTierFees', editTierFees);

    /** @ngInject */
    function editTierFees() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/tierFees/editTierFees/editTierFees.html'
        };
    }
})();