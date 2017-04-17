(function () {
    'use strict';

    angular.module('BlurAdmin.pages.twoFactorAuth')
        .controller('TwoFactorAuthCtrl', TwoFactorAuthCtrl);

    /** @ngInject */
    function TwoFactorAuthCtrl($rootScope,$scope,$http,API,cookieManagement,IMAGEURL,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');



    }
})();
