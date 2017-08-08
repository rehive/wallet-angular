(function () {
    'use strict';

    angular.module('BlurAdmin.pages.transactions.history')
        .controller('VerifyDocumentModalCtrl', VerifyDocumentModalCtrl);

    function VerifyDocumentModalCtrl($uibModalInstance,$http,$scope,errorToasts,toastr,document,$location,environmentConfig,cookieManagement) {

        $scope.document = document;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');



    }
})();
