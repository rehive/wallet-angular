(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('LatestTransactionsCtrl', LatestTransactionsCtrl);

    /** @ngInject */
    function LatestTransactionsCtrl($scope,$uibModal) {

        $scope.openModal = function (page, size,transaction) {

            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'transactionModalCtrl',
                resolve: {
                    transaction: function () {
                        return transaction;
                    }
                }
            });
        };

        $scope.transactions = [{
            from: 'admin',
            to: 'ark.erwewf17@rmail.com',
            type: 'Deposit',
            currency: 'USD',
            account: 'default',
            amount: '1000.00',
            fee: '200',
            status: 'pending',
            date: new Date()
        },{
            from: 'admin',
            to: 'bark.erwewf17@rmail.com',
            type: 'Withdraw',
            currency: 'XBT',
            account: 'default',
            amount: '2000.00',
            fee: '300',
            status: 'complete',
            date: new Date()
        },{
            from: 'admin',
            to: 'cark.erwewf17@rmail.com',
            type: 'Deposit',
            currency: 'USD',
            account: 'default',
            amount: '1000.00',
            fee: '500',
            status: 'pending',
            date: new Date()
        }]
    }

})();