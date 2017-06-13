(function () {
    'use strict';

    angular.module('BlurAdmin.pages.companyNameRequest')
        .controller('CompanyNameRequestCtrl', CompanyNameRequestCtrl);

    /** @ngInject */
    function CompanyNameRequestCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,userVerification) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.company = {
            name: ''
        };

        $scope.updateCompanyInfo = function () {
            $scope.loadingCompanyInfo = true;
            $http.patch(API + '/admin/company/',{name: $scope.company.name}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.loadingCompanyInfo = false;
                if (res.status === 200) {
                    $rootScope.haveCompanyName = true;
                    $rootScope.companyName = res.data.data.name;
                    userVerification.verify(function(err,verified){
                        if(verified){
                            $rootScope.userVerified = true;
                            $location.path('/dashboard');
                            toastr.success('You have successfully updated the company info!');
                        } else {
                            $location.path('/verification');
                            toastr.error('Please verify your account','Message');
                        }
                    });
                }
            }).catch(function (error) {
                $scope.loadingCompanyInfo = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
