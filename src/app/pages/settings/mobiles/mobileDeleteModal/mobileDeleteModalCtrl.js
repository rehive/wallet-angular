(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.emails')
        .controller('MobilesModalCtrl', MobilesModalCtrl);

    function MobilesModalCtrl($scope,$uibModalInstance,mobile,toastr,$http,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.mobile = mobile;
        $scope.deletingSwitches = false;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.deleteEmail = function () {
            $scope.deletingSwitches = true;
            $http.delete(environmentConfig.API + '/user/mobiles/' + $scope.mobile.id + '/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingSwitches = false;
                if (res.status === 200) {
                    toastr.success('Mobile number successfully deleted');
                    $uibModalInstance.close($scope.email);
                }
            }).catch(function (error) {
                $scope.deletingSwitches = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
