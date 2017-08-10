(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyUserEmail')
        .controller('VerifyUserEmailCtrl', VerifyUserEmailCtrl);

    /** @ngInject */
    function VerifyUserEmailCtrl($scope,$stateParams,$http,toastr,$location,environmentConfig,errorToasts) {

        $scope.verifyUserEmailAddress = function(){
            $http.post(environmentConfig.API + '/auth/email/verify/', {
                key: $stateParams.key
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success("Email has been verified successfully");
                    $location.path('/mobile/verify');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
                $location.path('/email/verify');
            });
        };
        $scope.verifyUserEmailAddress();

    }
})();
