(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('editSwitch', editSwitch);

    /** @ngInject */
    function editSwitch() {
        return {
            restrict: 'E',
            templateUrl: 'app/pages/settings/switches/editSwitch/editSwitch.html'
        };
    }
})();
