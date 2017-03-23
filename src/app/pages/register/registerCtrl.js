(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($scope,$http,toastr) {

        $scope.register = function( email, company_id, password1, password2) {
            $http.post(API + '/auth/register/', {
                email: email,
                company_id: company_id,
                password1: password1,
                password2: password2
            }).then(function (res) {
                console.log(res);
                //if (res.status === 200) {
                //    $state.go('dashboard');
                //  toastr.success('You have successfully logged in with the email address!');
                //} else {
                // }
            }).catch(function (error) {
                //     toastr
            });
        };

    }

})();