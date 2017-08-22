(function () {
    'use strict';

    angular.module('BlurAdmin.pages.home')
        .controller('BuyWithBitcoinCtrl', BuyWithBitcoinCtrl);

    /** @ngInject */
    function BuyWithBitcoinCtrl($rootScope,$scope,$location,$timeout,$interval,cookieManagement,environmentConfig,$http,errorToasts,errorHandler,$window) {
        var vm = this;
        vm.token = cookieManagement.getCookie('TOKEN');
        $scope.makingBitcoinPayment = true;

        $scope.toggleBuyBitcoinView = function () {
            $scope.makingBitcoinPayment = !$scope.makingBitcoinPayment;
        }

        $http.get(environmentConfig.ICO_API + '/user/icos/?enabled=True', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': vm.token
            }
        }).then(function (res) {
            if (res.status === 201 || res.status === 200) {
                var data = res.data.data;
                $scope.currency = res.data.data.results[0];
                $scope.getRates();
            }
        }).catch(function (error) {
            errorToasts.evaluateErrors(error.data);
        });

        $scope.getRates = function() {
            $http.get(environmentConfig.ICO_API + '/user/icos/' + $scope.currency.id + '/rates/?currency__code=XBT', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                }
            }).then(function (res) {
                if (res.status === 201 || res.status === 200) {
                    var data = res.data.data.results[0];
                    var rate = data.rate;
                    $scope.divisibilityBtc = data.currency.divisibility;
                    $scope.btcRate = rate / Math.pow(10,$scope.divisibilityBtc);
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        }
        $http.post("https://bitcoin.s.services.rehive.com/api/1/user/",{}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': vm.token
            }
        }).then(function (res) {
            if (res.status === 201 || res.status === 200) {
                $scope.bitcoinAddress = res.data;
            }
        }).catch(function (error) {
            errorToasts.evaluateErrors(error.data);
        });

        $scope.placeQuote = function(btc){
            var btcint = btc * Math.pow(10, $scope.divisibilityBtc);
            $http({
                method: 'POST',
                url: environmentConfig.ICO_API + '/user/icos/' + $scope.currency.id + '/quotes/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': vm.token
                },
                data: {
                    deposit_amount: btcint,
                    deposit_currency: "XBT"
                }
            }).then(function (res) {
                if (res.status === 201 || res.status === 200) {
                    $scope.toggleBuyBitcoinView();
                    $scope.quotebtc = res.data.data;
                    var quoteBtc = {
                        quote: $scope.quotebtc,
                        time: new Date().getTime()
                    };
                    var qouteBtcTime = 600000;
                    localStorage.removeItem("quoteBtc");
                    localStorage.setItem("quoteBtc", JSON.stringify(quoteBtc));
                    $scope.startBtcTimeout(qouteBtcTime);
                }
            }).catch(function (error) {
                $scope.loadingEtheriumView = false;
                errorToasts.evaluateErrors(error.data);
            });
        }

        $scope.startBtcTimeout = function(time) {
            var timeLeft = Math.floor(time / 1000);
            $scope.btcInterval = $interval(function () {
                timeLeft -= 1;
                $scope.qouteBtcTime = Math.floor(timeLeft / 60) + ":" + Math.floor(timeLeft % 60);
            }, 1000);
            $scope.btcTimeout = $timeout(function () {
                $scope.toggleBuyBitcoinView();
                localStorage.removeItem("quoteBtc");
                $interval.cancel($scope.btcInterval);
                $scope.btc = null;
                $scope.btcWatt = null;
            }, time);
        }

        var quote = localStorage.getItem("quoteBtc");
        if(quote === null) {
            $scope.toggleBuyBitcoinView();
        }
        else {
            var data = JSON.parse(quote);
            $scope.quotebtc = data.quote;
            console.log($scope.quotebtc)
            var currentDate = new Date(); 
            var timeLeft = parseInt(data.time) - currentDate.getTime() + 600000;
            
            if(timeLeft>0){
                $scope.startBtcTimeout(timeLeft);
            }
            else{
                $scope.toggleBuyBitcoinView();
                localStorage.removeItem("quoteBtc");
                $scope.btc = null;
                $scope.btcWatt = null;
            }
        }

        $scope.cancelBtc = function() {
            var check = $window.confirm("Do you really want to cancel?")
            if(check===false){
                return;
            }
            $scope.toggleBuyBitcoinView();
            localStorage.removeItem("quoteBtc");
            $timeout.cancel($scope.btcTimeout);
            $interval.cancel($scope.btcInterval);
            $scope.btc = null;
            $scope.btcWatt = null;
        }
    }
})();