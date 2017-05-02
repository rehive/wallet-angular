(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('transactionModalCtrl', transactionModalCtrl);

    /** @ngInject */
    function transactionModalCtrl($scope,transaction,metadataTextService) {
        $scope.transaction = transaction;
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);
    }

})();