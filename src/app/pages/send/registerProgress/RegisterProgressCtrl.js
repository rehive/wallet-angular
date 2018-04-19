(function () {
    'use strict';

    angular.module('BlurAdmin.pages.send')
        .controller('RegisterProgressCtrl', RegisterProgressCtrl);

    /** @ngInject */
    function RegisterProgressCtrl($rootScope, $scope, $http, cookieManagement, environmentConfig, $location, errorToasts, userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $rootScope.allVerified = false;
        $rootScope.loadingRegisterProgressView = true;
        $rootScope.emailVerified = false;
        $rootScope.mobileVerified = false;
        $rootScope.addressVerified = "n";
        $rootScope.idDocumentsVerified = 'n';
        $rootScope.residenceDocumentsVerified = 'n';

        $rootScope.selfieDocumentsVerified = 'n';
        $rootScope.ethereumAddressVerified = true;

        $scope.goToGetVerified = function (path) {
            $location.path(path);
        };

        vm.getUserInfo = function () {
            if (vm.token) {
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
                        if ($scope.user.status == 'verified') {
                            $rootScope.addressVerified = "v";
                        }
                        else if ($scope.user.status == 'pending') {
                            $rootScope.addressVerified = "p";
                            return;
                        }
                        else {
                            return;
                        }

                        if ($scope.user.kyc.status == "verified") {
                            $scope.allVerified = true;
                            $rootScope.allVerified = true;
                        }
                        $http.get(environmentConfig.API + '/user/address/', {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': vm.token
                            }
                        }).then(function (res) {
                            if (res.status === 200) {
                                $scope.user = res.data.data;
                                if ($scope.user.status == 'verified') {
                                    $rootScope.addressVerified = "v";
                                }
                                else if ($scope.user.status == 'pending') {
                                    $rootScope.addressVerified = "p";
                                }
                            }
                            
                            vm.getUserDocuments();
                        }).catch(function (error) {
                            $scope.loadingRegisterProgressView = false;
                            if(error.status == 403 || error.status == 401){
                                errorHandler.handle403();
                                return
                            }
                            errorToasts.evaluateErrors(error.data);
                        });
                    }

                }).catch(function (error) {
                    $scope.loadingRegisterProgressView = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserInfo();

        vm.checkingEmailVerfication = function (email) {
            $scope.loadingRegisterProgressView = true;
            userVerification.verifyEmail(function (err, verified) {
                if (verified) {
                    $rootScope.emailVerified = true;
                    vm.checkingMobileVerification($scope.user.mobile_number);
                } else {
                    $rootScope.emailVerified = false;
                    $scope.loadingRegisterProgressView = false;
                }
            }, email);
        };

        vm.checkingMobileVerification = function (number) {
            $scope.loadingRegisterProgressView = true;
            userVerification.verifyMobile(function (err, verified) {
                if (verified) {
                    $rootScope.mobileVerified = true;
                    $scope.loadingRegisterProgressView = false;
                } else {
                    $rootScope.mobileVerified = false;
                    $scope.loadingRegisterProgressView = false;
                }
            }, number);
        };

        vm.getUserDocuments = function () {
            if (vm.token) {
                $http.get(environmentConfig.API + '/user/documents/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.idDocuments = res.data.data.results.filter(function (element) {
                            return element.document_category == 'Proof Of Identity';
                        });
                        $rootScope.idDocumentsVerified = vm.checkDocumentsArrayVerification($scope.idDocuments);
                        $scope.residenceDocuments = res.data.data.results.filter(function (element) {
                            return element.document_category == 'Proof Of Address';
                        });
                        $rootScope.residenceDocumentsVerified = vm.checkDocumentsArrayVerification($scope.residenceDocuments);
                        $scope.selfieDocuments = res.data.data.results.filter(function (element) {
                            return element.document_category == 'Advanced Proof Of Identity';
                        });
                        $rootScope.selfieDocumentsVerified = vm.checkDocumentsArrayVerification($scope.selfieDocuments);

                        if($rootScope.emailVerified && $rootScope.mobileVerified && $rootScope.addressVerified == 'v' && $rootScope.idDocumentsVerified == 'v' &&
                             $rootScope.residenceDocumentsVerified=='v' && $rootScope.selfieDocumentsVerified){
                                 $scope.allVerified = true;
                                 $rootScope.allVerified = true;
                             }
                    }
                }).catch(function (error) {
                    $scope.loadingRegisterProgressView = false;
                    if(error.status == 403 || error.status == 401){
                        errorHandler.handle403();
                        return
                    }
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.checkDocumentsArrayVerification = function (documentsArray) {
            if (documentsArray.length === 0) {
                return 'n';
            } else {
                for (var i = 0; i < documentsArray.length; i++) {
                    if (documentsArray[i].status === 'verified') {
                        return 'v';
                    }
                }
                for (var i = 0; i < documentsArray.length; i++) {
                    if (documentsArray[i].status === 'pending') {
                        return 'p';
                    }
                }
                for (var i = 0; i < documentsArray.length; i++) {
                    if (documentsArray[i].status === 'declined') {
                        return 'd';
                    }
                }
            }
            return 'n';
        };


    }
})();
