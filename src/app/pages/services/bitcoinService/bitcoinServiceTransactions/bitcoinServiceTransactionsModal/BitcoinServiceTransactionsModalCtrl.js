(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceTransactions')
        .controller('BitcoinServiceTransactionsModalCtrl', BitcoinServiceTransactionsModalCtrl);

    function BitcoinServiceTransactionsModalCtrl($scope,transaction,metadataTextService) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;
    }

})();
