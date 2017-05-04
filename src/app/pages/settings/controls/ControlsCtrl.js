(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('ControlsCtrl', ControlsCtrl);

    /** @ngInject */
    function ControlsCtrl($scope,API,toastr,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingCompanyControls = true;

        vm.getCompanyControls = function () {
            $scope.loadingCompanyControls = true;
            $http.get(API + '/admin/controls/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyControls = false;
                if (res.status === 200) {
                    $scope.controls = res.data.data;
                    console.log($scope.controls);
                }
            }).catch(function (error) {
                $scope.loadingCompanyControls = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCompanyControls();

        $scope.saveControls = function(control){
            $http.patch(API + '/admin/controls/' + control.id, {enabled: control.enabled}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('You have successfully updated the control');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        }
    }
})();