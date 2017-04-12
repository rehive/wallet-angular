(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .directive('accountInfo', accountInfo);

    /** @ngInject */
    function accountInfo() {
        return {
            restrict: 'E',
            controller: 'AccountInfoCtrl',
            templateUrl: 'app/pages/settings/accountInfo/accountInfo.html'
        };
    }
})();
