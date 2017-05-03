(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('NotificationsCtrl', NotificationsCtrl);

    /** @ngInject */
    function NotificationsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingCompanyNotifications = true;
        $scope.sds= true;

        vm.getCompanyNotifications = function () {
            $scope.loadingCompanyNotifications = true;
            $http.get(API + '/admin/notifications/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyNotifications = false;
                if (res.status === 200) {
                    $scope.notifications = res.data.data;
                }
            }).catch(function (error) {
                $scope.loadingCompanyNotifications = false;
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getCompanyNotifications();

        $scope.saveNotifications = function(){
            //$scope.loadingCompanyNotifications = true;
            //$http.put(API + '/admin/notifications/', $scope.notifications, {
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Authorization': vm.token
            //    }
            //}).then(function (res) {
            //    $scope.loadingCompanyNotifications = false;
            //    if (res.status === 200) {
            //        vm.getCompanyNotifications();
            //    }
            //}).catch(function (error) {
            //    $scope.loadingCompanyNotifications = false;
            //    errorToasts.evaluateErrors(error.data);
            //});
        }

    }
})();
