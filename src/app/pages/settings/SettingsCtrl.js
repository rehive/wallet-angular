(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($scope,API,Upload,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.settingView = 'accountInfo';
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.currencyOptions = JSON.parse($window.sessionStorage.currenciesList || '[]');
        $scope.updatingLogo = false;
        $scope.file = {};


        vm.getCompanyDetails = function(){
            $http.get(API + '/admin/company/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                  $scope.companyImageUrl = res.data.data.logo;
                }
            }).catch(function (error) {
                console.log(error);
                errorToasts.evaluateErrors(error.data);
            });
          };
          vm.getCompanyDetails();

        $scope.goToSetting = function(view){
            $scope.settingView = view;
        };

        $scope.upload = function (file) {
            $scope.updatingLogo = true;
            Upload.upload({
                url: API +'/admin/company/',
                data: {
                    logo: file
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token},
                method: "PATCH"
            }).then(function (res) {
                if (res.status === 200) {
                    $scope.companyImageUrl = res.data.data.logo;
                    $scope.updatingLogo = false;
                }
            }).catch(function (error) {
                $scope.updatingLogo = false;
                errorToasts.evaluateErrors(error.data);
            })
        };

    }
})();
