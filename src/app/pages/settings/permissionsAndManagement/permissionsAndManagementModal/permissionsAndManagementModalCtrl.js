(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.permissionsAndManagement')
        .controller('PermissionsAndManagementModalCtrl', PermissionsAndManagementModalCtrl);

    function PermissionsAndManagementModalCtrl($scope,managerEmail) {
        $scope.managerEmail = managerEmail;
    }

})();
