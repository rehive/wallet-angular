(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('currencyModifiers', currencyModifiers)
        .filter('currencyModifiersFilter', currencyModifiersFilter);

    /** @ngInject */
    function currencyModifiers() {

        return {
            convertToCents: function (amount,divisibility) {
                return  amount * Math.pow(10,divisibility);
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

    function currencyModifiersFilter(){
        return function (amount,divisibility){
            return  amount / Math.pow(10,divisibility);
        }
    }

})();