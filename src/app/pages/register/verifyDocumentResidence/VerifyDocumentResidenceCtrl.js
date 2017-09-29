(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentResidence')
        .controller('VerifyDocumentResidenceCtrl', VerifyDocumentResidenceCtrl);

    /** @ngInject */
    function VerifyDocumentResidenceCtrl($rootScope,$scope,$http,cookieManagement,toastr,$uibModal,Upload,environmentConfig,$location,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingDocumentsResidenceView = true;
        $scope.showAuthNav = false;
        $scope.documents = [];
        $scope.status = 'noUpload';

        vm.getUserInfo = function(){
            $http.get(environmentConfig.API + '/user/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.user = res.data.data;
                    $scope.showAuthNav = true;
                    vm.getUserDocuments();
                }
            }).catch(function (error) {
                $scope.loadingDocumentsResidenceView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };
        vm.getUserInfo();

        vm.getUserDocuments = function(){
            $http.get(environmentConfig.API + '/user/documents/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingDocumentsResidenceView = false;
                if (res.status === 200) {
                    $scope.documents = res.data.data.results.filter(function (element) {
                        return element.document_category == 'Proof Of Address';
                    });

                    $scope.pendingDocuments = $scope.documents.filter(function (element) {
                        return (element.verified == 'Pending');
                    });

                    var statusCheck = vm.checkDocumentsArrayVerification($scope.documents, "verified");
                    if(statusCheck === true) {
                        $scope.status = 'verified';
                        $rootScope.residenceDocumentsVerified = 'v';
                    }
                    else {
                        statusCheck = vm.checkDocumentsArrayVerification($scope.documents, "pending");
                        if(statusCheck === true) {
                            $scope.status = 'pending';
                            $rootScope.residenceDocumentsVerified = 'p';
                        }
                        else {
                            statusCheck = vm.checkDocumentsArrayVerification($scope.documents, "declined");
                            if(statusCheck === true) {
                                $rootScope.residenceDocumentsVerified = 'd';
                            }
                        }
                    }

                    if($scope.status == 'verified'){
                        $scope.goToNextView();
                    }
                }
            }).catch(function (error) {
                $scope.loadingDocumentsResidenceView = false;
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        vm.checkDocumentsArrayVerification = function(documentsArray, status){
            var verifiedStatus = false;
            if(documentsArray.length === 0){
                $scope.idDocumentsVerified = false;
                return;
            } else {
                for(var i = 0; i < documentsArray.length; i++){
                    if(documentsArray[i].status === status){
                        verifiedStatus = true;
                        break;
                    }
                }
            }
            return verifiedStatus;
        };

        $scope.goToHome = function(){
            $rootScope.notRegistering = true;
            $location.path('/home');
        };

        $scope.openAddUserDocumentModal = function (page, size) {
            vm.theAddModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'AddDocumentResidenceModalCtrl',
                scope: $scope
            });

            vm.theAddModal.result.then(function(){
                vm.getUserDocuments();
            }, function(){
            });
        };

        $scope.openDocumentModal = function (page, size,document) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'ShowDocumentResidenceModalCtrl',
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

        $scope.goToNextView = function(){
            $location.path('/ethereum/address');
        }
    }
})();
