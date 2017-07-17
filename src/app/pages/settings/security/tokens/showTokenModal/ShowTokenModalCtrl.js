(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings.security')
        .controller('ShowTokenModalCtrl', ShowTokenModalCtrl);

    function ShowTokenModalCtrl($scope,token) {
        $scope.token = token;

    }
})();
