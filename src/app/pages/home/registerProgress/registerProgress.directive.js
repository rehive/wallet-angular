(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('registerProgress', registerProgress);

    /** @ngInject */
    function registerProgress() {
        return {
            restrict: 'E',
            controller: 'RegisterProgressCtrl',
            templateUrl: 'app/pages/home/registerProgress/registerProgress.html'
        };
    }
})();