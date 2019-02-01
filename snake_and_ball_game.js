if (localStorage.getItem("snake_and_ball_game_high_score") === null) 
{
  localStorage.setItem("snake_and_ball_game_high_score", "0");
  localStorage.setItem("snake_and_ball_game_winner_name", "-");
}
var width=window.innerWidth;
var canvas_width=$("#playing_area").css("width");
var canvas_height=$("#playing_area").css("height");
var length=canvas_width.length;
var canvas = document.getElementById("playing_area");
var ctx=canvas.getContext("2d");
canvas_width=parseInt(canvas_width.substring(0,length-2));
var height=canvas_height.length;
canvas_height=parseInt(canvas_height.substring(0,length-2));
var front_width=(width-canvas_width)/2;
var factor=0.2;
var your_score_height=canvas_height*factor;
var control_height=canvas_height*(1-2*factor);
var arrow_width=50;
var arrow_height=50;
var between_arrow_margin=25;
var top_arrow_margin_top=between_arrow_margin;
var top_arrow_margin_left=(front_width-arrow_width)/2;
var left_arrow_margin_left=(front_width-arrow_width)/2-between_arrow_margin-(arrow_width);
var left_arrow_margin_top=between_arrow_margin;
var right_arrow_margin_left=2*between_arrow_margin+arrow_width;
var right_arrow_margin_top=left_arrow_margin_top;
var bottom_arrow_margin_left=top_arrow_margin_left;
var bottom_arrow_margin_top=2*between_arrow_margin+arrow_height;
var border=20;
var start_game_margin_left=front_width+canvas_width/8;
var pause_left_margin=canvas_width/8;
var restart_game_left_margin=canvas_width/8;
var snake_width=15;
var snake_height=15;
var playing_area_width=canvas_width-2*border;
var playing_area_height=canvas_height-2*border;
var snake=[];
var snake_head_x;
var snake_head_y;
var snake_new_head;
var direction;
var new_direction;
var ball_x;
var ball_y;
var pause=0;
var game_over_message="GAME OVER!!!";
var game_over_size=50;
var game_over_x=border+playing_area_width/2;
var game_over_y=border+playing_area_height/2;
var player_name;
while(1)
{	
	player_name = prompt("Enter your name").trim();
	if(player_name==null)
	{
		alert("You have to enter your name");
	}
	else
	{
		if(player_name=="")
		{
			alert("You have to enter your name");
		}
		else
		{
			for(i=0;i<player_name.length;i++)
			{
				if(player_name.charAt(i)==' ')
				{
					continue;
				}
				if((player_name.charCodeAt(i)>=65&&player_name.charCodeAt(i)<=90)||(player_name.charCodeAt(i)>=97&&player_name.charCodeAt(i)<=122))
				{
					continue;
				}
				else
				{
					alert("Name should contain only letters");
					break;
				}
			}
			if(i==player_name.length)
			{
				break;
			}
		}
	}
}
ctx.fillStyle="#8B4513";
ctx.fillRect(0,0,canvas_width,border);
ctx.fillRect(0,border,border,canvas_height);
ctx.fillRect(border,canvas_height-border,canvas_width,canvas_height);
ctx.fillRect(canvas_width-border,border,canvas_width,canvas_height-border);
ctx.fillStyle="black";
var i;
for(i=border;i<canvas_width;i+=border)
{
	ctx.moveTo(i,0);
	ctx.lineTo(i,border);
	ctx.stroke();
	ctx.moveTo(i,canvas_height-border);
	ctx.lineTo(i,canvas_height);
	ctx.stroke();
}
for(i=border;i<canvas_height;i+=border)
{
	ctx.moveTo(0,i);
	ctx.lineTo(border,i);
	ctx.stroke();
	ctx.moveTo(canvas_width-border,i);
	ctx.lineTo(canvas_width,i);
	ctx.stroke();
}
width+="px";
canvas_width+="px";
canvas_height+="px";
front_width+="px";
your_score_height+="px";
control_height+="px";
arrow_width+="px";
arrow_height+="px";
between_arrow_margin+="px";
top_arrow_margin_top+="px";
top_arrow_margin_left+="px";
left_arrow_margin_left+="px";
left_arrow_margin_top+="px";
right_arrow_margin_top+="px";
right_arrow_margin_left+="px";
bottom_arrow_margin_top+="px";
bottom_arrow_margin_left+="px";
start_game_margin_left+="px";
pause_left_margin+="px";
restart_game_left_margin+="px";
game_over_size+="px Arial";
$("#start").css({ "width" : width , "height" : canvas_height });
$("#front").css({ "width" : front_width , "height" : canvas_height , "float" : "left" });
$("#middle").css({ "width" : canvas_width , "height" : canvas_height , "float" : "left"});
$("#last").css({ "width" : front_width , "height" : canvas_height , "float" : "left"});
$("#your_score_display").css({ "width" : front_width , "height" : your_score_height , "background-color" : "lightgreen"});
$("#high_score_display").css({ "width" : front_width , "height" : your_score_height , "background-color" : "powderblue"});
$("#winner_name_display").css({ "width" : front_width , "height" : your_score_height , "background-color" : "powderblue"});
$("#controls").css({ "width" : front_width , "height" : control_height , "background-color" : "white"});
$("#controls_text").css({ "margin-top" : "0px" , "font-size" : "25px" , "text-align" : "center" });
$("#top_arrow").css({ "width" : arrow_width , "height" : arrow_height , "margin-top" : top_arrow_margin_top , "margin-left" : top_arrow_margin_left });
$("#top_arrow_img").css({ "width" : arrow_width , "height" : arrow_height ,"margin" : "0px" });
$("#top_arrow_btn").css({ "padding" : "0px" });
$("#left_arrow").css({ "width" : arrow_width , "height" : arrow_height , "float" : "left" ,"margin-top" : left_arrow_margin_top , "margin-left" : left_arrow_margin_left });
$("#left_arrow_img").css({ "width" : arrow_width , "height" : arrow_height ,"margin" : "0px" });
$("#left_arrow_btn").css({ "padding" : "0px" });
$("#right_arrow").css({ "width" : arrow_width , "height" : arrow_height  ,  "float" : "left","margin-top" : right_arrow_margin_top , "margin-left" : right_arrow_margin_left});
$("#right_arrow_img").css({ "width" : arrow_width , "height" : arrow_height ,"margin" : "0px" });
$("#right_arrow_btn").css({ "padding" : "0px" });
$("#bottom_arrow").css({ "width" : arrow_width , "height" : arrow_height , "margin-top" : bottom_arrow_margin_top , "margin-left" : bottom_arrow_margin_left});
$("#bottom_arrow_img").css({ "width" : arrow_width , "height" : arrow_height ,"margin" : "0px" });
$("#bottom_arrow_btn").css({ "padding" : "0px" });
$("#your_score_text").css({ "margin-top" : "0px" ,"margin-bottom" : "0px" , "text-align" : "center" , "font-size" : "25px" , "color" : "white" });
$("#your_score_score").css({ "margin-top" : "15px" ,"text-align" : "center" , "font-size" : "40px" , "color" : "white" });
$("#high_score_text").css({ "margin-top" : "0px" ,"margin-bottom" : "0px" , "text-align" : "center" , "font-size" : "25px" , "color" : "white" });
$("#high_score_score").css({ "margin-top" : "15px" ,"text-align" : "center" , "font-size" : "40px" , "color" : "white" });
$("#start_game").css({ "margin-top" : "20px", "margin-left" : start_game_margin_left });
$("#pause").css({  "margin-left" : pause_left_margin });
$("#restart_game").css({  "margin-left" : restart_game_left_margin });
$("#winner_name_text").css({ "margin-top" : "0px" ,"margin-bottom" : "0px" , "text-align" : "center" , "font-size" : "25px" , "color" : "white" });
$("#winner_name_name").css({ "margin-top" : "15px" ,"text-align" : "center" , "font-size" : "40px" , "color" : "white" });
$("#high_score_score").text(localStorage.getItem("snake_and_ball_game_high_score"));
$("#winner_name_name").text(localStorage.getItem("snake_and_ball_game_winner_name"));

