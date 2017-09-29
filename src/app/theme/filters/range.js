/**
 * @author rafee
 * created on 20.09.2017
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('range', range);

    /** @ngInject */
    function range() {
        return function(input, min, max) {
          min = parseInt(min); //Make string input int
          max = parseInt(max);
          for (var i=min; i<max; i++)
            input.push(i);
          return input;
        };
    }

})();
