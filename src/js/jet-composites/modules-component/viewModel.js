/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(
    ['ojs/ojcore', 'knockout', 'jquery', 'promise', 'ojs/ojlistview', 'ojs/ojarraydataprovider', 'ojs/ojdialog', 'ojs/ojbutton'], function (oj, ko, $) {
        'use strict';

        function ExampleComponentModel(context) {
            var self = this;
            self.composite = context.element;


            self.allItems = ko.observableArray();
            self.selectedItems = ko.observableArray([]); // observable bound to selection option to monitor current selections

            self.selectedIds = ko.observableArray([]);
            self.currentItemId = ko.observable();

            /// ajax call
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: "http://localhost:5000/jde/get_config",
                success: function (data) {
                    console.log(data[0].modules)
                    self.allItems(data[0].modules);

                }
            })




            self.dataProvider = new oj.ArrayDataProvider(self.allItems, {
                keys: self.allItems().map(function (value) {
                    return value.id;
                })
            });
    
            self.sliderValue = ko.observable(400);

            self.openAnimationEffect = ko.observable("zoomIn");

            self.handleOpen = function (event) {
                document.querySelector("#dialog1").open();
            };


            self.handleOKClose = function () {
                document.querySelector("#dialog1").close();
            };

            self.handleSelectionChanged = function(event)
            {
              console.log(event)
            }

            self.startAnimationListener = function (event) {
                var ui = event.detail;
                if (!$(event.target).is(".oj-dialog")) return;

                if ("open" === ui.action) {
                    event.preventDefault();
                    var action = self.openAnimationEffect();
                    var options = { "duration": self.sliderValue() + "ms" };
                    if ("none" === action)
                        ui.endCallback();
                    else
                        oj.AnimationUtils[action](ui.element, options).then(ui.endCallback);
                }
                else if ("close" === ui.action) {
                    event.preventDefault();
                    ui.endCallback();
                }
            }

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