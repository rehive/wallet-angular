(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verification')
        .controller('VerificationCtrl', VerificationCtrl);

    /** @ngInject */
    function VerificationCtrl($rootScope,$scope,$http,toastr,cookieManagement,API,$location,errorToasts,userVerification) {

        var vm = this;
        $scope.verifyUser = function(){
            userVerification.verify(function(err,verified){

                if(verified){
                    $rootScope.userVerified = true;
                    console.log($rootScope);
                    $location.path('/dashboard');
                } else {
                    toastr.error('Please verify your account','Message');
                }
            });
        };
        $scope.verifyUser();



    }
})();
