var width=window.innerWidth;
var canvas_width=$("#playing_area").css("width");
var canvas_height=$("#playing_area").css("height");
var length=canvas_width.length;
canvas_width=parseInt(canvas_width.substring(0,length-2));
var height=canvas_height.length;
canvas_height=parseInt(canvas_height.substring(0,length-2));
var front_width=(width-canvas_width)/2;
width+="px";
canvas_width+="px";
canvas_height+="px";
front_width+="px";
$("#start").css({ "width" : width , "height" : canvas_height });
$("#front").css({ "width" : front_width , "height" : canvas_height , "float" : "left" });
$("#middle").css({ "width" : canvas_width , "height" : canvas_height , "float" : "left"});
$("#last").css({ "width" : front_width , "height" : canvas_height , "float" : "left"});