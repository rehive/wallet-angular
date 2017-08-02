(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserAccountInfoCtrl', UserAccountInfoCtrl);

    /** @ngInject */
    function UserAccountInfoCtrl($scope,environmentConfig,$stateParams,$uibModal,$http,$ngConfirm,cookieManagement,errorToasts,toastr) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.uuid = $stateParams.uuid;
        $scope.loadingUserAccountInfo = true;
        $scope.showUserEmails = false;
        $scope.showAddUserEmail = false;
        $scope.showUserNumbers = false;
        $scope.showAddUserNumber = false;
        $scope.booleanOptions = ['False','True'];
        $scope.newUserEmail = {
            primary: 'False',
            verified: 'False'
        };
        $scope.newUserNumber = {
            primary: 'False',
            verified: 'False'
        };

        $scope.toggleUserEmailsView = function () {
            $scope.showUserEmails = !$scope.showUserEmails;
        };

        $scope.toggleAddUserEmailsView = function () {
            $scope.showUserEmails = !$scope.showUserEmails;
            $scope.showAddUserEmail = !$scope.showAddUserEmail;
        };

        $scope.toggleUserNumbersView = function () {
            $scope.showUserNumbers = !$scope.showUserNumbers;
        };

        $scope.toggleAddUserNumbersView = function () {
            $scope.showUserNumbers = !$scope.showUserNumbers;
            $scope.showAddUserNumber = !$scope.showAddUserNumber;
        };

        // intial user and email and mobile number list calling functions

        vm.getUser = function(){
            if(vm.token) {
                $scope.loadingUserAccountInfo = true;
                $http.get(environmentConfig.API + '/admin/users/' + vm.uuid + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.user = res.data.data;
                        vm.getUserEmails();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getUser();

        vm.getUserEmails = function(){
            if(vm.token) {
                $http.get(environmentConfig.API + '/admin/users/emails/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.emailsList = res.data.data.results;
                        vm.getUserMobileNumbers();
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        vm.getUserMobileNumbers = function(){
            if(vm.token) {
                $scope.loadingUserAccountInfo = true;
                $http.get(environmentConfig.API + '/admin/users/mobiles/?user=' + vm.uuid, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    if (res.status === 200) {
                        $scope.mobilesList = res.data.data.results;
                        $scope.loadingUserAccountInfo = false;
                    }
                }).catch(function (error) {
                    $scope.loadingUserAccountInfo = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };

        // intial user and email and mobile number list calling functions end

        // user email functions start

        $scope.createUserEmail = function (newUserEmail) {
            $scope.loadingUserAccountInfo = true;
            newUserEmail.user = vm.uuid;
            newUserEmail.primary = newUserEmail.primary == 'True' ? true:false;
            newUserEmail.verified = newUserEmail.verified == 'True' ? true:false;
            $http.post(environmentConfig.API + '/admin/users/emails/',newUserEmail, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201) {
                    $scope.newUserEmail = {primary: 'False', verified: 'False'};
                    toastr.success('Email successfully created');
                    $scope.toggleAddUserEmailsView();
                    vm.getUserEmails()
                }
            }).catch(function (error) {
                $scope.newUserEmail = {primary: 'False', verified: 'False'};
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateUserEmail = function (email) {
            $scope.loadingUserAccountInfo = true;
            $http.patch(environmentConfig.API + '/admin/users/emails/' + email.id + '/', {primary: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Primary email successfully changed');
                    vm.getUserEmails()
                }
            }).catch(function (error) {
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.deleteUserEmailConfirm = function (email) {
            $ngConfirm({
                title: 'Delete email',
                content: "Are you sure you want to delete this user's email?",
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "No",
                        btnClass: 'btn-default'
                    },
                    ok: {
                        text: "Yes",
                        btnClass: 'btn-primary',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope){
                            $scope.deleteUserEmail(email);
                        }
                    }
                }
            });
        };

        $scope.deleteUserEmail = function (email) {
            $scope.loadingUserAccountInfo = true;
            $http.delete(environmentConfig.API + '/admin/users/emails/' + email.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Email successfully deleted');
                    vm.getUserEmails()
                }
            }).catch(function (error) {
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        // user email functions end

        // user mobile numbers functions start

        $scope.createUserNumber = function (newUserNumber) {
            $scope.loadingUserAccountInfo = true;
            newUserNumber.user = vm.uuid;
            newUserNumber.primary = newUserNumber.primary == 'True' ? true:false;
            newUserNumber.verified = newUserNumber.verified == 'True' ? true:false;
            $http.post(environmentConfig.API + '/admin/users/mobiles/',newUserNumber, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201) {
                    $scope.newUserNumber = {primary: 'False', verified: 'False'};
                    toastr.success('Mobile number successfully created');
                    $scope.toggleAddUserNumbersView();
                    vm.getUserMobileNumbers()
                }
            }).catch(function (error) {
                $scope.newUserNumber = {primary: 'False', verified: 'False'};
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.updateUserMobile = function (mobile) {
            $scope.loadingUserAccountInfo = true;
            $http.patch(environmentConfig.API + '/admin/users/mobiles/' + mobile.id + '/', {primary: true}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Primary mobile number successfully changed');
                    vm.getUserMobileNumbers();
                }
            }).catch(function (error) {
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.deleteUserNumberConfirm = function (mobile) {
            $ngConfirm({
                title: 'Delete number',
                content: "Are you sure you want to delete this user's mobile number?",
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "No",
                        btnClass: 'btn-default'
                    },
                    ok: {
                        text: "Yes",
                        btnClass: 'btn-primary',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope){
                            $scope.deleteUserNumber(mobile);
                        }
                    }
                }
            });
        };

        $scope.deleteUserNumber = function (mobile) {
            $scope.loadingUserAccountInfo = true;
            $http.delete(environmentConfig.API + '/admin/users/mobiles/' + mobile.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success('Mobile number successfully deleted');
                    vm.getUserMobileNumbers()
                }
            }).catch(function (error) {
                $scope.loadingUserAccountInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        // user mobile numbers functions start

        $scope.openUserEmailModal = function (page,size,email) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserEmailModalCtrl',
                scope: $scope,
                resolve: {
                    email: function () {
                        return email;
                    },
                    user: function () {
                        return $scope.user;
                    }
                }
            });

            vm.theModal.result.then(function(email){
                if(email){
                    vm.getUserEmails();
                }
            }, function(){
            });
        };

        $scope.openUserMobileModal = function (page, size,mobile) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'UserMobileModalCtrl',
                scope: $scope,
                resolve: {
                    mobile: function () {
                        return mobile;
                    },
                    user: function () {
                        return $scope.user;
                    }
                }
            });

            vm.theModal.result.then(function(mobile){
                if(mobile){
                    vm.getUserMobileNumbers();
                }
            }, function(){
            });
        };

    }
})();
