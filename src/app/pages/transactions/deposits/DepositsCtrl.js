(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.deposits')
        .controller('DepositsCtrl', DepositsCtrl);

    /** @ngInject */
    function DepositsCtrl($rootScope,$scope,IMAGEURL,$http,API,cookieManagement,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        console.log(vm.token);

        $scope.depositParams = {
            user: '',
            amount: '',
            reference: '',
            confirm_on_create: false,
            currency: $rootScope.selectedCurrency.code
        };
        $scope.showAdvancedOption = true;
        $scope.confirmDeposit = false;
        $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';

        $rootScope.$watch('selectedCurrency',function(){
            $scope.currencyImageUrl = IMAGEURL + $rootScope.selectedCurrency.code + '.png';
            $scope.depositParams.currency = $rootScope.selectedCurrency.code;
        });

        $scope.toggleConfirmDeposit = function(confirmDeposit){
            $scope.confirmDeposit = !confirmDeposit;
        };

        $scope.createDeposit = function () {
            // $http.post takes the params as follow post(url, data, {config})
            // https://docs.angularjs.org/api/ng/service/$http#post
            $http.post(API + '/admin/transactions/deposit/', $scope.depositParams, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'JWT ' + vm.token
                }
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