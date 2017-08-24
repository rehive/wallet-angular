(function () {
    'use strict';

    angular.module('BlurAdmin.pages.send')
        .controller('ConfirmationModalCtrl', ConfirmationModalCtrl);

    function ConfirmationModalCtrl($scope,$uibModalInstance,transfer,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.transfer = transfer;

        $scope.confirm = function () {
            $uibModalInstance.close(true);
        };


        $scope.reject = function () {
            $uibModalInstance.close(false);
        };
    }
})();
