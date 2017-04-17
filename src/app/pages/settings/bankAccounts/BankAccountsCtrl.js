(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('BankAccountsCtrl', BankAccountsCtrl);

    /** @ngInject */
    function BankAccountsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.editingBankAccounts = false;

        $scope.toggleEditView = function(){
            $scope.editingBankAccounts = !$scope.editingBankAccounts;
        }

        //$scope.$on('beforeunload', function () {
        //    $scope.editingBankAccounts = false;
        //});

    }
})();
