(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.emails')
        .controller('EmailsCtrl', EmailsCtrl);

    /** @ngInject */
    function EmailsCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedSwitches = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingSwitches = true;
        $scope.email = {};

        $scope.switchesParams = {
            switch_type: 'Allow transactions',
            enabled: 'False'
        };

        vm.getSwitches = function () {
            if(vm.token) {
                $scope.loadingSwitches = true;
                $http.get(environmentConfig.API + '/user/emails/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingSwitches = false;
                    if (res.status === 200) {
                        $scope.emailsList = res.data.data;
                        $window.scrollTo(0, 0);
                    }
                }).catch(function (error) {
                    $scope.loadingSwitches = false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getSwitches();

        $scope.makePrimary = function (email) {
             $scope.loadingSwitches = true;
             $http.patch(environmentConfig.API + '/user/emails/'+email.id, {primary: true}, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201 || res.status === 200) {
                     vm.getSwitches();
                     $scope.email = {};
                     toastr.success('You have successfully changed the primary email!');
                     $window.scrollTo(0, 0);
                 }
             }).catch(function (error) {
                 $scope.loadingSwitches = false;
                 if(error.status == 403){
                     errorHandler.handle403();
                     return
                 }
                 errorToasts.evaluateErrors(error.data);
             });
         };

        $scope.verify = function (email) {
             $scope.loadingSwitches = true;
             var data = {
                 email: email.email,
                 company: environmentConfig.COMPANY
             };
             $http.post(environmentConfig.API + '/auth/email/verify/resend/', data, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201 || res.status === 200) {
                     toastr.success('A verification email has been sent to your email address!');
                     $window.scrollTo(0, 0);
                 }
             }).catch(function (error) {
                 $scope.loadingSwitches = false;
                 if(error.status == 403){
                     errorHandler.handle403();
                     return
                 }
                 errorToasts.evaluateErrors(error.data);
             });
         };

         $scope.addEmail = function (email) {
             $scope.loadingSwitches = true;
             $http.post(environmentConfig.API + '/user/emails/', email, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201) {
                     vm.getSwitches();
                     $scope.email = {};
                     toastr.success('You have successfully added the email!');
                     $window.scrollTo(0, 0);
                 }
             }).catch(function (error) {
                 $scope.loadingSwitches = false;
                 if(error.status == 403){
                     errorHandler.handle403();
                     return
                 }
                 errorToasts.evaluateErrors(error.data);
             });
         };

        vm.findIndexOfSwitches = function(element){
            return this.id == element.id;
        };

        $scope.openSwitchesModal = function (page, size, email) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'EmailsModalCtrl',
                scope: $scope,
                resolve: {
                    email: function () {
                        return email;
                    }
                }
            });

            vm.theModal.result.then(function(email){
                var index = $scope.emailsList.findIndex(vm.findIndexOfSwitches,email);
                $scope.emailsList.splice(index, 1);
            }, function(){
            });
        };
    }
})();
