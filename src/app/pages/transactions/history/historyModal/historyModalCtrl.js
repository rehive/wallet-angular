(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('historyModalCtrl', historyModalCtrl);

    function historyModalCtrl($scope,transaction,metadataTextService) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;
    }

})();
