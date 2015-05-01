$(document).ready(function() {
if (!$.curCSS) $.curCSS = $.css; 
var countries = [
   "San Francisco",
   "Los Angeles",
   "Seattle",
   "Las Vegas",
   "Philadelphia",
   "New York City",
   "Washington D.C.",
   "Chicago",
   "Miami"
];

$('#q2').autocomplete({
    source: countries,
    messages: {
        noResults: '',
        results: function() {}
    }
});

});