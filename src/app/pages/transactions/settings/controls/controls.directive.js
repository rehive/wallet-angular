(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .directive('controls', controls);

    /** @ngInject */
    function controls() {
        return {
            restrict: 'E',
            controller: 'ControlsCtrl',
            templateUrl: 'app/pages/transactions/settings/controls/controls.html'
        };
    }
})();