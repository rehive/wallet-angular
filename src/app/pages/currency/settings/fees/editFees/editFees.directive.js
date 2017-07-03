(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings')
        .directive('editFees', editFees);

    /** @ngInject */
    function editFees() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/currency/settings/fees/editFees/editFees.html'
        };
    }
})();