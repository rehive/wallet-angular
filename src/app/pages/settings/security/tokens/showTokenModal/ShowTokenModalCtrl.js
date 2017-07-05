(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('ShowTokenModalCtrl', ShowTokenModalCtrl);

    function ShowTokenModalCtrl($scope,token) {
        $scope.token = token;

    }
})();
