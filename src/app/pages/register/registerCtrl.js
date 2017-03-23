(function () {
    'use strict';

    angular.module('BlurAdmin.pages.register')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($scope,$http,toastr) {

        $scope.register = function(identifier, company_id, password) {
            $http.post(API + '/auth/login/', {
                identifier: identifier,
                company_id: company_id,
                password: password
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