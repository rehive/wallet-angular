(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .controller('NotificationServiceNotificationsCtrl', NotificationServiceNotificationsCtrl);

    /** @ngInject */
    function NotificationServiceNotificationsCtrl($scope,$http,cookieManagement,$uibModal,errorToasts,$window,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.updatedNotification = {};
        $scope.loadingNotifications =  false;
        $scope.addingNotifications = false;
        $scope.editingNotifications = false;
        $scope.editNotification = {};
        $scope.notificationParams = {
            enabled: 'False'
        };

        $scope.boolOptions = ['True','False'];

        $scope.toggleNotificationsEditView = function(notification){
            $window.scrollTo(0,0);
            if(notification){
                vm.getSingleNotification(notification);
            } else {
                vm.getNotificationsList();
            }
            $scope.editingNotifications = !$scope.editingNotifications;
        };

        vm.getSingleNotification = function (notification) {
            $scope.loadingNotifications =  true;
            if(vm.token) {
                $http.get('https://notification.services.rehive.io/api/admin/notifications/' + notification.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingNotifications =  false;
                    if (res.status === 200) {
                        $scope.editNotification = res.data.data;
                        $scope.editNotification.enabled = $scope.editNotification.enabled == true ? 'True' : 'False';
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getNotificationsList = function () {
            $scope.loadingNotifications =  true;
            $scope.notificationsList = [];
            if(vm.token) {
                $http.get('https://notification.services.rehive.io/api/admin/notifications/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingNotifications =  false;
                    if (res.status === 200) {
                        $scope.notificationsList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getNotificationsList();

        $scope.toggleAddCurrencyView = function(){
            $window.scrollTo(0,0);
            $scope.notificationParams = {
                enabled: 'False'
            };
            $scope.addingNotifications = !$scope.addingNotifications;
        };

        $scope.addNotification = function (notificationParams) {
            $scope.loadingNotifications =  true;
            $scope.notificationParams.enabled = $scope.notificationParams.enabled == 'True' ? true : false;
            if(vm.token) {
                $http.post('https://notification.services.rehive.io/api/admin/notifications/',notificationParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.toggleAddCurrencyView();
                        toastr.success('Notification added successfully');
                        vm.getNotificationsList();
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.notificationChanged = function (field) {
            vm.updatedNotification[field] = $scope.editNotification[field];
        };

        $scope.updateNotification = function () {
            $scope.loadingNotifications =  true;
            $window.scrollTo(0,0);
            $scope.editingNotifications = !$scope.editingNotifications;
            $scope.notificationParams.enabled = $scope.notificationParams.enabled == 'True' ? true : false;
            if(vm.token) {
                $http.patch('https://notification.services.rehive.io/api/admin/notifications/' + $scope.editNotification.id + '/',vm.updatedNotification, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingNotifications =  false;
                    if (res.status === 200) {
                        toastr.success('Notification updated successfully');
                        vm.getNotificationsList();
                    }
                }).catch(function (error) {
                    $scope.loadingNotifications =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.findIndexOfNotification = function(element){
            return this.id == element.id;
        };

        $scope.openNotificationModal = function (page, size,notification) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'NotificationServiceNotificationModalCtrl',
                scope: $scope,
                resolve: {
                    notification: function () {
                        return notification;
                    }
                }
            });

            vm.theModal.result.then(function(notification){
                var index = $scope.notificationsList.findIndex(vm.findIndexOfNotification,notification);
                $scope.notificationsList.splice(index, 1);
            }, function(){
            });
        };


    }

})();
