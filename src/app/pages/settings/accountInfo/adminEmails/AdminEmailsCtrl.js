(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.adminEmails')
        .controller('AdminEmailsCtrl', AdminEmailsCtrl);

    /** @ngInject */
    function AdminEmailsCtrl($scope,API,$location,$http,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.addingEmail = false;
        $scope.loadingAdminEmails = true;
        $scope.newEmail = {primary: 'True'};
        $scope.booleanOptions = ['True','False'];


        vm.getUserEmails = function () {
            $scope.loadingAdminEmails = true;
            if(vm.token) {
                $http.get(API + '/user/emails/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAdminEmails = false;
                    if (res.status === 200) {
                        $scope.adminEmailsList = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.loadingAdminEmails = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUserEmails();

        $scope.updateEmail = function (email) {
            $scope.loadingAdminEmails = true;
            if(vm.token) {
                $http.patch(API + '/user/emails/' + email.id + '/' , {primary: true}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAdminEmails = false;
                    if (res.status === 200) {
                        vm.getUserEmails();
                    }
                }).catch(function (error) {
                    $scope.loadingAdminEmails = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.createEmail = function (newEmail) {
            $scope.loadingAdminEmails = true;
            newEmail.primary = newEmail.primary == 'True' ? true:false;
            if(vm.token) {
                $http.post(API + '/user/emails/', newEmail , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAdminEmails = false;
                    if (res.status === 201) {
                        toastr.success('Email added successfully');
                        $scope.toggleAddEmailView();
                        $scope.newEmail = {primary: 'True'};
                        vm.getUserEmails();
                    }
                }).catch(function (error) {
                    $scope.loadingAdminEmails = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.deleteEmail = function (email) {
            $scope.loadingAdminEmails = true;
            if(vm.token) {
                $http.delete(API + '/user/emails/' + email.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingAdminEmails = false;
                    if (res.status === 200) {
                        vm.getUserEmails();
                    }
                }).catch(function (error) {
                    $scope.loadingAdminEmails = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        $scope.toggleAddEmailView = function(){
            $scope.addingEmail = !$scope.addingEmail;
        };

        $scope.goToAccountInfo = function(){
            $location.path('/settings/account-info');
        }

    }
})();
