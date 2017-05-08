(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userDocuments', userDocuments);

    /** @ngInject */
    function userDocuments() {
        return {
            restrict: 'E',
            controller: 'UserDocumentsCtrl',
            templateUrl: 'app/pages/users/userDetails/userDocuments/userDocuments.html'
        };
    }
})();
