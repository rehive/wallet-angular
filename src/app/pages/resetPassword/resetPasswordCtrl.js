(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resetPassword')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    /** @ngInject */
    function ResetPasswordCtrl($scope,cookieManagement,$http,toastr,$location,API) {
        $scope.companyName = cookieManagement.getCookie('COMPANY');
        $scope.currencies = ['$XBR','$ZER','$EUR'];

        $scope.resetPassword = function(identifier,company_id){
            $http.post(API + '/auth/password/reset/', {
                identifier: identifier,
                company_id: company_id
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success(res.data.message);
                    $location.path('/login');
                }
            }).catch(function (error) {
                console.log(error);
                toastr.error(error.data.message);
            });
        };
    }

})();