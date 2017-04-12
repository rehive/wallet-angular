(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('subtypes', subtypes);

    /** @ngInject */
    function subtypes() {
        return {
            restrict: 'E',
            controller: 'SubtypesCtrl',
            templateUrl: 'app/pages/settings/subtypes/subtypes.html'
        };
    }
})();
