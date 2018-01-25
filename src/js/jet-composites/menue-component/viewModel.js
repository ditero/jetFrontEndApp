 /**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
'ojs/ojnavigationlist',
'ojs/ojconveyorbelt',
'ojs/ojpopup', 'jet-composites/panel-component/loader', 'jet-composites/login-component/loader'], function (oj, ko, $) {
    'use strict';

    function ExampleComponentModel(context) {
        var self = this;
        self.composite = context.element;
        //Example observable
        // self.messageText = ko.observable('Hello from Example Component');
        self.selectedItem = ko.observable('');
            self.selectedItemText = ko.observable('');
            self.currentItem = ko.observable('');

            self.panel = ko.observable() // Initially blank

            this.optionChange = function(event){
              if (self.currentItem() === "modules") {
                $("login-component").removeClass("state");
                $("panel-component").addClass("state");
                // self.panel("<panel-component></panel-component>");
              } else {
                $("login-component").addClass("state");
                $("panel-component").removeClass("state");
              }
                //display popup
                // self.selectedItemText(event.detail.value);
                //  document.getElementById('popup1').open('#' + event.detail.value,
                //    {my:{horizontal:'start', vertical:'bottom'},
                //     at:{horizontal:'center', vertical:'top'}
                //    });
            };

        context.props.then(function (propertyMap) {
            //Store a reference to the properties for any later use
            self.properties = propertyMap;

            //Parse your component properties here

        });
    };

    //Lifecycle methods - uncomment and implement if necessary
    //ExampleComponentModel.prototype.activated = function(context){
    //};

    //ExampleComponentModel.prototype.attached = function(context){
    //};

    //ExampleComponentModel.prototype.bindingsApplied = function(context){
    //};

    //ExampleComponentModel.prototype.detached = function(context){
    //};

    return ExampleComponentModel;
});