$(document).ready(function()
{
	draw_snake_block();
	$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").attr("disabled" , true);
	$("#pause").attr("disabled" , true);
	$("#restart_game").attr("disabled" , true);
	direction="right";
});

$("#start_game").click(function()
{
	$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").attr("disabled" , false);
	$("#pause").attr("disabled" , false);
	$("#start_game").attr("disabled" , true);
	pause=0;
	draw_snake();
});

$("#pause").click(function()
{
	if(pause==0)
	{
		$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").attr("disabled" , true);
		$("#restart_game").attr("disabled" , false);
		$("#pause").text("CONTINUE");
		pause=1;
		draw_snake();
	}
	else
	{
		$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").attr("disabled" , false);
		$("#restart_game").attr("disabled" , true);
		$("#pause").text("PAUSE");
		pause=0;
		draw_snake();
	}
});

$("#restart_game").click(function()
{
	$("#start_game").attr("disabled" , false);
	$("#restart_game").attr("disabled" , true);
	initialize();
});

$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").click(function()
{
	id=this.id;
	new_direction=id.substring(0,id.indexOf("_"));
	if(direction=="left"&&new_direction!="right")
	{
		direction=new_direction;
	}
	else if(direction=="right"&&new_direction!="left")
	{
		direction=new_direction;
	}
	else if(direction=="top"&&new_direction!="bottom")
	{
		direction=new_direction;
	}
	else if(direction=="bottom"&&new_direction!="top")
	{
		direction=new_direction;
	}
});

