(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tiers')
        .directive('editTier', editTier);

    /** @ngInject */
    function editTier() {
        return {
            restrict: 'E',
            controller: 'TiersCtrl',
            templateUrl: 'app/pages/currency/settings/tiers/editTier/editTier.html'
        };
    }
})();
