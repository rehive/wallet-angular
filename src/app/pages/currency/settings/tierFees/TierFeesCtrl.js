(function () {
    'use strict';

    angular.module('BlurAdmin.pages.currency.settings.tierFees')
        .controller('TierFeesCtrl', TierFeesCtrl);

    /** @ngInject */
    function TierFeesCtrl($rootScope,$scope,cookieManagement,$http,API,$timeout,errorToasts,toastr,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.activeTabIndex = 0;
        $scope.loadingTierFees = true;
        $scope.editingTierFees = false;
        vm.updatedTierFee = {};
        $scope.tierFeesParams = {
            tx_type: 'Credit'
        };
        $scope.txTypeOptions = ['Credit','Debit'];

        $rootScope.$watch('selectedCurrency',function(){
            if($rootScope.selectedCurrency && $rootScope.selectedCurrency.code) {
                $scope.getAllTiers();
            }
        });

        $scope.toggleTierFeeEditView = function(tierFee){
            if(tierFee) {
                $scope.editTierFee = tierFee;
                $scope.editTierFee.tx_type == 'credit' ? $scope.editTierFee.tx_type = 'Credit' : $scope.editTierFee.tx_type = 'Debit';
            } else {
                $scope.editTierFee = {};
                $scope.getAllTiers($scope.selectedTier.level);
            }
            $scope.editingTierFees = !$scope.editingTierFees;
        };

        $scope.getAllTiers = function(tierLevel){
            if(vm.token) {
                $scope.loadingTierFees = true;
                $http.get(API + '/admin/tiers/?currency=' + $rootScope.selectedCurrency.code, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierFees = false;
                    if (res.status === 200) {
                        vm.unsortedTierLevelsArray = _.pluck(res.data.data ,'level');
                        vm.sortedTierLevelsArray = vm.unsortedTierLevelsArray.sort(function(a, b) {
                            return a - b;
                        });
                        $scope.tierLevelsForFees = vm.sortedTierLevelsArray;
                        $scope.allTiers = res.data.data.sort(function(a, b) {
                            return parseFloat(a.level) - parseFloat(b.level);
                        });
                        if(tierLevel){
                            $scope.selectTier(tierLevel);
                        } else {
                            $timeout(function(){
                                $scope.activeTabIndex = 0;
                            });
                            $scope.selectTier($scope.tierLevelsForFees[0]);
                        }
                    }
                }).catch(function (error) {
                    $scope.loadingTierFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfTier = function(element){
            return this == element.level;
        };

        $scope.selectTier = function(tierLevel){
            $scope.editingTierFees = false;
            var index = $scope.allTiers.findIndex(vm.findIndexOfTier,tierLevel);
            $scope.selectedTier = $scope.allTiers[index];
            if($scope.selectedTier){
                $scope.getTierFees();
            }
        };

        $scope.getTierFees = function(){
            if(vm.token) {
                $scope.loadingTierFees = true;
                $http.get(API + '/admin/tiers/' + $scope.selectedTier.id + '/fees/',{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierFees = false;
                    if (res.status === 200) {
                        $scope.tiersFeesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingTierFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.addTierFee = function(tierFeesParams){
            if(vm.token) {
                $scope.loadingTierFees = true;
                tierFeesParams.tx_type = tierFeesParams.tx_type.toLowerCase();
                $http.post(API + '/admin/tiers/' + $scope.selectedTier.id + '/fees/',tierFeesParams,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierFees = false;
                    if (res.status === 201) {
                        toastr.success('Fee added successfully to tier');
                        $scope.tierFeesParams = {
                            tx_type: 'Credit'
                        };
                        $scope.getAllTiers($scope.selectedTier.level);
                    }
                }).catch(function (error) {
                    $scope.tierFeesParams = {
                        tx_type: 'Credit'
                    };
                    $scope.loadingTierFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.tierFeeChanged = function(field){
            vm.updatedTierFee[field] = $scope.editTierFee[field];
        };

        $scope.updateTierFee = function(){
            if(vm.token) {
                $scope.loadingTierFees = true;
                $scope.editingTierFees = !$scope.editingTierFees;
                vm.updatedTierFee.tx_type ? vm.updatedTierFee.tx_type = vm.updatedTierFee.tx_type.toLowerCase() : '';

                $http.patch(API + '/admin/tiers/' + $scope.selectedTier.id + '/fees/' + $scope.editTierFee.id + '/',vm.updatedTierFee,{
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingTierFees = false;
                    if (res.status === 200) {
                        toastr.success('Fee updated successfully');
                        $scope.tierFeesParams = {
                            tx_type: 'Credit'
                        };
                        vm.updatedTierFee = {};
                        $scope.getAllTiers($scope.selectedTier.level);
                    }
                }).catch(function (error) {
                    $scope.tierFeesParams = {
                        tx_type: 'Credit'
                    };
                    vm.updatedTierFee = {};
                    $scope.getAllTiers($scope.selectedTier.level);
                    $scope.loadingTierFees = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfTierFee = function(element){
            return this.id == element.id;
        };

        $scope.openTierFeesModal = function (page, size,tierFee) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'TierFeesModalCtrl',
                scope: $scope,
                resolve: {
                    tierFee: function () {
                        return tierFee;
                    },
                    selectedTier: function () {
                        return $scope.selectedTier;
                    }
                }
            });

            vm.theModal.result.then(function(tierFee){
                var index = $scope.tiersFeesList.findIndex(vm.findIndexOfTierFee,tierFee);
                $scope.tiersFeesList.splice(index, 1);
            }, function(){
            });
        };

    }
})();
