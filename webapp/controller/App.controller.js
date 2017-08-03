sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "openui5/community/model/firebase/FirebaseModel"
], function(Controller, FirebaseModel) {
  "use strict";

  return Controller.extend("ui5lab.app.SquareApp.controller.App", {
    onInit: function () {
      // firebase config. These should be determined from your own
      // firebase database in the firebase console.
      var oFBConfig = {
        apiKey: "AIzaSyC_s5-cu9GaYwDGD1DH5HtE_-IwyrrH11Y",
        authDomain: "ui5test-28e70.firebaseapp.com",
        databaseURL: "https://ui5test-28e70.firebaseio.com",
        projectId: "ui5test-28e70",
        storageBucket: "ui5test-28e70.appspot.com",
        messagingSenderId: "101209272012"
      };
      var oViewModel = new FirebaseModel(null, oFBConfig);
      // Login to firebase
      oViewModel.getFirebasePromise().then(function(firebase){
        firebase.auth().signInAnonymously().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // TODO: Do something
        });
      });
      this.getView().setModel(oViewModel);
    }
  });
});
