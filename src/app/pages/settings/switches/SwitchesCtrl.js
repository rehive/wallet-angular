(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SwitchesCtrl', SwitchesCtrl);

    /** @ngInject */
    function SwitchesCtrl($scope,API,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedSwitches = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingSwitches = true;
        $scope.editSwitches = {};

        $scope.switchesParams = {
            event: 'User Create'
        };

        // $scope.eventOptions = ['User Create','User Update','User Delete'];

        $scope.toggleSwitchesEditView = function(webhook){
            webhook ? $scope.editSwitches = webhook : $scope.editSwitches = {};
            $scope.editingSwitches = !$scope.editingSwitches;
        };

        vm.getSwitches = function () {
            if(vm.token) {
                $scope.loadingSwitches = true;
                $http.get(API + '/admin/switches/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingSwitches = false;
                    if (res.status === 200) {
                        $scope.switches = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getSwitches();

        // $scope.addSwitches = function (switchesParams) {
        //     $scope.loadingSwitches = true;
        //     switchesParams.event = switchesParams.event == 'User Create' ?
        //      'user.create' : switchesParams.event == 'User Update' ? 'user.update' : 'user.delete';
        //     $http.post(API + '/admin/switches/', switchesParams, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': vm.token
        //         }
        //     }).then(function (res) {
        //         $scope.loadingSwitches = false;
        //         if (res.status === 201) {
        //             vm.getSwitches();
        //             toastr.success('You have successfully added the Switch!');
        //             $scope.switchesParams = {event: 'User Create'};
        //             $window.scrollTo(0, 0);
        //         }
        //     }).catch(function (error) {
        //         $scope.switchesParams = {event: 'User Create'};
        //         $scope.loadingSwitches = false;
        //         if(error.status == 403){
        //             errorHandler.handle403();
        //             return
        //         }
        //         errorToasts.evaluateErrors(error.data);
        //     });
        // };

        $scope.switchesChanged = function(field){
            vm.updatedSwitches[field] = $scope.editSwitches[field];
        };

        // $scope.updateSwitches = function () {
        //     $window.scrollTo(0, 0);
        //     $scope.editingSwitches = !$scope.editingSwitches;
        //     $scope.loadingSwitches = true;
        //     vm.updatedSwitches.event = vm.updatedSwitches.event == 'User Create' ?
        //      'user.create' : vm.updatedSwitches.event == 'User Update' ? 'user.update' : 'user.delete';
        //     $http.patch(API + '/admin/switches/'+ $scope.editSwitches.id + '/', vm.updatedSwitches, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': vm.token
        //         }
        //     }).then(function (res) {
        //         $scope.loadingSwitches = false;
        //         if (res.status === 200) {
        //             vm.getSwitches();
        //             $scope.toggleSwitchesEditView();
        //             toastr.success('You have successfully updated the Switch!');
        //         }
        //     }).catch(function (error) {
        //         $scope.loadingSwitches = false;
        //         if(error.status == 403){
        //             errorHandler.handle403();
        //             return
        //         }
        //         errorToasts.evaluateErrors(error.data);
        //     });
        // };

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
                var index = $scope.switches.findIndex(vm.findIndexOfSwitches,switches);
                $scope.switches.splice(index, 1);
            }, function(){
            });
        };
    }
})();
