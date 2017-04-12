(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('controls', controls);

    /** @ngInject */
    function controls() {
        return {
            restrict: 'E',
            controller: 'ControlsCtrl',
            templateUrl: 'app/pages/settings/controls/controls.html'
        };
    }
})();
