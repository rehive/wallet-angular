(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('tokenManagement', tokenManagement);

    /** @ngInject */
    function tokenManagement($cookies) {

        return {
            getToken: function () {
                return  $cookies.get('TOKEN');
            },
            setToken: function (token) {
                $cookies.put('TOKEN', token);
            },
            deleteToken: function () {
                $cookies.remove('TOKEN');
            }
        }
    }

})();