(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.settings')
        .controller('TierLimitsCtrl', TierLimitsCtrl);

    /** @ngInject */
    function TierLimitsCtrl($rootScope,$scope) {

        $scope.selectedLimitsTier = 'Tier 1';
        $scope.activeLimitsTier = 0;

        $scope.selectLimitsTier= function(tier){
            $scope.selectedLimitsTier = tier;
        };

        $scope.saveLimitsTierRequirements = function(){
            alert('$scope.selectedLimitsTier ' + $scope.activeLimitsTier);
        };
    }
})();