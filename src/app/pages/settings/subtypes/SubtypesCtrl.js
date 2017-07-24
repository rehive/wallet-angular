(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.subtypes')
        .controller('SubtypesCtrl', SubtypesCtrl);

    /** @ngInject */
    function SubtypesCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.updatedSubtype = {};
        $scope.loadingSubtypes = true;
        $scope.editingSubtype = false;
        $scope.editSubtype = {};
        $scope.subtypeOptions = ['Credit','Debit'];
        $scope.newSubtype = {
            tx_type: 'Credit'
        };

        $scope.toggleSubtypeEditView = function(subtype){
            if(subtype) {
                $scope.editSubtype = subtype
            } else {
                $scope.editSubtype = {};
                vm.getSubtypes();
            }
            $scope.editingSubtype = !$scope.editingSubtype;
        };

        vm.getSubtypes = function () {
            if(vm.token) {
                $scope.loadingSubtypes = true;
                $http.get(environmentConfig.API + '/admin/subtypes/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingSubtypes = false;
                    if (res.status === 200) {
                        $scope.subtypes = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingSubtypes = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getSubtypes();

        $scope.addSubtype = function(){
            $scope.loadingSubtypes = true;
            $scope.newSubtype.tx_type = $scope.newSubtype.tx_type.toLowerCase();
            $http.post(environmentConfig.API + '/admin/subtypes/', $scope.newSubtype, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingSubtypes = false;
                if (res.status === 201) {
                    vm.getSubtypes();
                    toastr.success('You have successfully added a new subtype!');
                    $scope.newSubtype = {tx_type: 'Credit'};
                    $window.scrollTo(0, 0);
                }
            }).catch(function (error) {
                $scope.loadingSubtypes = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.subtypeChanged = function(field){
            vm.updatedSubtype[field] = $scope.editSubtype[field];
        };

        $scope.updateSubtype = function () {
            $window.scrollTo(0, 0);
            $scope.editingSubtype = !$scope.editingSubtype;
            $scope.loadingSubtypes = true;
            $http.patch(environmentConfig.API + '/admin/subtypes/'+ $scope.editSubtype.id + '/', vm.updatedSubtype, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingSubtypes = false;
                if (res.status === 200) {
                    vm.updatedSubtype = {};
                    vm.getSubtypes();
                    toastr.success('You have successfully updated the subtype!');
                }
            }).catch(function (error) {
                $scope.loadingSubtypes = false;
                vm.updatedSubtype = {};
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.findIndexOfSubtype = function(element){
            return this.id == element.id;
        };

        $scope.openSubtypeModal = function (page, size,subtype) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'SubtypeModalCtrl',
                scope: $scope,
                resolve: {
                    subtype: function () {
                        return subtype;
                    }
                }
            });

            vm.theModal.result.then(function(subtype){
                var index = $scope.subtypes.findIndex(vm.findIndexOfSubtype,subtype);
                $scope.subtypes.splice(index, 1);
            }, function(){
            });
        };
    }
})();
