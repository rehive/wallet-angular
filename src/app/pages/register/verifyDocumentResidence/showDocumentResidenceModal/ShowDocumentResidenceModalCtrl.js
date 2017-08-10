(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentResidence')
        .controller('ShowDocumentResidenceModalCtrl', ShowDocumentResidenceModalCtrl);

    function ShowDocumentResidenceModalCtrl($uibModalInstance,$http,$scope,errorToasts,toastr,document,$location,environmentConfig,cookieManagement) {

        $scope.document = document;

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');



    }
})();
