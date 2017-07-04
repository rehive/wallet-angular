(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('switches', switches);

    /** @ngInject */
    function switches() {
        return {
            restrict: 'E',
            controller: 'SwitchesCtrl',
            templateUrl: 'app/pages/settings/switches/switches.html'
        };
    }
})();
