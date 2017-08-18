(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.emails')
        .controller('EmailsModalCtrl', EmailsModalCtrl);

    function EmailsModalCtrl($scope,$uibModalInstance,email,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.email = email;
        $scope.deletingSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteEmail = function () {
            $scope.deletingSwitches = true;
            $http.delete(environmentConfig.API + '/user/emails/' + $scope.email.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingSwitches = false;
                if (res.status === 200) {
                    toastr.success('Email successfully deleted');
                    $uibModalInstance.close($scope.email);
                }
            }).catch(function (error) {
                $scope.deletingSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
