(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.mobiles')
        .controller('MobilesCtrl', MobilesCtrl);

    /** @ngInject */
    function MobilesCtrl($scope,environmentConfig,$uibModal,toastr,$http,cookieManagement,errorToasts,$window,stringService,errorHandler) {

        var vm = this;
        vm.updatedSwitches = {};
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.loadingSwitches = true;
        $scope.editSwitches = {};

        $scope.switchesParams = {
            switch_type: 'Allow transactions',
            enabled: 'False'
        };

        vm.getSwitches = function () {
            if(vm.token) {
                $scope.loadingSwitches = true;
                $http.get(environmentConfig.API + '/user/mobiles/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.loadingSwitches = false;
                    if (res.status === 200) {
                        $scope.mobilesList = res.data.data;
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
             $http.patch(environmentConfig.API + '/user/mobiles/'+email.id, {primary: true}, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201 || res.status === 200) {
                     vm.getSwitches();
                     $scope.email = {};
                     toastr.success('You have successfully changed the primary mobile number!');
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

        $scope.verify = function (mobile) {
             $scope.loadingSwitches = true;
             var data = {
                 mobile: mobile.number,
                 company: environmentConfig.COMPANY
             };
             $http.post(environmentConfig.API + '/auth/mobile/verify/resend/', data, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201 || res.status === 200) {
                     toastr.success('An OTP has been sent to your mobile number!');
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

         $scope.addMobile = function (mobile) {
             $scope.loadingSwitches = true;
             $http.post(environmentConfig.API + '/user/mobiles/', mobile, {
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': vm.token
                 }
             }).then(function (res) {
                 $scope.loadingSwitches = false;
                 if (res.status === 201) {
                     vm.getSwitches();
                     $scope.mobile = {};
                     toastr.success('You have successfully added the mobile number!');
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

        $scope.openSwitchesModal = function (page, size, mobile) {
            vm.theModal = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: 'MobilesModalCtrl',
                scope: $scope,
                resolve: {
                    mobile: function () {
                        return mobile;
                    }
                }
            });

            vm.theModal.result.then(function(mobile){
                var index = $scope.mobilesList.findIndex(vm.findIndexOfSwitches, mobile);
                $scope.mobilesList.splice(index, 1);
            }, function(){
            });
        };
    }
})();
