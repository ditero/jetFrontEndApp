define(['knockout'],
    function(ko) {
        function model(context) {
                var self = this;
               //viewmodel code goes here

               self.user = ko.observable("");
               self.password = ko.observable("");
               self.aisurl = ko.observable("http://demo.steltix.com");
               self.submittedValue = ko.observable("");
               self.tracker = ko.observable();
               self.storeCreds = ko.observable(true);
              var event;
               var req = {};
               //CAll AISURL using AJAX
               self.callAIS = function() {

                 req.deviceName = 'aisTester'; // + $("#text-user").val(); // <<---- here change to a unique name
                 req.username = self.user();
                 req.password = self.password();
                  event = new CustomEvent('loggedIn', {detail: {
                   deviceName: req.deviceName,
                   nextRoute: "dashboard"
                 }})

                 // authenticate with the system by getting a token
                 $.ajax({
                   url: self.aisurl() + "/jderest/tokenrequest", // <<- JD Edwards API token service
                   type: 'post', // <<- the method that we using
                   data: JSON.stringify(req), // <<- JSON of our request obj
                   contentType: 'application/json', // <<- telling server how we are going to communicate
                   fail: function(xhr, textStatus, errorThrown) {

                     console.log(errorThrown, textStatus, xhr); //  <<- log any http errors to the console

                   }
                 }).done(function(data, textStatus, xhr) {

                   if (data.hasOwnProperty('userInfo')) { // <<- see example response below

                     var token = data.userInfo.token;
                     localStorage.setItem('token', token);
                      document.dispatchEvent(event);
                     console.log("Login Token: "+token);
                   }
                 });

               };

               self.submitBt = function(data, event) {
                 var tracker = self.tracker();
                 // ensure that no component in the page is invalid, before submitting the form.
                 if (tracker.invalidHidden || tracker.invalidShown) {
                   tracker.showMessages();
                   tracker.focusOnFirstInvalid();
                   self.submittedValue("");
                   return;
                 }
                 self.submittedValue(self.user() + " - " + self.password());
                 if(self.storeCreds()){

                   localStorage.setItem('username', self.user());
                 }
                 this.callAIS();
                 return true;
               }

               $("input").keypress(function(e) {
                 if ((e.which && e.which == $.ui.keyCode.ENTER) || (e.keyCode && e.keyCode == $.ui.keyCode.ENTER)) {
                   //validate the element before submitting
                   var valid = true;
                   if (e.target.type === "password") {
                     valid = $("#" + e.target.id).ojInputPassword("validate");
                   } else if (e.target.type === "text") {
                     valid = $("#" + e.target.id).ojInputText("validate");
                   }
                   if (valid) {
                     self.submitBt();
                     return false;
                   }
                   self.submittedValue("");
                   return true;
                 } else {
                   return true;
                 }
               });

                self.exampleObservable = ko.observable("login-component");
        }
    return model;
});
