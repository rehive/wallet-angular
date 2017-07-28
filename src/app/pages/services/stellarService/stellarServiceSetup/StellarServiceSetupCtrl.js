(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSetup')
        .controller('StellarServiceSetupCtrl', StellarServiceSetupCtrl);

    /** @ngInject */
    function StellarServiceSetupCtrl($scope,$http,cookieManagement,$uibModal,toastr,errorToasts,$window,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingStellarService = true;

        $scope.getReceiveAccounts = function () {
            $scope.loadingStellarService = true;
            $http.get('https://rehive.com/services/crypto/admin/receive_accounts/?default=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.count == 0){
                        $scope.loadingStellarService = false;
                    } else {
                        $scope.getSendAccounts();
                    }
                }
            }).catch(function (error) {
                $scope.loadingStellarService = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        $scope.getReceiveAccounts();

        $scope.getSendAccounts = function () {
            $scope.loadingStellarService = true;
            $http.get('https://rehive.com/services/crypto/admin/send_accounts/?default=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.count == 0){
                        $scope.loadingStellarService = false;
                    } else {
                        $location.path('/services/stellar/transactions');
                    }
                }
            }).catch(function (error) {
                $scope.loadingStellarService = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.saveReceiveAccount = function (address,secret_key) {
            $scope.loadingStellarService = true;
            $http.post('https://rehive.com/services/crypto/admin/receive_accounts/',{address: address,default: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.getSendAccounts(secret_key);
                }
            }).catch(function (error) {
                $scope.loadingStellarService = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.saveSendAccount = function (secret_key) {
            $scope.loadingStellarService = true;
            $http.post('https://rehive.com/services/crypto/admin/send_accounts/',{secret_key: secret_key,default: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.loadingStellarService = false;
                    toastr.success('Stellar account details successfully saved');
                    $location.path('/services/stellar/transactions');
                }
            }).catch(function (error) {
                $scope.loadingStellarService = false;
                errorToasts.evaluateErrors(error.data);
            });
        };


    }
})();
