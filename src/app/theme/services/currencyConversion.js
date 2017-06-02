(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('currencyModifiers', currencyModifiers);

    /** @ngInject */
    function currencyModifiers() {

        return {
            convertToCents: function (amount,divisibility) {
                return  amount * Math.pow(10,divisibility);
            },
            convertFromCents: function (cookieName, cookieValue) {
                return  amount / Math.pow(10,divisibility);
            },
            validateCurrency: function (amount,divisibility) {
                var amountInArray = amount.toString().split('.');
                var afterDecimalValue = amountInArray[1];
                if(afterDecimalValue == undefined){
                    return true;
                }
                return afterDecimalValue.length > divisibility ? false : true;
            }
        }
    }

})();