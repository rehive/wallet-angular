(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceCompany')
        .controller('NotificationServiceLogsCtrl', NotificationServiceLogsCtrl);

    /** @ngInject */
    function NotificationServiceLogsCtrl($scope,$http,cookieManagement,$uibModal,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingLogs =  false;
        $scope.notificationLogs = [];

        vm.getNotificationLogs = function () {
            $scope.loadingLogs =  true;
            if(vm.token) {
                $http.get('https://notification.services.rehive.io/api/admin/logs/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingLogs =  false;
                    if (res.status === 200) {
                        $scope.notificationLogs = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingLogs =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getNotificationLogs();

        $scope.openNotificationServiceLogsModal = function (page, size,log) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'NotificationServiceLogsModalCtrl',
                resolve: {
                    log: function () {
                        return log;
                    }
                }
            });
        };


    }
})();
