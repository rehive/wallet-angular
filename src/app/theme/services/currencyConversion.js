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
            var finalString;
            var multipliedByDecimalNumber = num*Math.pow(10, decimals);
            var multipliedByDecimalString = multipliedByDecimalNumber.toString();
            if(multipliedByDecimalString[0] == '-'){
                multipliedByDecimalString = multipliedByDecimalString.slice(1);
                finalString = '-' + insertDot(multipliedByDecimalString,decimals);;
            } else {
                finalString = insertDot(multipliedByDecimalString,decimals);
            }

            function insertDot(multipliedByDecimalString,decimals){
                var array,indexOfDot;
                indexOfDot = multipliedByDecimalString.length - decimals;
                array = multipliedByDecimalString.split('');
                array.splice(indexOfDot,0,'.');
                return array.join('');
            }

            return finalString;
        }
    }

})();