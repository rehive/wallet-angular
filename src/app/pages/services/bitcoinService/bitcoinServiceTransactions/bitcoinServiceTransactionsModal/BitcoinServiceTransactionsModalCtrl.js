(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.bitcoinService.bitcoinServiceTransactions')
        .controller('BitcoinServiceTransactionsModalCtrl', BitcoinServiceTransactionsModalCtrl);

    function BitcoinServiceTransactionsModalCtrl($uibModalInstance,$scope,transaction,metadataTextService,$location) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }
})();
