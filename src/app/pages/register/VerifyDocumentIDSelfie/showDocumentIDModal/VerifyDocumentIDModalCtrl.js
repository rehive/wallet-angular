(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentIDSelfie')
        .controller('ShowDocumentIDSelfieModalCtrl', ShowDocumentIDSelfieModalCtrl);

    function ShowDocumentIDSelfieModalCtrl($uibModalInstance,$http,$scope,errorToasts,toastr,document,$location,environmentConfig,cookieManagement) {

        $scope.document = document;
        if(document.metadata.length>0){
            $scope.metadata = JSON.parse(document.metadata);
        }
        
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');



    }
})();
