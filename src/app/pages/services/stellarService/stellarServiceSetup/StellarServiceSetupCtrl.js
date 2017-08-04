(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSetup')
        .controller('StellarServiceSetupCtrl', StellarServiceSetupCtrl);

    /** @ngInject */
    function StellarServiceSetupCtrl($scope,$http,environmentConfig,cookieManagement,$uibModal,toastr,errorToasts,$window,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.serviceUrl = cookieManagement.getCookie('SERVICEURL');
        $scope.serviceSetupParams = {};
        $scope.loadingStellarService = true;

        $scope.getReceiveAccounts = function () {
            $scope.loadingStellarService = true;
            $http.get(vm.serviceUrl + 'admin/receive_accounts/?default=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.length == 0){
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
            $http.get(vm.serviceUrl + 'admin/send_accounts/?default=true', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.length == 0){
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
        $scope.getSendAccounts();

        $scope.saveReceiveAccount = function (serviceSetupParams) {
            $scope.loadingStellarService = true;
            $http.post(vm.serviceUrl + 'admin/receive_accounts/',
                {
                    address: serviceSetupParams.address,
                    default: true,
                    federation_domain: serviceSetupParams.federation_domain
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201) {
                    $scope.saveSendAccount(serviceSetupParams.secret_key);
                }
            }).catch(function (error) {
                $scope.loadingStellarService = false;
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.saveSendAccount = function (secret_key) {
            $scope.loadingStellarService = true;
            $http.post(vm.serviceUrl + 'admin/send_accounts/',{secret_key: secret_key, default: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201) {
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
