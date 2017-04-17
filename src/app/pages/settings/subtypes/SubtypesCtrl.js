(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SubtypesCtrl', SubtypesCtrl);

    /** @ngInject */
    function SubtypesCtrl($scope,API,IMAGEURL,$http,cookieManagement,errorToasts,$window) {

        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.companyImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";

        $scope.editingSubtype = false;

        $scope.subtypesParams = {
            type: 'Transfer'
        };

        $scope.typeOptions = ['Transfer','Deposit','Withdraw'];

        $scope.toggleSubtypeEditView = function(){
            $scope.editingSubtype = !$scope.editingSubtype;
        }

    }
})();
