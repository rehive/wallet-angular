(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceTransactions')
        .controller('StellarServiceTransactionsModalCtrl', StellarServiceTransactionsModalCtrl);

    function StellarServiceTransactionsModalCtrl($scope,transaction,metadataTextService) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;
    }

})();
