(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.switches')
        .controller('SwitchesCtrl', SwitchesCtrl);

    /** @ngInject */
    function SwitchesCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedSwitches = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingSwitches = true;
        $scope.editSwitches = {};

        $scope.switchesParams = {
            switch_type: 'Allow transactions',
            enabled: 'False'
        };

        $scope.switchesOptions = ['Allow transactions','Allow transactions for unverified users','Allow unlimited overdrafts',
            'Automatically confirm transactions on creation','Allow custom session durations on login'];
        $scope.boolOptions = ['True','False'];

        $scope.toggleSwitchesEditView = function(switches){
            if(switches) {
                $scope.editSwitches = switches;
                $scope.editSwitches.enabled == true ? $scope.editSwitches.enabled = 'True' : $scope.editSwitches.enabled = 'False';
            } else {
                $scope.editSwitches.enabled == 'True' ? $scope.editSwitches.enabled = true : $scope.editSwitches.enabled = false;
                $scope.editSwitches = {};
                vm.getSwitches();
            }
            $scope.editingSwitches = !$scope.editingSwitches;
        };

        vm.getSwitches = function () {
            if(vm.token) {
                $scope.loadingSwitches = true;
                $http.get(environmentConfig.API + '/admin/switches/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingSwitches = false;
                    if (res.status === 200) {
                        $scope.switchesList = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getSwitches();

        vm.getSwitchesApiValues = function (switchesParams) {

            if(switchesParams.switch_type == 'Allow transactions'){
                switchesParams.switch_type = "transactions";
            } else if(switchesParams.switch_type == 'Allow transactions for unverified users') {
                switchesParams.switch_type = "verification";
            } else if(switchesParams.switch_type == 'Allow unlimited overdrafts') {
                switchesParams.switch_type = "overdraft";
            } else if(switchesParams.switch_type == 'Automatically confirm transactions on creation') {
                switchesParams.switch_type = "auto_confirm";
            } else if(switchesParams.switch_type == 'Allow custom session durations on login') {
                switchesParams.switch_type = "session_duration";
            }

            switchesParams.enabled == 'True' ? switchesParams.enabled = true : switchesParams.enabled = false;

            return switchesParams;
        };

         $scope.addSwitches = function (switchesParams) {
             $scope.loadingSwitches = true;
             switchesParams = vm.getSwitchesApiValues(switchesParams);
             $http.post(environmentConfig.API + '/admin/switches/', switchesParams, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201) {
                     vm.getSwitches();
                     toastr.success('You have successfully added the Switch!');
                     $scope.switchesParams = {switch_type: 'Allow transactions', enabled: 'False'};
                     $window.scrollTo(0, 0);
                 }
             }).catch(function (error) {
                 $scope.switchesParams = {switch_type: 'Allow transactions', enabled: 'False'};
                 $scope.loadingSwitches = false;
                 if(error.status == 403){
                     errorHandler.handle403();
                     return
                 }
                 errorToasts.evaluateErrors(error.data);
             });
         };

        $scope.switchesChanged = function(field){
            vm.updatedSwitches[field] = $scope.editSwitches[field];
        };

         $scope.updateSwitches = function () {
             $window.scrollTo(0, 0);
             $scope.loadingSwitches = true;
             $scope.editingSwitches = !$scope.editingSwitches;
             vm.updatedSwitches = vm.getSwitchesApiValues(vm.updatedSwitches);
             $http.patch(environmentConfig.API + '/admin/switches/'+ $scope.editSwitches.id + '/', vm.updatedSwitches, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 200) {
                     vm.updatedSwitches = {};
                     vm.getSwitches();
                     toastr.success('You have successfully updated the Switch!');
                 }
             }).catch(function (error) {
                 $scope.loadingSwitches = false;
                 vm.updatedSwitches = {};
                 if(error.status == 403){
                     errorHandler.handle403();
                     return
                 }
                 errorToasts.evaluateErrors(error.data);
             });
         };

        vm.findIndexOfSwitches = function(element){
            return this.id == element.id;
        };

        $scope.openSwitchesModal = function (page, size,switches) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'SwitchModalCtrl',
                scope: $scope,
                resolve: {
                    switches: function () {
                        return switches;
                    }
                }
            });

            vm.theModal.result.then(function(switches){
                var index = $scope.switchesList.findIndex(vm.findIndexOfSwitches,switches);
                $scope.switchesList.splice(index, 1);
            }, function(){
            });
        };
    }
})();
