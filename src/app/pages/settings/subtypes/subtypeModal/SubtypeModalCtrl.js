(function () {
    'use strict';

    angular.module('BlurAdmin.pages.settings')
        .controller('SubtypeModalCtrl', SubtypeModalCtrl);

    function SubtypeModalCtrl($scope,subtype,toastr,$http,API,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.subtype = subtype;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.deletingSubtype = false;

        vm.findIndexOfSubtype = function(element){
            return $scope.subtype.id == element.id;
        };

        $scope.deleteSubtype = function () {
            $scope.deletingSubtype = true;
            $http.delete(API + '/admin/subtypes/' + $scope.subtype.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                $scope.deletingSubtype = false;
                $scope.$dismiss();
                if (res.status === 204) {
                    var index = $scope.subtypes.findIndex(vm.findIndexOfSubtype);
                    $scope.subtypes.splice(index, 1);
                    toastr.success('You have successfully deleted the subtype!');
                }
            }).catch(function (error) {
                $scope.deletingSubtype = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
