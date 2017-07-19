/**
 * @author a.demeshko
 * created on 23.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('capitalizeDottedSentence', capitalizeDottedSentence);

    /** @ngInject */
    function capitalizeDottedSentence() {
        return function(text) {
          var formattedText = '';
            var textArray = text.split('.');
            if(textArray.length > 0){
              for(var i = 0; i < textArray.length ; i ++){
                formattedText = formattedText + textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + ' '
              }

              return formattedText.trim();
            } else {
                return text;
            }
        };
    }

})();
