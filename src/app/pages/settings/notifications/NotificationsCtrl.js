(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('NotificationsCtrl', NotificationsCtrl);

    /** @ngInject */
    function NotificationsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.editingBankAccounts = false;


    }
})();
