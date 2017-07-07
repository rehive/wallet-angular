(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('CompanySwitchesCtrl', CompanySwitchesCtrl);

    function CompanySwitchesCtrl($scope,API,$uibModal,$rootScope,toastr,$http,cookieManagement,errorToasts,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCompanySwitches = true;
        $scope.companySwitches = {};
        vm.updatedCompanySwitch = {};
        $scope.companySwitchParams = {
            tx_type: 'Credit',
            enabled: 'False'
        };
        $scope.companySwitchesOptions = ['Credit','Debit'];

        $scope.toggleCompanySwitchesEditView = function(companySwitch){
            if(companySwitch) {
                $scope.editCompanySwitch = companySwitch;
                $scope.editCompanySwitch.tx_type == 'credit' ? $scope.editCompanySwitch.tx_type = 'Credit' : $scope.editCompanySwitch.tx_type = 'Debit';
                $scope.editCompanySwitch.enabled == true ? $scope.editCompanySwitch.enabled = 'True' : $scope.editCompanySwitch.enabled = 'False';
            } else {
                $scope.editCompanySwitch.enabled == 'True' ? $scope.editCompanySwitch.enabled = true : $scope.editCompanySwitch.enabled = false;
                $scope.editCompanySwitch = {};
                vm.getCompanySwitches();
            }
            $scope.editingCompanySwitches = !$scope.editingCompanySwitches;
        };

        vm.getCompanySwitches = function () {
            if(vm.token) {
                $scope.loadingCompanySwitches = true;
                $http.get(API + '/admin/company/switches/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanySwitches = false;
                    if (res.status === 200) {
                        console.log(res.data.data);
                        $scope.companySwitchesList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingCompanySwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanySwitches();

        $scope.addCompanySwitch = function (companySwitchParams) {
            $window.scrollTo(0,0);
            companySwitchParams.tx_type = companySwitchParams.tx_type.toLowerCase();
            companySwitchParams.enabled = companySwitchParams.enabled == 'True' ? true: false;
            if(vm.token) {
                $scope.loadingCompanySwitches = true;
                $http.post(API + '/admin/company/switches/', companySwitchParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanySwitches = false;
                    if (res.status === 201) {
                        toastr.success('Successfully created the company switch!');
                        $scope.companySwitchParams = {tx_type: 'Credit', enabled: 'False'};
                        vm.getCompanySwitches();
                    }
                }).catch(function (error) {
                    $scope.companySwitchParams = {tx_type: 'Credit', enabled: 'False'};
                    $scope.loadingCompanySwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.companySwitchChanged = function(field){
            vm.updatedCompanySwitch[field] = $scope.editCompanySwitch[field];
        };

        $scope.updateCompanySwitch = function () {
            $window.scrollTo(0,0);
            vm.updatedCompanySwitch.enabled = vm.updatedCompanySwitch.enabled == 'True' ? true: false;
            $scope.editingCompanySwitches = !$scope.editingCompanySwitches;
            if(vm.token) {
                $scope.loadingCompanySwitches = true;
                $http.patch(API + '/admin/company/switches/' + $scope.editCompanySwitch.id + '/', vm.updatedCompanySwitch, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanySwitches = false;
                    if (res.status === 200) {
                        toastr.success('Successfully updated the company switch!');
                        vm.getCompanySwitches();
                    }
                }).catch(function (error) {
                    $scope.loadingCompanySwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.findIndexOfCompanySwitches = function(element){
            return this.id == element.id;
        };

        $scope.openCompanySwitchesModal = function (page, size,companySwitches) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'CompanySwitchModalCtrl',
                scope: $scope,
                resolve: {
                    companySwitches: function () {
                        return companySwitches;
                    }
                }
            });

            vm.theModal.result.then(function(companySwitches){
                var index = $scope.companySwitchesList.findIndex(vm.findIndexOfCompanySwitches,companySwitches);
                $scope.companySwitchesList.splice(index, 1);
            }, function(){
            });
        };

    }
})();
