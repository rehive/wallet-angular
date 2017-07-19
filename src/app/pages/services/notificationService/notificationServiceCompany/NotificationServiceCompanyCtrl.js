(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.notificationService.notificationServiceCompany')
        .controller('NotificationServiceCompanyCtrl', NotificationServiceCompanyCtrl);

    /** @ngInject */
    function NotificationServiceCompanyCtrl($scope,$http,cookieManagement,toastr,errorToasts,$window,$location) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.updatingCompanyEmail =  false;
        $scope.company = {};

        vm.getCompanyDetails = function () {
          $scope.updatingCompanyEmail =  true;
            if(vm.token) {
                $http.get('https://notification.s.services.rehive.com/api/company/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.updatingCompanyEmail =  false;
                    if (res.status === 200) {
                      $scope.company = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.updatingCompanyEmail =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };
        vm.getCompanyDetails();

        $scope.updateCompanyEmail = function () {
          $scope.updatingCompanyEmail =  true;
            if(vm.token) {
                $http.patch('https://notification.s.services.rehive.com/api/company/', {email: $scope.company.email}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                    $scope.updatingCompanyEmail =  false;
                    if (res.status === 200) {
                      toastr.success('From_email has been successfully updated');
                      $scope.company = res.data.data;
                    }
                }).catch(function (error) {
                    $scope.updatingCompanyEmail =  false;
                    errorToasts.evaluateErrors(error.data);
                });
            }
        };



    }

})();
