(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resetPassword')
        .controller('ResetPasswordCtrl', ResetPasswordCtrl);

    /** @ngInject */
    function ResetPasswordCtrl($scope,$http,toastr,$location,API,errorToasts) {

        $scope.resetPassword = function(user,company){
            $http.post(API + '/auth/password/reset/', {
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
