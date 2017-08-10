(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentID')
        .controller('VerifyDocumentIDCtrl', VerifyDocumentIDCtrl);

    /** @ngInject */
    function VerifyDocumentIDCtrl($rootScope,$scope,$http,cookieManagement,toastr,$uibModal,Upload,environmentConfig,$location,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.showAuthNav = false;
        $scope.loadingDocumentsIDView = true;
        $scope.documents = [];

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
                $scope.loadingDocumentsIDView = false;
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
                if (res.status === 200) {
                    $scope.documents = res.data.data.results.filter(function (element) {
                        return (element.document_category == 'Proof Of Identity' || element.document_category == 'Advanced Proof Of Identity');
                    });
                    $scope.loadingDocumentsIDView = false;
                }
            }).catch(function (error) {
                $scope.loadingDocumentsIDView = false;
                errorToasts.evaluateErrors(error.data);
            });
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
                controller: 'AddDocumentIDModalCtrl',
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
                controller: 'ShowDocumentIDModalCtrl',
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
            $location.path('/document/verify/residence');
        };

    }
})();
