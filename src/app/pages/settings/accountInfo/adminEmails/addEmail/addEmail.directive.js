(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.adminEmails')
        .directive('addEmail', addEmail);

    /** @ngInject */
    function addEmail() {
        return {
            restrict: 'E',
            controller: 'AdminEmailsCtrl',
            templateUrl: 'app/pages/settings/accountInfo/adminEmails/addEmail/addEmail.html'
        };
    }
})();
