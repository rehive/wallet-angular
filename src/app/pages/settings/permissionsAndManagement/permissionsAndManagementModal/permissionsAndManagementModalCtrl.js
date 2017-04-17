(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('PermissionsAndManagementModalCtrl', PermissionsAndManagementModalCtrl);

    function PermissionsAndManagementModalCtrl($scope,managerEmail) {
        $scope.managerEmail = managerEmail;
    }

})();
