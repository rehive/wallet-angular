(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
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