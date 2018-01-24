/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
  function(oj, ko) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'login': {label: 'login', isDefault: true},
         'menue': {label: 'menue'},
         'dashboard': {label: 'Dashboard'},
         'incidents': {label: 'Incidents'},
         'customers': {label: 'Customers'},
         'about': {label: 'About'}
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      self.unreadIncidentsNum = ko.observable();

      // Load user profile
self.userProfileModel = ko.observable();

self.getUserProfile = function () {
  data.getUserProfile().then(function(response){
    processUserProfile(response);
  }).catch(function(response){
    oj.Logger.warn('Failed to connect to MCS. Loading from local data.');
    self.isOnlineMode(false);
    //load local profile data
    data.getUserProfile().then(function(response){
      processUserProfile(response);
    });
  });
}



      // Navigation setup
  //
  //     var navData = [
  //     {name: 'Dashboard', id: 'dashboard',
  //      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
  //     {name: 'Incidents', id: 'incidents',
  //      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
  //     {name: 'Customers', id: 'customers',
  //      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
  //     {name: 'About', id: 'about',
  //      iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
  //     ];
  //     self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
  //
  //     self.drawerChange = function (event) {
  //   self.closeDrawer();
  // };
  // Navigate to customer by id
    self.goToCustomer = function(id) {
      self.router.go('customers/customerDetails/' + id);
    };

    // Navigate to incident by id
    self.goToIncident = function(id, from) {
      self.router.go('incident/' + id);
      self.fromIncidentsTab = from;
    };

    self.goToSignIn = function() {
      self.router.go('signin');
    };

    self.goToIncidents = function() {
      var destination = self.fromIncidentsTab || 'tablist';
      self.router.go('incidents/' + destination);
    };

    self.goToCreateIncident = function() {
      self.fromIncidentsTab = 'tablist';
      self.router.go('createIncident');
    };

    self.drawerChange = function (event) {
      self.closeDrawer();
    };

    self.toggleDrawer = function () {
      return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
    };

    self.closeDrawer = function () {
      return oj.OffcanvasUtils.close({selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
    };


  self.toggleDrawer = function () {
    return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
  };

  self.closeDrawer = function () {
    return oj.OffcanvasUtils.close({selector: '#navDrawer', modality: 'modal', content: '#pageContent' });
  };

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.hancock@oracle.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
      ]);
     }

     return new ControllerViewModel();
  }
);
