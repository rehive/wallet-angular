(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierLimits')
        .controller('TierLimitsCtrl', TierLimitsCtrl);

    /** @ngInject */
    function TierLimitsCtrl($rootScope,$scope,cookieManagement,$http,environmentConfig,$timeout,errorToasts,toastr,$uibModal,currencyModifiers) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.activeTabIndex = 0;
        $scope.loadingTierLimits = true;
        $scope.editingTierLimits = false;
        vm.updatedTierLimit = {};
        $scope.tierLimitsParams = {
            tx_type: 'Credit',
            type: 'Maximum'
        };
        $scope.txTypeOptions = ['Credit','Debit'];
        $scope.typeOptions = ['Maximum','Maximum per day','Maximum per month','Minimum','Overdraft'];

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.getAllTiers();
            }
        });

        $scope.toggleTierLimitEditView = function(tierLimit){
            if(tierLimit) {
                vm.getTierLimit(tierLimit);
            } else {
                $scope.editTierLimit = {};
                $scope.getAllTiers($scope.selectedTier.level);
            }
            $scope.editingTierLimits = !$scope.editingTierLimits;
        };

        vm.getTierLimit = function (tierLimit) {
            $scope.loadingTierLimits = true;
            $http.get(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/limits/' + tierLimit.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingTierLimits = false;
                if (res.status === 200) {
                    $scope.editTierLimit = res.data.data;
                    $scope.editTierLimit.value = currencyModifiers.convertFromCents($scope.editTierLimit.value,$rootScope.selectedCurrency.divisibility);
                    $scope.editTierLimit.tx_type == 'credit' ? $scope.editTierLimit.tx_type = 'Credit' : $scope.editTierLimit.tx_type = 'Debit';
                }
            }).catch(function (error) {
                $scope.loadingTierLimits = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.getAllTiers = function(tierLevel){
            if(vm.token) {
                $scope.loadingTierLimits = true;
                $http.get(environmentConfig.API + '/admin/tiers/?currency=' + $rootScope.selectedCurrency.code, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierLimits = false;
                    if (res.status === 200) {
                        vm.unsortedTierLevelsArray = _.pluck(res.data.data ,'level');
                        vm.sortedTierLevelsArray = vm.unsortedTierLevelsArray.sort(function(a, b) {
                            return a - b;
                        });
                        $scope.tierLevelsForLimits = vm.sortedTierLevelsArray;
                        $scope.allTiers = res.data.data.sort(function(a, b) {
                            return parseFloat(a.level) - parseFloat(b.level);
                        });
                        if(tierLevel){
                          $scope.selectTier(tierLevel);
                        } else {
                          $timeout(function(){
                              $scope.activeTabIndex = 0;
                            });
                          $scope.selectTier($scope.tierLevelsForLimits[0]);
                        }
                    }
                }).catch(function (error) {
                    $scope.loadingTierLimits = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfTier = function(element){
            return this == element.level;
        };

        $scope.selectTier = function(tierLevel){
            $scope.editingTierLimits = false;
            var index = $scope.allTiers.findIndex(vm.findIndexOfTier,tierLevel);
            $scope.selectedTier = $scope.allTiers[index];
            if($scope.selectedTier){
                $scope.getTierLimits();
            }
        };

        $scope.getTierLimits = function(){
            if(vm.token) {
                $scope.loadingTierLimits = true;
                $http.get(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/limits/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierLimits = false;
                    if (res.status === 200) {
                        $scope.tiersLimitsList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingTierLimits = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.addTierLimit = function(tierLimitsParams){
            if(currencyModifiers.validateCurrency(tierLimitsParams.value,$rootScope.selectedCurrency.divisibility)){
                tierLimitsParams.value = currencyModifiers.convertToCents(tierLimitsParams.value,$rootScope.selectedCurrency.divisibility);
            } else {
                toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingTierLimits = true;
                tierLimitsParams.tx_type = tierLimitsParams.tx_type.toLowerCase();
                tierLimitsParams.type = tierLimitsParams.type == 'Maximum' ? 'max': tierLimitsParams.type == 'Maximum per day' ? 'day_max':
                                                                  tierLimitsParams.type == 'Maximum per month' ? 'month_max': tierLimitsParams.type == 'Minimum' ? 'min': 'overdraft';
                $http.post(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/limits/',tierLimitsParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierLimits = false;
                    if (res.status === 201) {
                        toastr.success('Limit added successfully to tier');
                        $scope.tierLimitsParams = {
                            tx_type: 'Credit',
                            type: 'Maximum'
                        };
                        $scope.getAllTiers($scope.selectedTier.level);
                    }
                }).catch(function (error) {
                    $scope.tierLimitsParams = {
                        tx_type: 'Credit',
                        type: 'Maximum'
                    };
                    $scope.loadingTierLimits = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.tierLimitChanged = function(field){
            vm.updatedTierLimit[field] = $scope.editTierLimit[field];
        };

        $scope.updateTierLimit = function(){
            if(currencyModifiers.validateCurrency($scope.editTierLimit.value,$rootScope.selectedCurrency.divisibility)){
                vm.updatedTierLimit.value = currencyModifiers.convertToCents($scope.editTierLimit.value,$rootScope.selectedCurrency.divisibility);
            } else {
                toastr.error('Please input amount to ' + $rootScope.selectedCurrency.divisibility + ' decimal places');
                return;
            }
            if(vm.token) {
                $scope.loadingTierLimits = true;
                $scope.editingTierLimits = !$scope.editingTierLimits;
                vm.updatedTierLimit.tx_type ? vm.updatedTierLimit.tx_type = vm.updatedTierLimit.tx_type.toLowerCase() : '';
                vm.updatedTierLimit.type ? vm.updatedTierLimit.type = vm.updatedTierLimit.type == 'Maximum' ? 'max': vm.updatedTierLimit.type == 'Maximum per day' ? 'day_max':
                    vm.updatedTierLimit.type == 'Maximum per month' ? 'month_max': vm.updatedTierLimit.type == 'Minimum' ? 'min': 'overdraft' : '';

                $http.patch(environmentConfig.API + '/admin/tiers/' + $scope.selectedTier.id + '/limits/' + $scope.editTierLimit.id + '/',vm.updatedTierLimit,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierLimits = false;
                    if (res.status === 200) {
                        toastr.success('Limit updated successfully');
                        $scope.tierLimitsParams = {
                            tx_type: 'Credit',
                            type: 'Maximum'
                        };
                        vm.updatedTierLimit = {};
                        $scope.getAllTiers($scope.selectedTier.level);

                    }
                }).catch(function (error) {
                    $scope.tierLimitsParams = {
                        tx_type: 'Credit',
                        type: 'Maximum'
                    };
                    vm.updatedTierLimit = {};
                    $scope.getAllTiers($scope.selectedTier.level);
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

    vm.findIndexOfTierLimit = function(element){
        return this.id == element.id;
    };

    $scope.openTierLimitsModal = function (page, size,tierLimit) {
        vm.theModal = $uibModal.open({
            animation: true,
            templateUrl: page,
            size: size,
            controller: 'TierLimitsModalCtrl',
            scope: $scope,
            resolve: {
                tierLimit: function () {
                    return tierLimit;
                },
                selectedTier: function () {
                    return $scope.selectedTier;
                }
            }
        });

        vm.theModal.result.then(function(tierLimit){
            var index = $scope.tiersLimitsList.findIndex(vm.findIndexOfTierLimit,tierLimit);
            $scope.tiersLimitsList.splice(index, 1);
        }, function(){
        });
    };

    }
})();
