# UI5-firebase-model-samples
An example app showing you how to use the UI5 Firebase model in [https://github.com/jumpifzero/ui5-firebase-model](https://github.com/jumpifzero/ui5-firebase-model)


## Getting started
The sections below tell you how to run this demo application as well as what needs to be done to use the FirebaseModel in your own UI5 app.

## Running this demo app
1. Install node.js (get it from [nodejs.org](http://nodejs.org/)).
 * If working behind a proxy, you need to configure it properly (HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables)

2. Install grunt-cli if needed 
```sh
sudo npm install -g grunt-cli
```

3. Clone this repository and navigate into it
```sh
git clone https://github.com/jumpifzero/ui5-firebase-model-samples
cd ui5-firebase-model-samples
```

4. Install all npm dependencies
```sh
npm install
```

5. Run the application locally
You can deploy it to your favorite local web server or you can simply run
```sh
grunt connect
```
and navigate to [http://localhost:8080/](http://localhost:8080/)

## Using the FirebaseModel 

### Installation through npm (recommended)

Assuming you have node and npm installed, the easiest way to install ui5-firebase-model is to add it as a dependency. Perform the following:

1. Install via npm and save it as a dependency
```sh
npm instal --save ui5-firebase-model
```

2. Copy the file postInstall.js and add it into your app root (at the same level as `package.json` and `webapp`)
Don't have a package.json? [Read this](#i-dont-have-a-packagejson)

3. Add postInstall as a script to your `package.json`
In your package.json make sure your `script` entry contains the postInstall line. Like so:
``` json
"scripts": {
    "postinstall": "node postInstall.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

4. Execute postInstall
```sh
npm install
```

### Installation through manual labour

If you don't want to mess with npm you can do the following:
 1. Go to [the project's page on github](https://github.com/jumpifzero/ui5-firebase-model), download master as a zip 
 2. In your project, under webapp, create a folder called thirdparty
 3. Inside the zip file you downloaded, copy the folder `/ui5-firebase-model-master/src/` into your thirdparty folder.
 4. You should now have a webapp/thirdparty/openui5 folder with subfolders

### Usage
In general FirebaseModel is a drop-in replacement to a JSONModel and most methods of the JSONModel should work. 
Your views bindings to do not need any change. However, the model requires initialization (explained below).

#### Getting a Firebase database

If you're planning to use a firebase database, you need to create one in the cloud:
1. Login to your Google account and
2. Navigate to [the firebase console](https://console.firebase.google.com/)
3. Create a project. Choose a name and region
4. Select 'Add firebase to your web project'
5. You'll get a bit of javascript code. You need the config object:

``` sh
var config = {
    apiKey: "sOmeVeryLongCrYpTicKey",
    authDomain: "myproject-xxxxx.firebaseapp.com",
    databaseURL: "https://myproject-xxxx.firebaseio.com",
    projectId: "second-xxxx",
    storageBucket: "",
    messagingSenderId: "0123456789"
  };
```
6. Navigate to Authentication (left)
7. Navigate to login method and activate the anonymous login


#### Integrating the FirebaseModel in your app

Assuming you have the firebase Config object, you need to do something like the following, either in Component.js 
or in your controller's onInit:

```javascript
var oFBConfig = {
    apiKey: "sOmeVeryLongCrYpTicKey",
    authDomain: "myproject-xxxxx.firebaseapp.com",
    databaseURL: "https://myproject-xxxxx.firebaseio.com",
    projectId: "second-xxxx",
    storageBucket: "",
    messagingSenderId: "0123456789"
};
var oViewModel = new FirebaseModel(null, oFBConfig);
// Login to firebase
oViewModel.getFirebasePromise().then(function(firebase){
    firebase.auth().signInAnonymously().catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // TODO: Do something. Panic is acceptable
    });
});
this.getView().setModel(oViewModel);
```
The code above passes the firebase config object into the FirebaseModel constructor and then
sign's in anonymously. 


## Documentation

### Reading and writing single properties
Use `getProperty` and `setProperty` exactly like the JSONModel

### Writing to arrays
Call `.appendItem(sPath, oItem)`. This method adds an item to the array specified by `sPath` but makes
sure you are not destroying someone else's concurrent append which would not be true if you did a combination of 
`.getProperty + .push + .setProperty` as the last setProperty would override the array for everyone.

If you are sure you're FirebaseModel will only be used by a single user you can manipulate as an array in a JSONModel.

### Transactions

Firebase has methods to deal with transactional updates in multiple parts of the tree. TODO: DOCUMENT THIS.

## Help

### I don't have a package.json

On the root of your project run `npm init` and follow the prompts.
