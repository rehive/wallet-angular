(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('editSubtype', editSubtype);

    /** @ngInject */
    function editSubtype() {
        return {
            restrict: 'E',
            controller: 'SubtypesCtrl',
            templateUrl: 'app/pages/settings/subtypes/editSubtype/editSubtype.html'
        };
    }
})();
