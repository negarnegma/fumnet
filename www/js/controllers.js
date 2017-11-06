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
    //LOGOUT FUNCTOIN:
   $scope.logOut = function (){
     if ($scope.loginData.password == undefined){$scope.matn="رمزتو بده اول خو:|";return;}
     $scope.matn="در حال باربری.-.-\.-/.-\.-/.-\.-/";if (!$scope.$$phase) $scope.$apply();
     console.log("loadingehttpmoon");
     console.log($scope.loginData.username,$scope.loginData.password);
     window.cordovaHTTP.setHeader("User-Agent", "Mozilla/5.0 (Linux; Android 4.3; C5303 Build/12.1.A.1.205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.124 Mobile Safari/537.36");
   //sakhte ibs_sesssid:
    window.cordovaHTTP.get("http://vpn-report.um.ac.ir/IBSng/user/",{},{},function(response){
    window.cordovaHTTP.setHeader("Cookie",response.headers["Set-Cookie"]);
    window.cordovaHTTP.post("http://vpn-report.um.ac.ir/IBSng/user/",{
    normal_username:$scope.loginData.username,
    normal_password:$scope.loginData.password,
    lang:"en",
    x:"12",
    y:"12"
    },
  {},
  function(response) {
      console.log("resheaders:"+JSON.stringify(response.headers));
      var kol = parseHTML (response.data);
      var joz = kol.querySelector(".Main_Page .List_Main  form");$scope.matn="1"+response.status;if (!$scope.$$phase) $scope.$apply();
      if (joz == undefined) {
         $scope.matn="امانت شما آزاد است.";if (!$scope.$$phase) $scope.$apply();//حالت های مختلف رو اضافه کن..وارد نشدن و...
         return;
       }$scope.matn="2"+response.status;if (!$scope.$$phase) $scope.$apply();
       console.log(joz.unique_id_val.value);
       var negUniqID = parseInt(joz.unique_id_val.value);
       console.log(joz.ras_ip.value);
       var negRasIp = joz.ras_ip.value;
       window.cordovaHTTP.post("http://vpn-report.um.ac.ir/IBSng/user/home.php",
        {kill_me:1,
         ras_ip:negRasIp,
         unique_id_val:negUniqID
       },
       {},
       function(response){console.log(response.status);$scope.matn="3"+response.status;if (!$scope.$$phase) $scope.$apply();
         $scope.matn="حله انداختیمش بیرون";if (!$scope.$$phase) $scope.$apply();
       },
       function(response){console.log(response.status);$scope.matn="2"+response.status;if (!$scope.$$phase) $scope.$apply();})   
     },
     function(response) {console.log(response.status);$scope.matn="1"+response.status;if (!$scope.$$phase) $scope.$apply();}
     );
  },function(response){})
  //end of sakhte ibs_sesssid 
 };
 //END OF LOG OUT FUNCTION

  //LOGIN FUNCTION
    $scope.logInNet = function (){
     if ($scope.loginData.password == undefined){$scope.matn="رمزتو بده اول خو:|";return;}
    }
  //END OF LOGIN FUNCTION
   console.log("bade request");
});

})

.controller('PlaylistCtrl', function($scope, $stateParams) {

})

.controller('BrowseCtrl', function($scope, $stateParams, $state) {

});