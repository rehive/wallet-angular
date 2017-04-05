(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('historyModalCtrl', historyModalCtrl);

    function historyModalCtrl($scope,transaction) {
        //console.log(transaction);
        $scope.transaction = transaction;
    }

})();
