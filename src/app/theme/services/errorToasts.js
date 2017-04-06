(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('errorToasts', errorToasts);

    /** @ngInject */
    function errorToasts(toastr) {

        return {
            evaluateErrors: function (errors) {
                for(var key in errors){
                    if (errors.hasOwnProperty(key)) {
                        errors[key].forEach(function(error){
                            toastr.error(error, (key.charAt(0).toUpperCase() + key.slice(1)));
                        })
                    }
                };
            }
        }
    }

})();