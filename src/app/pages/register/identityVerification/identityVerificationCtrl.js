(function () {
    'use strict';

    angular.module('BlurAdmin.pages.identityVerification')
        .controller('IdentityVerificationCtrl', IdentityVerificationCtrl);

    /** @ngInject */
    function IdentityVerificationCtrl($rootScope, $scope, $http, cookieManagement, environmentConfig, $location, errorToasts, userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingBasicInfoView = true;
        $scope.showAuthNav = false;
        $scope.address = {};
        $scope.user = {};
        $scope.birth = {};
        vm.user = {};
        $scope.formSubmitted = false;
        $scope.months = [
            {
                value: 1,
                name: "January"
            },
            {
                value: 2,
                name: "February"
            },
            {
                value: 3,
                name: "March"
            },
            {
                value: 4,
                name: "April"
            },
            {
                value: 5,
                name: "May"
            },
            {
                value: 6,
                name: "June"
            },
            {
                value: 7,
                name: "July"
            },
            {
                value: 8,
                name: "August"
            },
            {
                value: 9,
                name: "September"
            },
            {
                value: 10,
                name: "October"
            },
            {
                value: 11,
                name: "November"
            },
            {
                value: 12,
                name: "December"
            }
        ];

        vm.getUserInfo = function () {
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    if($scope.user.birth_date){
                        var nums = $scope.user.birth_date.split("-");
                        if(nums.length == 3){
                            $scope.birth.year = parseInt(nums[0]);
                            $scope.birth.month = parseInt(nums[1]);
                            $scope.birth.day = parseInt(nums[2]);
                        }
                    }

                    if($scope.user.status == true) {
                        $scope.goToNextView();
                    }
                    $scope.showAuthNav = true;
                    vm.getUserAddress();
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.getUserAddress = function () {
            $http.get(environmentConfig.API + '/user/address/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.loadingBasicInfoView = false;
                    $scope.address = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateUserInfo = function () {
            $scope.loadingBasicInfoView = true;
            $http.patch(environmentConfig.API + '/user/', {
                first_name: $scope.user.first_name,
                id_number: $scope.user.id_number,
                last_name: $scope.user.last_name,
                birth_date: $scope.birth.year+"-"+$scope.birth.month+"-"+$scope.birth.day
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    vm.updateAddress();
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.updateAddress = function () {
            $http.patch(environmentConfig.API + '/user/address/', $scope.address, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.loadingBasicInfoView = false;
                    $location.path('document/verify/ID')
                }
            }).catch(function (error) {
                $scope.loadingBasicInfoView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.userChanged = function (field) {
            vm.user[field] = $scope.user[field];
        };

        $scope.goToNextView = function () {
            $location.path('document/verify/ID');
        }

    }
})();
