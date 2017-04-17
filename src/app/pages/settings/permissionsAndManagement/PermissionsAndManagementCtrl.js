(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('PermissionsAndManagementCtrl', PermissionsAndManagementCtrl);

    /** @ngInject */
    function PermissionsAndManagementCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts,$window,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.managerEmail = "a@b.com";


        $scope.openManagerPermissionsModal = function (page, size,managerEmail) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'PermissionsAndManagementModalCtrl',
                resolve: {
                    managerEmail: function () {
                        return managerEmail;
                    }
                }
            });
        };


    }
})();
