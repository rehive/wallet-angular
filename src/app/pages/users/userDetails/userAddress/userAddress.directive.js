(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .directive('userAddress', userAddress);

    /** @ngInject */
    function userAddress() {
        return {
            restrict: 'E',
            controller: 'UserAddressCtrl',
            templateUrl: 'app/pages/users/userDetails/userAddress/userAddress.html'
        };
    }
})();
