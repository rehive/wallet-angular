(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyAdminEmail')
        .controller('VerifyAdminEmailCtrl', VerifyAdminEmailCtrl);

    /** @ngInject */
    function VerifyAdminEmailCtrl($scope,$stateParams,$http,toastr,$location,environmentConfig,errorToasts) {

        $scope.verifyAdminEmail = function(){
            $http.post(environmentConfig.API + '/auth/email/verify/', {
                key: $stateParams.key
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success("Email has been verified successfully");
                    $location.path('/dashboard');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
                $location.path('/dashboard');
            });
        };
        $scope.verifyAdminEmail();

    }
})();
