(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .factory('userVerification', userVerification);

    /** @ngInject */
    function userVerification($http,cookieManagement,API,$location) {

        return {
            verify: function (cb) {
                var token = cookieManagement.getCookie('TOKEN');
                var emailVerified = false;

                if(token) {
                    $http.get(API + '/user/emails/', {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': token
                        }
                    }).then(function (res) {
                        if (res.status === 200) {
                            var emailArrays = res.data.data;
                            for(var i = 0; i < emailArrays.length ; i++){
                                if(emailArrays[i].verified == true){
                                    emailVerified = true;
                                    break;
                                }
                            }
                            cb(null,emailVerified);
                        }
                    }).catch(function (error) {
                        cb(error,null);
                    });
                } else {
                    cb(null,false);
                }
            }
        }
    }

})();
