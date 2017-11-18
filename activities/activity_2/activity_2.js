var container = $('#largeContainer');
$("#partsDepartmentIcon").hide();

//alert('activity 2.js');

var loadActivityView = function (viewId) {
   container.html('');
   var viewUrl = 'activities/activity_2/view' + viewId + '/';
   var viewName = 'view' + viewId;

   for(var c = 0; c <= 9; c++){
        removeScriptFile('activities/activity_2/view' + c + '/' + 'view' + c + ".js","js");
        removeScriptFile('activities/activity_2/view' + c + '/' + 'view' + c + ".css","css");
    }
   //Load content screen
   container.load(viewUrl + viewName + '.html', function() {
    

     /* head.load(
          viewUrl + viewName + ".js",
          viewUrl + viewName + ".css"
      );*/

      loadScriptFile(viewUrl + viewName + ".js", "js");
      loadScriptFile(viewUrl + viewName + ".css", "css");

   }).fadeIn('1000');
};

loadActivityView(0);

(function () {   

   
   //Sequence Activity 2 views with global sequencing
   $(document).on('currentTask_loaded', function (event, data) {
      var activity = data.activity + 1;
      var task = data.task + 1;

      /* Here's an example of using this event listener
      * to sequence the views
      * if(activity == 2 && task == 3)
      * {
      *     loadActivityView(3); //viewNumber
      * }
      */
      if(activity == 2 && task == 1)
      {
         loadActivityView(1); //viewNumber
      }
      else if(activity == 2 && task == 3)
      {
         loadActivityView(2); //viewNumber
      }
      else if (activity == 2 && task == 6)
      {
         loadActivityView(3);
      }
      else if (activity == 2 && task == 10)
      {
         loadActivityView(4);
      }
      else if (activity == 2 && task == 14)
      {
         loadActivityView(5);
      }
      else if (activity == 2 && task == 17)
      {
         loadActivityView(6);
      }
      else if (activity == 2 && task == 23)
      {
         loadActivityView(7);
      }
      else if (activity == 2 && task == 29)
      {
         loadActivityView(8);
      }
      else if (activity == 2 && task == 31)
      {
         loadActivityView(9);
      }

   });

})($);

