(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementCtrl', PermissionsAndManagementCtrl);

    /** @ngInject */
    function PermissionsAndManagementCtrl($scope,API,$http,cookieManagement,errorToasts,$window,$uibModal) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
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
