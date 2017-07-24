(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('ControlsCtrl', ControlsCtrl);

    /** @ngInject */
    function ControlsCtrl($scope,environmentConfig,toastr,$http,cookieManagement,errorToasts,errorHandler) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCompanyControls = true;

        vm.getCompanyControls = function () {
            if(vm.token) {
                $scope.loadingCompanyControls = true;
                $http.get(environmentConfig.API + '/admin/controls/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingCompanyControls = false;
                    if (res.status === 200) {
                        $scope.controls = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingCompanyControls = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanyControls();

        $scope.saveControls = function(control){
            $http.patch(environmentConfig.API + '/admin/controls/' + control.id, {enabled: control.enabled}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('You have successfully updated the control');
                }
            }).catch(function (error) {
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        }
    }
})();