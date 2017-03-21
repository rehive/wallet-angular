(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('transactionModalCtrl', transactionModalCtrl);

    /** @ngInject */
    function transactionModalCtrl($scope,transaction) {
        $scope.transaction = transaction;
    }

})();