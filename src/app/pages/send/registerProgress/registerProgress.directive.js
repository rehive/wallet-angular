(function () {
    'use strict';

    angular.module('BlurAdmin.pages.send')
        .directive('registerProgress', registerProgress);

    /** @ngInject */
    function registerProgress() {
        return {
            restrict: 'E',
            controller: 'RegisterProgressCtrl',
            templateUrl: 'app/pages/send/registerProgress/registerProgress.html'
        };
    }
})();