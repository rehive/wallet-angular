(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('historyModalCtrl', historyModalCtrl);

    /** @ngInject */
    function historyModalCtrl($scope,transaction) {
        $scope.transaction = transaction;
    }

})();