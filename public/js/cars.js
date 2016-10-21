"use strict";

// this is the base API url
var baseUrl = "http://mimeocarlisting.azurewebsites.net/api/cars/";

function formatCars(carsJSON) {
  // this function shold return a string of properly formatted html
  // refer to app/views/index.erb lines 16 - 22 for an example of how
  // to format three cars, each in a div with a class "col-md-4", in a 
  // div with a class "row"
  let template = $('#cars-row').html();
  let templateScript = Handlebars.compile(template);
  return templateScript(carsJSON);
}

function addCarsToDOM(carsJSON) {
  // this function should pass carsJSON to formatCars() and then 
  // add the resulting HTML to the div with an id of "cars"
  var html = formatCars(carsJSON);
  $("#cars").append(html);
}

function fetchJSON() {
  // this function will make the ajax call
  // on success of the ajax call, it will pass the returned data
  // to addCarsToDOM()

  // set apiPage based on number of rows on page
  let apiPage = $('#cars').children().length;
  let nextApiPage = apiPage + 1;
  let url = `http://mimeocarlisting.azurewebsites.net/api/cars/${nextApiPage}/3`;
  $.ajax({
    type: 'GET',
    url: url,
    contentType: 'application/json',
    dataType: 'jsonp',
    success: function(jsonData) {
      console.log("Success");
      addCarsToDOM(jsonData);
    },
    error: function() {
      console.log("Fail");
    }
  });
}