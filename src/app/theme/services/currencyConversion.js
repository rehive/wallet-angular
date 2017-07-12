(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('currencyModifiers', currencyModifiers)
        .filter('currencyModifiersFilter', currencyModifiersFilter)
        .filter('preciseRound',preciseRound);

    /** @ngInject */
    function currencyModifiers() {

        return {
            convertToCents: function (amount,divisibility) {
                return  amount * Math.pow(10,divisibility);
            },
            convertFromCents: function (amount,divisibility) {
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

    function currencyModifiersFilter(){
        return function (amount,divisibility){
            return  amount / Math.pow(10,divisibility);
        }
    }


    function preciseRound(){
        return function (num,decimals){
            var numString,numStringAfterDecimal,finalString,indexOfDot,diff;
            num = num.toFixed(decimals);
            numString = num.toString();
            indexOfDot = numString.indexOf('.');
            if(indexOfDot > 0) {
                numStringAfterDecimal = numString.slice(indexOfDot + 1);
                diff = decimals - numStringAfterDecimal.length;
                finalString = numString + '0'.repeat(diff);
            } else {
                finalString = numString + '.' + '0'.repeat(decimals);
            }

            return finalString;
        }
    }

})();