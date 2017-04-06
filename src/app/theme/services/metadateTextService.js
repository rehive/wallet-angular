(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('metadataTextService', metadataTextService);

    /** @ngInject */
    function metadataTextService() {

        return {
            convertToText: function (metadata) {
                if(!metadata) return '';

                var metadataString = JSON.stringify(metadata, null, 1);
                metadataString = metadataString.replace(/[{",\\}]/g, '').trim();
                return metadataString;
            }
        }
    }

})();