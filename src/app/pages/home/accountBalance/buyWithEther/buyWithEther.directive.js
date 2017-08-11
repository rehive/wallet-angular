(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .directive('buyWithEther', buyWithEther);

    /** @ngInject */
    function buyWithEther() {
        return {
            restrict: 'E',
            controller: 'BuyWithEtherCtrl',
            templateUrl: 'app/pages/home/accountBalance/buyWithEther/buyWithEther.html'
        };
    }
})();