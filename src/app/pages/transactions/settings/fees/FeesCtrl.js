(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .controller('FeesCtrl', FeesCtrl);

    /** @ngInject */
    function FeesCtrl($scope) {

        $scope.editingFee = false;
        $scope.editFees = {
            feeType: 'Transfer',
            feeAmount: 30,
            feePercentage: 20
        };

        $scope.feesParams = {
            feeType: 'Transfer'
        };
        $scope.typeOptions = ['Transfer','Deposit','Withdraw'];

        $scope.toggleEditView = function(){
            $scope.editingFee = !$scope.editingFee;
        }



    }
})();