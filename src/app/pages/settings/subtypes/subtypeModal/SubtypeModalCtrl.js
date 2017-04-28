(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SubtypeModalCtrl', SubtypeModalCtrl);

    function SubtypeModalCtrl($scope,subtype,toastr,$http,API,cookieManagement,errorToasts) {

        var vm= this;

        $scope.subtype = subtype;
        vm.token = cookieManagement.getCookie('TOKEN');

        vm.findIndexOfSubtype = function(element){
            return $scope.subtype.id == element.id;
        };

        $scope.deleteSubtype = function () {
            $http.delete(API + '/admin/subtypes/' + $scope.subtype.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.$dismiss();
                if (res.status === 204) {
                    var index = $scope.subtypes.findIndex(vm.findIndexOfSubtype);
                    $scope.subtypes.splice(index, 1);
                    toastr.success('You have successfully deleted the subtype!');
                }
            }).catch(function (error) {
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
