(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceTransactions')
        .controller('StellarServiceTransactionsModalCtrl', StellarServiceTransactionsModalCtrl);

    function StellarServiceTransactionsModalCtrl($uibModalInstance,$scope,transaction,metadataTextService,$location) {
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
        $scope.transaction = transaction;

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }
})();
