var $ = require('jquery');

var http = require('http');

var options = {
    host: 'jquery.com',
    port: 80,
    path: '/'
};
var jsdom = require("jsdom").jsdom;
var fs = require('fs');
fs.readFile('page.htm', {encoding: "utf8"}, function (err, markup) {
  if (err) throw err;
  var doc = jsdom(markup);
  var window = doc.parentWindow;
  var $ = require('jquery')(window)
  var outerLeft = $(".left").clone().wrap('<div></div>').parent().html();
  var innerLeft = $(".left").html();
  console.log(outerLeft, "and ...", innerLeft);
});
var html = '';
http.get(options, function(res) {
    res.on('data', function(data) {
        // collect the data chunks to the variable named "html"
        html += data;
    }).on('end', function() {
        // the whole of webpage data has been collected. parsing time!
        var title = $(html).find('title').text();
        console.log(title);
     });
});