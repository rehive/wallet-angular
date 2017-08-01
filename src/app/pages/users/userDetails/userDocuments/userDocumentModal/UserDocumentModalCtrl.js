(function () {
    'use strict';

    angular.module('BlurAdmin.pages.userDetails')
        .controller('UserDocumentModalCtrl', UserDocumentModalCtrl);

    function UserDocumentModalCtrl($scope,$uibModalInstance,document,Upload,toastr,$http,$ngConfirm,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;
        $scope.document = document;
        $scope.updatingDocument = false;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.showingDocumentFile = true;
        vm.updatedDocument = {};
        $scope.defaultImageUrl = "https://storage.googleapis.com/rehive-static/dashboard/dist/img/default_company_icon.png";
        $scope.editDocument = {
            file: {},
            document_type: document.document_type,
            verified: document.verified
        };
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

        $scope.kycDocumentSelected = function (field) {
            $scope.showingDocumentFile = false;
            $scope.documentChanged(field);
        };

        $scope.documentChanged = function (field) {
            vm.updatedDocument[field] = $scope.editDocument[field]
        };

        $scope.updateDocument = function () {
            $scope.updatingDocument = true;
            vm.updatedDocument['document_type'] = vm.documentTypeOptionsObj[vm.updatedDocument['document_type']];
            Upload.upload({
                url: environmentConfig.API + '/admin/users/documents/' + $scope.document.id + '/',
                data: vm.updatedDocument,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token},
                method: "PATCH"
            }).then(function (res) {
                $scope.updatingDocument = false;
                if (res.status === 200) {
                    toastr.success('Document successfully updated');
                    $uibModalInstance.close($scope.document);
                }
            }).catch(function (error) {
                $scope.updatingDocument = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };

        $scope.deleteDocumentConfirm = function () {
            $ngConfirm({
                title: 'Delete document',
                content: 'Are you sure you want to delete this document?',
                animationBounce: 1,
                animationSpeed: 100,
                scope: $scope,
                buttons: {
                    close: {
                        text: "No",
                        btnClass: 'btn-default'
                    },
                    ok: {
                        text: "Yes",
                        btnClass: 'btn-primary',
                        keys: ['enter'], // will trigger when enter is pressed
                        action: function(scope){
                            $scope.deleteDocument();
                        }
                    }
                }
            });
        };

        $scope.deleteDocument = function () {
            $scope.updatingDocument = true;
            $http.delete(environmentConfig.API + '/admin/users/documents/' + $scope.document.id + '/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': vm.token
                    }
                }).then(function (res) {
                $scope.updatingDocument = false;
                if (res.status === 200) {
                    toastr.success('Document successfully deleted');
                    $uibModalInstance.close($scope.document);
                }
            }).catch(function (error) {
                $scope.updatingDocument = false;
                if(error.status == 403){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };





    }
})();
