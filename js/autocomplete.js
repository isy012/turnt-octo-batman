$(document).ready(function() {
if (!$.curCSS) $.curCSS = $.css; 
var countries = [
   "Comcast",
   "Verizon",
   "AT&T",
   "Time Warner Cable",
   "NetZero"
];

$('#q1').autocomplete({
    source: countries,
    messages: {
        noResults: '',
        results: function() {}
    }
});

});