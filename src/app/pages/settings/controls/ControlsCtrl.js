(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('ControlsCtrl', ControlsCtrl);

    /** @ngInject */
    function ControlsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

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
                }
            }).catch(function (error) {
                $scope.loadingCompanyControls = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCompanyControls();

        $scope.saveControls = function(){

            //$scope.loadingCompanyControls = true;
            //$http.patch(API + '/admin/controls/', $scope.controls, {
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Authorization': vm.token
            //    }
            //}).then(function (res) {
            //    $scope.loadingCompanyControls = false;
            //    if (res.status === 200) {
            //        vm.getCompanyControls();
            //    }
            //}).catch(function (error) {
            //    $scope.loadingCompanyControls = false;
            //    errorToasts.evaluateErrors(error.data);
            //});
        }
    }
})();