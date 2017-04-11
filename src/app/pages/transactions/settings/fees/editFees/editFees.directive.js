(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('editFees', editFees);

    /** @ngInject */
    function editFees() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/transactions/settings/fees/editFees/editFees.html'
        };
    }
})();