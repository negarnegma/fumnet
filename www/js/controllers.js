angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginData.username = window.localStorage.getItem("savedusername");
    $scope.loginData.password = window.localStorage.getItem("savedpass");
    $scope.modal = modal;
    $scope.closeLogin = function(){$scope.modal.hide();};
  });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    window.localStorage.setItem("savedusername", $scope.loginData.username);
    window.localStorage.setItem("savedpass", $scope.loginData.password);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);//neg: remove it!!!
  };
})

.controller('PlaylistsCtrl', function($scope,$ionicPlatform,$sce) { 
  console.log("ghableready");
  $scope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
  }
//////////////////////////////
function parseHTML(html) {
  var t = document.createElement('template');
  t.innerHTML = html;
    return t;//.content.cloneNode(true);
  }


  $ionicPlatform.ready(function(){
    var storage = window.localStorage;
    $scope.matn = "سلام!"
    $scope.currentStatus = "کللیک کن";if (!$scope.$$phase) $scope.$apply();
    //LOGOUT FUNCTOIN:
   $scope.logOut = function (){
       if (storage.getItem("savedpass") == undefined){$scope.matn="رمزتو بده اول خو:|";return;}
       $scope.matn="در حال باربری.-.-\.-/.-\.-/.-\.-/";if (!$scope.$$phase) $scope.$apply();
       console.log($scope.loginData.username,$scope.loginData.password);
       // console.log(storage.getItem("savedusername"),storage.getItem("savedpass");
       window.cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.3; C5303 Build/12.1.A.1.205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
     //sakhte ibs_sesssid:
      window.cordovaHTTP.get("http://vpn-report.um.ac.ir/IBSng/user/",{},{},function(response){
      window.cordovaHTTP.setHeader("Cookie",response.headers["Set-Cookie"]);
      window.cordovaHTTP.post("http://vpn-report.um.ac.ir/IBSng/user/",{
      normal_username:storage.getItem("savedusername"),
      normal_password:storage.getItem("savedpass"),
      lang:"en",
      x:"12",
      y:"12"
      },
    {},
    function(response) {
        console.log("resheaders:"+JSON.stringify(response.headers));
        var kol = parseHTML (response.data);
        var joz = kol.querySelector(".Main_Page .List_Main  form");
        if (joz == undefined) {
          console.log(response.headers["Location"]);
          $scope.matn="ERRor signing in IBS..";if (!$scope.$$phase) $scope.$apply();
          joz = kol.querySelector(".error_messages");
          console.log(joz.innerText);
          if (joz!= undefined) $scope.matn=joz.innerText;
          if (!$scope.$$phase) $scope.$apply();
          return;
         }
         console.log(joz.unique_id_val.value);
         var negUniqID = parseInt(joz.unique_id_val.value);
         console.log(joz.ras_ip.value);
         var negRasIp = joz.ras_ip.value;
         $scope.matn="در حال بیرون انداختن..☼☺●◌ᴥ";if (!$scope.$$phase) $scope.$apply();
         window.cordovaHTTP.post("http://vpn-report.um.ac.ir/IBSng/user/home.php",
          {kill_me:1,
           ras_ip:negRasIp,
           unique_id_val:negUniqID
         },
         {},
         function(response){
           $scope.matn="حله انداختیمش بیرون";if (!$scope.$$phase) $scope.$apply();
         },
         function(response){
          console.log(response.status);
          $scope.matn="کد خطا: 2i"+response.status;if (!$scope.$$phase) $scope.$apply();//codeGozarie khataya:|2i404 :|
        });   
       },
       function(response) {
        console.log(response.status);
        $scope.matn="نتونستم به سرور متصل شم.کد خطا: 3i"+response.status;if (!$scope.$$phase) $scope.$apply();}
       );
    },function(response){
      $scope.matn="نتونستم به سرور متصل شم.کد خطا: 4i"+response.status;if (!$scope.$$phase) $scope.$apply();
    })
    //end of sakhte ibs_sesssid 
 };
 //END OF LOG OUT FUNCTION

  //LOGIN FUNCTION
    $scope.logInNet = function (){
     if (storage.getItem("savedpass") == undefined){$scope.matn="رمزتو بده اول خو:|";if (!$scope.$$phase) $scope.$apply();return;}
     window.cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.3; C5303 Build/12.1.A.1.205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
     window.cordovaHTTP.setHeader("Cookie","etag=undefined; cache=undefined");
     window.cordovaHTTP.post("https://hotspot.um.ac.ir/login",{
      dst :" ",
      popup:"true",
      username:storage.getItem("savedusername"),
      password:storage.getItem("savedpass")
     },{},function(response){
      $scope.matn="OK!logged in:)";if (!$scope.$$phase) $scope.$apply();
       var kol = parseHTML (response.data);
       var joz = kol.querySelectorAll("table div");//or selet : color = #FF8080 ...
       var theErr = joz[1];
       console.log(theErr);
       if (theErr != undefined){$scope.matn=theErr.innerText;if (!$scope.$$phase) $scope.$apply();}

     },function(response){
      $scope.matn="نشد دوباره امتحان کن چون:"+response.status;if (!$scope.$$phase) $scope.$apply();//add appropriate (:/) errors
     });
    };
  //END OF LOGIN 
  //updateStatusFun:
  $scope.updateStatus = function(){
    $scope.currentStatus="یه لحظه";if (!$scope.$$phase) $scope.$apply();
     console.log("Status: "+$scope.loginData.username,$scope.loginData.password);
     window.cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.3; C5303 Build/12.1.A.1.205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
     window.cordovaHTTP.setHeader("Cookie","etag=undefined; cache=undefined");
     window.cordovaHTTP.post("https://hotspot.um.ac.ir/",{},{},function(response){
      // console.log("status: "+JSON.stringify(response.headers));
      // // if (response.headers["Location"] == "http://hotspot.um.ac.ir/status")
      // if (response.data has login word:|)
      //   {$scope.currentStatus = response.status +"با این شماره هستی:";if (!$scope.$$phase) $scope.$apply();}
      // $scope.matn = response.data;if (!$scope.$$phase) $scope.$apply();
      // console.log(response.headers["Location"]);
      $scope.currentStatus = "متصل نیستی";if (!$scope.$$phase) $scope.$apply();//tajrobi
      //fix it
     },function(response){
      $scope.currentStatus = "نتونستم وضعیت رو چک کنم چون:" + response.status;if (!$scope.$$phase) $scope.$apply();
      // $scope.matn = response.data;if (!$scope.$$phase) $scope.$apply();
      // console.log("status: "+JSON.stringify(response.headers));
      window.cordovaHTTP.get("http://hotspot.um.ac.ir/status",{},{},function(response){
        var stPage = parseHTML(response.data);
        // var number = stPage.querySelector(".tabula");
        var number = stPage.getElementsByTagName("div");
        $scope.matn = number[0].innerHTML;//شماه دانشجویی
        $scope.currentStatus = "با این شماره هستی:";
        if (!$scope.$$phase) $scope.$apply();   //bayad dobar click mishod ta neshoon bede
      },function(response){console.log("cant get status page:" + response.status)}
      );

     });
  };
  //end updateStatus
});

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('BrowseCtrl', function($scope, $stateParams, $state) {

});