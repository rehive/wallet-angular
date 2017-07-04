(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('UserWebhooksModalCtrl', UserWebhooksModalCtrl);

    function UserWebhooksModalCtrl($scope,$uibModalInstance,userWebhook,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.userWebhook = userWebhook;
        $scope.deletingUserWebhook = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteUserWebhook = function () {
            $scope.deletingUserWebhook = true;
            $http.delete(API + '/admin/webhooks/users/' + $scope.userWebhook.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingUserWebhook = false;
                if (res.status === 200) {
                    toastr.success('User Webhook successfully deleted');
                    $uibModalInstance.close($scope.userWebhook);
                }
            }).catch(function (error) {
                $scope.deletingUserWebhook = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
