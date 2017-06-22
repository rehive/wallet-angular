(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('transactionModalCtrl', transactionModalCtrl);

    /** @ngInject */
    function transactionModalCtrl($uibModalInstance,$scope,transaction,metadataTextService,$location) {
        $scope.transaction = transaction;
        $scope.metadata = metadataTextService.convertToText(transaction.metadata);

        $scope.goToUser = function () {
            $uibModalInstance.close();
            $location.path('/user/' + $scope.transaction.user.identifier);
        }
    }

})();