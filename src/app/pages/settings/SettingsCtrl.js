(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($scope,environmentConfig,Upload,$http,cookieManagement,errorToasts,$window,$timeout,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.settingView = 'accountInfo';
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.currencyOptions = JSON.parse($window.sessionStorage.currenciesList || '[]');
        $scope.updatingLogo = false;
        $scope.imageFile = {
          file: {}
        };

        $scope.goToSetting = function(path){
            $scope.settingView = '';
            $location.path(path);
        };

    }
})();
