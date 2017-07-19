(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceNotifications')
        .controller('notificationServiceNotifications', notificationServiceNotifications);

    /** @ngInject */
    function notificationServiceNotifications($scope,$http,cookieManagement,$uibModal,errorToasts,$window,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currenciesList = JSON.parse($window.sessionStorage.currenciesList);



    }

})();
