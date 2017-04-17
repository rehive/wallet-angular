(function () {
    'use strict';

    angular.module('BlurAdmin.pages.changePassword')
        .controller('ChangePasswordCtrl', ChangePasswordCtrl);

    /** @ngInject */
    function ChangePasswordCtrl($rootScope,$scope,$http,API,cookieManagement,IMAGEURL,errorToasts) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');



    }
})();
