(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('errorToasts', errorToasts);

    /** @ngInject */
    function errorToasts(toastr) {

        return {
            evaluateErrors: function (errors) {
              if(errors.data){
                for(var key in errors.data){
                    if (errors.data.hasOwnProperty(key)) {
                        errors.data[key].forEach(function(error){
                            toastr.error(error, (key.charAt(0).toUpperCase() + key.slice(1)));
                        })
                    }
                };
              } else{
                toastr.error(errors.message, 'Message');
              }
            }
        }
    }

})();
