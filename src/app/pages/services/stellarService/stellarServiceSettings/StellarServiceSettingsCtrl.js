(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services.stellarService.stellarServiceSettings')
        .controller('StellarServiceSettingsCtrl', StellarServiceSettingsCtrl);

    /** @ngInject */
    function StellarServiceSettingsCtrl($scope) {

        $scope.defaultImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

    }

})();
