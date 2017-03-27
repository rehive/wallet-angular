(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.depositParams = {
            user: '',
            amount: '',
            reference: '',
            confirm_on_create: false
        };
        $scope.showAdvancedOption = true;
        $scope.confirmDeposit = false;
        $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';

        $rootScope.$watch('selectedCurrency',function(){
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
        });

        $scope.toggleConfirmDeposit = function(confirmDeposit){
            $scope.confirmDeposit = !confirmDeposit;
        };

        $scope.createDeposit = function () {
            console.log($scope.depositParams);
            $http.post(API + '/admin/transactions/deposit/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                },
                params: $scope.depositParams
            }).then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    toastr.success('You have successfully deposited your money!');
                }
            }).catch(function (error) {
                console.log(error);
            });
        }


    }

})();