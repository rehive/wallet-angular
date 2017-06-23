(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserBankAccountsCtrl', UserBankAccountsCtrl);

    /** @ngInject */
    function UserBankAccountsCtrl($scope,API,$stateParams,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUser = true;


    }
})();
