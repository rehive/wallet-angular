(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocument')
        .controller('VerifyDocumentCtrl', VerifyDocumentCtrl);

    /** @ngInject */
    function VerifyDocumentCtrl($rootScope,$scope,$http,cookieManagement,toastr,$uibModal,Upload,environmentConfig,$location,errorToasts) {

        var vm = this;
        $scope.path = $location.path();
        $scope.documents = [{description: 'Passport',status: 'Pending review'},{description: 'Passport',status: 'Pending review'}];

        // $scope.uploadDocument = function () {
        //     Upload.upload({
        //         url: environmentConfig.API + '/admin/users/documents/' + $scope.document.id + '/',
        //         data: vm.updatedDocument,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': vm.token},
        //         method: "POST"
        //     }).then(function (res) {
        //         $scope.updatingDocument = false;
        //         if (res.status === 200) {
        //             toastr.success('Document successfully uploaded');
        //         }
        //     }).catch(function (error) {
        //         $scope.updatingDocument = false;
        //         if(error.status == 403){
        //             errorHandler.handle403();
        //             return
        //         }
        //         errorToasts.evaluateErrors(error.data);
        //     });
        // };

        $scope.openDocumentModal = function (page, size,document) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'VerifyDocumentModalCtrl',
                resolve: {
                    document: function () {
                        return document;
                    }
                }
            });

            vm.theModal.result.then(function(document){
                if(document){
                }
            }, function(){
            });
        };
    }
})();
