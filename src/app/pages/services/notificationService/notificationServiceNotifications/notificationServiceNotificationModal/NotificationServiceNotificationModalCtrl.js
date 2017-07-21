(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .controller('NotificationServiceNotificationModalCtrl', NotificationServiceNotificationModalCtrl);

    function NotificationServiceNotificationModalCtrl($scope,$uibModalInstance,notification,toastr,$http,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.notification = notification;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingNotification = false;


        $scope.deleteNotification = function () {
            $scope.deletingNotification = true;
            $http.delete('https://notification.s.services.rehive.com/api/notifications/' + $scope.notification.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingNotification = false;
                if (res.status === 200) {
                    toastr.success('Notification successfully deleted');
                    $uibModalInstance.close($scope.notification);
                }
            }).catch(function (error) {
                $scope.deletingNotification = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
