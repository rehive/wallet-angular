(function () {
    'use strict';

    angular.module('BlurAdmin.pages.verifyDocumentIDSelfie')
        .controller('AddDocumentIDSelfieModalCtrl', AddDocumentIDSelfieModalCtrl);

    function AddDocumentIDSelfieModalCtrl($scope,$rootScope,$uibModalInstance,toastr,Upload,environmentConfig,cookieManagement,errorToasts,errorHandler) {

        var vm = this;

        $scope.addingDocument = false;
        $scope.formSubmitted = false;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.userDocumentParams = {
            file: null,
            document_type: 'ID Confirmation Photo'
        };
        $scope.documentSelected = false;
        $scope.months = [
            {
                value: 1,
                name: "January"
            },
            {
                value: 2,
                name: "February"
            },
            {
                value: 3,
                name: "March"
            },
            {
                value: 4,
                name: "April"
            },
            {
                value: 5,
                name: "May"
            },
            {
                value: 6,
                name: "June"
            },
            {
                value: 7,
                name: "July"
            },
            {
                value: 8,
                name: "August"
            },
            {
                value: 9,
                name: "September"
            },
            {
                value: 10,
                name: "October"
            },
            {
                value: 11,
                name: "November"
            },
            {
                value: 12,
                name: "December"
            }
        ];
        //$scope.documentTypeAllOptions = ['Utility Bill','Bank Statement','Lease Or Rental Agreement',
        //    'Municipal Rate and Taxes Invoice','Mortgage Statement','Telephone or Cellular Account','Insurance Policy Document',
        //    'Statement of Account Issued by a Retail Store','Government Issued ID','Passport','Drivers License',
        //    'ID Confirmation Photo','Other'];
        $scope.documentTypeOptions = ['ID Confirmation Photo'];
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


        $scope.addDocument = function () {
            $scope.addingDocument = true;
            $scope.userDocumentParams['document_type'] = vm.documentTypeOptionsObj[$scope.userDocumentParams['document_type']];
            var metadata = {
                "expiry_date" : $scope.expire.year+"-"+$scope.expire.month+"-"+$scope.expire.day,
                "issued_by" : $scope.issued_by,
                "issued_date" : $scope.issue.year+"-"+$scope.issue.month+"-"+$scope.issue.day,
                "id_number" : $scope.id_number
            };
            $scope.userDocumentParams['metadata'] = JSON.stringify(metadata);
            Upload.upload({
                url: environmentConfig.API + '/user/documents/',
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
                if(error.status == 403 || error.status == 401){
                    errorHandler.handle403();
                    return
                }
                errorToasts.evaluateErrors(error.data);
            });
        };



    }
})();