for(i=4;i>0;i--)
{
	snake.push({
		x:i,
		y:(playing_area_height/2)/snake_height
	})
}

function draw_snake_block()
{
	x=snake[0].x;
	y=snake[0].y;
	ctx.fillStyle="grey";
	ctx.fillRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
	ctx.fillStyle="black";
	ctx.strokeRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
	for(i=1;i<snake.length;i++)
	{
		x=snake[i].x;
		y=snake[i].y;
		ctx.fillStyle="green";
		ctx.fillRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
		ctx.fillStyle="black";
		ctx.strokeRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
	}
}

function draw_snake()
{
	ctx.clearRect(border,border,playing_area_width,playing_area_height);
	snake_head_x=snake[0].x;
	snake_head_y=snake[0].y;
	draw_snake_block();
	draw_ball();
	if(direction=="left")
	{
		snake_head_x-=1;
	}
	else if(direction=="right")
	{
		snake_head_x+=1;
	}
	else if(direction=="top")
	{
		snake_head_y-=1;
	}
	else
	{
		snake_head_y+=1;
	}
	if(snake_head_x==ball_x&&snake_head_y==ball_y)
	{
		set_ball();
		var initial_score = $("#your_score_score").html();
		initial_score=parseInt(initial_score)+1;
		var high_score = $("#high_score_score").html();
		high_score=parseInt(high_score);
		if(high_score<initial_score)
		{
			localStorage.setItem("snake_and_ball_game_high_score", initial_score);
  			localStorage.setItem("snake_and_ball_game_winner_name", player_name);
			$("#high_score_score").text(initial_score);
			$("#winner_name_name").text(player_name);
		}
		$("#your_score_score").text(initial_score);
	}
	else
	{
		snake.pop();
	}

	snake_new_head={
		x:snake_head_x,
		y:snake_head_y
	}
	snake.unshift(snake_new_head);
	if(snake[0].x<0||snake[0].y<0||snake[0].x>=playing_area_width/snake_width||snake[0].y>=playing_area_height/snake_height)
	{
		$("#restart_game").attr("disabled" , false);
		$("#pause").attr("disabled" , true);
		game_over();
		return;
	}
	for(i=1;i<snake.length;i++)
	{
		if(snake[i].x==snake[0].x&&snake[i].y==snake[0].y)
		{
			game_over();
			return;
		}
	}
	if(pause==0)
	{
		var w=setTimeout(draw_snake,100);
	}
}

function game_over()
{
	ctx.fillStyle="red";
	ctx.font = game_over_size;
	var game_over_x_final=game_over_x-ctx.measureText(game_over_message).width/2;
	ctx.fillText(game_over_message,game_over_x_final,game_over_y);
}

function set_direction(a)
{
	direction=a;
}

function set_ball()
{
	while(1)
	{
		ball_x=Math.round(Math.random()*(playing_area_width/snake_width)+1);
		if(ball_x<playing_area_width/snake_width)
		{
			break;
		}		
	}
	while(1)
	{
		ball_y=Math.round(Math.random()*(playing_area_height/snake_height)+1);
		if(ball_y<playing_area_height/snake_height)
		{
			break;
		}
	}
}

set_ball();

function draw_ball()
{
	x=ball_x;
	y=ball_y;
	ctx.fillStyle="red";
	ctx.fillRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
	ctx.fillStyle="black";
	ctx.strokeRect(x*snake_width+border,y*snake_height+border,snake_width,snake_height);
}

function initialize()
{
	snake=[];
	for(i=4;i>0;i--)
	{
		snake.push({
			x:i,
			y:(playing_area_height/2)/snake_height
		})
	}
	ctx.clearRect(border,border,playing_area_width,playing_area_height);
	set_ball();
	draw_snake_block();
	$("#your_score_score").text("0");
	direction="right";
	pause=0;
	$("#top_arrow_btn,#bottom_arrow_btn,#left_arrow_btn,#right_arrow_btn").attr("disabled" , true);
}