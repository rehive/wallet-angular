(function () {
    'use strict';

    angular.module('BlurAdmin.pages.send')
        .controller('RegisterProgressCtrl', RegisterProgressCtrl);

    /** @ngInject */
    function RegisterProgressCtrl($rootScope,$scope,$http,cookieManagement,environmentConfig,$location,errorToasts,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $rootScope.allVerified = false;
        $scope.loadingRegisterProgressView = true;
        $scope.emailVerified = false;
        $scope.mobileVerified = false;
        $scope.addressVerified = true;
        $scope.idDocumentsVerified = 'n';
        $scope.residenceDocumentsVerified = 'n';
        $scope.ethereumAddressVerified = true;

        $scope.goToGetVerified = function (path) {
            $location.path(path);
        };

        vm.getUserInfo = function(){
            $scope.loadingRegisterProgressView = true;
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    vm.checkingEmailVerfication(res.data.data.email);
                }
            }).catch(function (error) {
                $scope.loadingRegisterProgressView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.checkingEmailVerfication = function (email) {
            $scope.loadingRegisterProgressView = true;
            userVerification.verifyEmail(function(err,verified){
                if(verified){
                    $scope.emailVerified = true;
                    vm.checkingMobileVerification($scope.user.mobile_number);
                } else {
                    $scope.emailVerified = false;
                    $scope.loadingRegisterProgressView = false;
                }
            },email);
        };

        vm.checkingMobileVerification = function (number) {
            $scope.loadingRegisterProgressView = true;
            userVerification.verifyMobile(function(err,verified){
                if(verified){
                    $scope.mobileVerified = true;
                    $scope.loadingRegisterProgressView = false;
                } else {
                    $scope.mobileVerified = false;
                    $scope.loadingRegisterProgressView = false;
                }
            },number);
        };

        vm.checkUserAddressVerification = function(){
            $http.get(environmentConfig.API + '/user/address/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.address = res.data.data;
                    delete $scope.address['line_2'];
                    for (var key in $scope.address) {
                        if ($scope.address.hasOwnProperty(key)) {
                            if(!$scope.address[key]){
                                $scope.addressVerified = false;
                            }
                        }
                    }
                }
            }).catch(function (error) {
                $scope.loadingRegisterProgressView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.checkUserAddressVerification();

        vm.getUserDocuments = function(){
            $http.get(environmentConfig.API + '/user/documents/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.idDocuments = res.data.data.results.filter(function (element) {
                        return (element.document_category == 'Proof Of Identity' || element.document_category == 'Advanced Proof Of Identity');
                    });
                    $scope.idDocumentsVerified = vm.checkDocumentsArrayVerification($scope.idDocuments);
                    $scope.residenceDocuments = res.data.data.results.filter(function (element) {
                        return element.document_category == 'Proof Of Address';
                    });
                    $scope.residenceDocumentsVerified = vm.checkDocumentsArrayVerification($scope.residenceDocuments);
                }
            }).catch(function (error) {
                $scope.loadingRegisterProgressView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserDocuments();

        vm.checkDocumentsArrayVerification = function(documentsArray){
            if(documentsArray.length === 0){
                return 'n';
            } else {
                for(var i = 0; i < documentsArray.length; i++){
                    if(documentsArray[i].verified === 'Verified'){
                        return 'v';
                    }
                }
                for(var i = 0; i < documentsArray.length; i++){
                    if(documentsArray[i].verified === 'Pending'){
                        return 'p';
                    }
                }
                for(var i = 0; i < documentsArray.length; i++){
                    if(documentsArray[i].verified === 'Declined'){
                        return 'd';
                    }
                }
            }
            return verifiedStatus;
        }; 

        vm.getEthereumAddresses = function(){
            $http.get(environmentConfig.API + '/user/bitcoin-accounts/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    if(res.data.data.length > 0){
                        $scope.ethereumAddressVerified = true;
                    } else {
                        $scope.ethereumAddressVerified = false;
                    }
                }
            }).catch(function (error) {
                $scope.loadingRegisterProgressView = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getEthereumAddresses();

        if($scope.ethereumAddressVerified && $scope.checkDocumentsArrayVerification && $scope.idDocumentsVerified && $scope.addressVerified && $scope.mobileVerified && $scope.emailVerified){
            $rootScope.allVerified = true;
        }

    }
})();
