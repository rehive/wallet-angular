(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .controller('FeesCtrl', FeesCtrl);

    /** @ngInject */
    function FeesCtrl($scope) {

        $scope.feesParams = {
            feeType: 'Transfer'
        };
        $scope.typeOptions = ['Transfer','Deposit','Withdraw'];
    }

})();