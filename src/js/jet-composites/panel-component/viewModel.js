/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.firsttUser = ko.observable();
        self.userAccounts = ko.observableArray([]);
        self.envDescription = ko.observableArray([]);
        self.secondUser = ko.observable();
        self.thirdUser = ko.observable();
        self.composite = context.element;
        //Example observable
        // self.messageText = ko.observable('Hello from Example Component');

    // REquest data from the back-end server
    $.ajax({
      url: "http://localhost:5000/jde/get_config", // <<- JD Edwards API token service
      type: 'get', // <<- the method that we using
      data: JSON,
      contentType: 'application/json', // <<- telling server how we are going to communicate
      fail: function(xhr, textStatus, errorThrown) {

        console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console

      }
    }).done(function(data, textStatus, xhr) {

      for (var key in data) {
          // self.accounts.push(data.description)
          // console.log(data);
          var myAccounts = data[0].accounts;
          // console.log(myAccounts);
          for (var i = 0; i < myAccounts.length; i++) {
            // console.log(myAccounts[i].environments[i].ais)
<<<<<<< HEAD
            self.userAccounts.push(myAccounts[i])
            self.envDescription.push(myAccounts[i].environments[i])
=======

            self.userAccounts.push(myAccounts[i])
            // self.envDescription.push(myAccounts[i].environments[i])
>>>>>>> 8edcbfb4daa2943b80f89fa808eaafc779bc4944
          }
      }

      // self.firsttUser(data[0].accounts[0].description);
      //
      // self.secondUser(data[0].accounts[1].description);
      //
      // self.thirdUser(data[0].accounts[2].description)


      // console.log(data[0].accounts);

      console.log("*****************");

      var uiData = JSON.stringify(data)
      // console.log(uiData);

      // for (var i = 0; i < uiData.length; i++) {
      //   // console.log(uiData);
      // }
    });

    // self.header = ko.observable(sehdBind);
    // self.header  = hdBind;
    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};
    context.props.then(function (propertyMap) {
      //Store a reference to the properties for any later use
      self.properties = propertyMap;

      //Parse your component properties here

    });
  };

    return ExampleComponentModel;
});
