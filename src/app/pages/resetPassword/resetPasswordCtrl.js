(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resetPassword')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    /** @ngInject */
    function ResetPasswordCtrl($scope,$http,toastr,$location,environmentConfig,errorToasts) {

        $scope.resetPassword = function(user,company){
            $http.post(environmentConfig.API + '/auth/password/reset/', {
                user: user,
                company: company
            }).then(function (res) {
                if (res.status === 200) {
                    toastr.success(res.data.message);
                    $location.path('/login');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };

    }
})();
