(function () {
    'use strict';

    angular.module('BlurAdmin.pages.accountSettings')
        .controller('AccountSettingsCtrl', AccountSettingsCtrl);

    /** @ngInject */
    function AccountSettingsCtrl($scope,IMAGEURL,API,$http,cookieManagement,errorToasts,$stateParams) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        vm.currencyCode = $stateParams.currencyCode;
        $scope.settingView = 'controls';
        $scope.currencyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.$watch('currencyCode',function(){
            if(vm.currencyCode){
                $scope.currencyImageUrl = IMAGEURL + vm.currencyCode + '.png';
            }
        });

        $scope.goToSetting = function(view){
            $scope.settingView = view;
        };

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
