(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.settingView = 'accountInfo';
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.company = {
            defaultCurrency: {
                code : 'USD'
            }
        };
        $scope.administrator = {
            firstName: '',
            lastName: '',
            country: 'ZA'
        };
        $scope.currencyOptions = JSON.parse($window.sessionStorage.currenciesList);


        vm.getCompanyDetails = function(){
            $http.get(API + '/company/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 200) {
                  $scope.companyImageUrl = res.data.data.logo;
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
          };
          vm.getCompanyDetails();

        $scope.goToSetting = function(view){
            $scope.settingView = view;
        };

    }
})();
