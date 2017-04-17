(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('WebhooksCtrl', WebhooksCtrl);

    /** @ngInject */
    function WebhooksCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');

        $scope.webhooksParams = {
            type: 'Withdraw'
        };

        $scope.typeOptions = ['Transfer','Deposit','Withdraw'];


        $scope.toggleWebhooksEditView = function(){
            $scope.editingWebhooks = !$scope.editingWebhooks;
        }

    }
})();
