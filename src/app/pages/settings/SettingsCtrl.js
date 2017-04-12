(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SettingsCtrl', SettingsCtrl);

    /** @ngInject */
    function SettingsCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts) {

      var vm = this;
      vm.token = cookieManagement.getCookie('TOKEN');
      $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

      vm.getCompanyDetails = function(){
        // console.log(vm.token);
        // console.log(API + '/company/');
            $http.get(API + '/company/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
              console.log(res);
                if (res.status === 200) {
                  $scope.companyImageUrl = res.data.data.logo;
                }
            }).catch(function (error) {
              console.log(error);
                errorToasts.evaluateErrors(error.data);
            });
          }
          vm.getCompanyDetails();

    }
})();
