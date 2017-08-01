(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('AddUserDocumentModalCtrl', AddUserDocumentModalCtrl);

    function AddUserDocumentModalCtrl($scope,uuid,$uibModalInstance,toastr,Upload,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.addingDocument = false;
        vm.uuid = uuid;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.userDocumentParams = {
            file: {},
            document_type: 'Utility Bill',
            verified: 'Verified'
        };
        $scope.documentSelected = false;
        $scope.documentTypeOptions = ['Utility Bill','Bank Statement','Lease Or Rental Agreement',
            'Municipal Rate and Taxes Invoice','Mortgage Statement','Telephone or Cellular Account','Insurance Policy Document',
            'Statement of Account Issued by a Retail Store','Government Issued ID','Passport','Drivers License',
            'ID Confirmation Photo','Other'];
        vm.documentTypeOptionsObj = {
            'Utility Bill': 'utility_bill',
            'Bank Statement': 'bank_statement',
            'Lease Or Rental Agreement': 'lease_or_rental_agreement',
            'Municipal Rate and Taxes Invoice': 'municipal_rate_and_taxes',
            'Mortgage Statement': 'mortgage_statement',
            'Telephone or Cellular Account': 'telephone',
            'Insurance Policy Document': 'insurance_policy',
            'Statement of Account Issued by a Retail Store': 'retail_store',
            'Government Issued ID': 'government_id',
            'Passport': 'passport',
            'Drivers License': 'drivers_license',
            'ID Confirmation Photo': 'id_confirmation',
            'Other': 'other'
        };
        $scope.statusTypeOptions = ['Verified','Incomplete','Pending','Declined'];


        $scope.addDocument = function () {
            $scope.addingDocument = true;
            $scope.userDocumentParams.user = vm.uuid;
            $scope.userDocumentParams['document_type'] = vm.documentTypeOptionsObj[$scope.userDocumentParams['document_type']];
            Upload.upload({
                url: environmentConfig.API + '/admin/users/documents/',
                data: $scope.userDocumentParams,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token},
                method: "POST"
            }).then(function (res) {
                $scope.addingDocument = false;
                if (res.status === 201) {
                    toastr.success('Document successfully added');
                    $uibModalInstance.close();
                }
            }).catch(function (error) {
                $scope.addingDocument = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.documentChanged = function () {
            $scope.documentSelected = true;
        };



    }
})();
