(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountSettingsCtrl', AccountSettingsCtrl);

    /** @ngInject */
    function AccountSettingsCtrl($scope,API,$http,cookieManagement,errorToasts,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currency = $stateParams.currency;
        console.log(vm.currency);
        $scope.user = {};
        $scope.user.profile = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.loadingUser = true;

        //vm.getUser = function(){
        //    if(vm.token) {
        //        $scope.loadingUser = true;
        //        $http.get(API + '/admin/users/' + vm.uuid + '/', {
        //            headers: {
        //                'Content-Type': 'application/json',
        //                'Authorization': vm.token
        //            }
        //        }).then(function (res) {
        //            $scope.loadingUser = false;
        //            if (res.status === 200) {
        //                $scope.user = res.data.data;
        //            }
        //        }).catch(function (error) {
        //            $scope.loadingUser = false;
        //            errorToasts.evaluateErrors(error.data);
        //        });
        //    }
        //};
        //vm.getUser();

    }
})();
