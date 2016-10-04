/** Stop watch function using createjs and javascript */
var rate = 1; /** Rate change depend upon the value from the experiment */

var clockContainer;

var now;

var	startAt,lapTime = 0; /** Time on the clock when last stopped in milliseconds */

var stop_watch_timer;

var pause_flag = true;

var hour=0, minute=0, second=0, millisecond=0, milli=0, total_time=0;

var time_array=[];

var listner_play;

//clock interval runs between 1 ms and 0.1ms 
function createStopwatch(stage,x,y,interval) {
	/** Creating  container */	
	interval<=0?rate=0.1:(interval>1?rate=1:rate=interval);
	clockContainer=new createjs.Container();
	clockContainer.name="container";
	stage.addChild(clockContainer);
	load_stopwatch_image("bg","../template/images/stopwatch.svg",x,y);
	load_stopwatch_image("play","../template/images/play.svg",x+100,y+95);
	load_stopwatch_image("pause","../template/images/stop.svg",x+100,y+95);	
	load_stopwatch_image("reset","../template/images/reset.svg",x+140,y+95);	
	getName("pause").visible=false;
	setText("stopWatchHr",x+66,y+73);	
	setText("stopWatchMin",x+100,y+73);
	setText("stopWatchSec",x+135,y+73);	
	setText("stopWatchmilli",x+170,y+73);
	initializeText("00","00","00","000",stage);
	listner_play = clockContainer.getChildByName("play").on("click",function(){startWatch(stage)});
	clockContainer.getChildByName("pause").on("click",function(){pauseWatch()});
	clockContainer.getChildByName("reset").on("click",function(){resetWatch()});

	/** Load images */
	function load_stopwatch_image(name,src,xPos,yPos){
		var image = new Image();
		image.src = src;
		var _bitmap = new createjs.Bitmap(image).set({});
		_bitmap.x=xPos;
		_bitmap.y=yPos;
		_bitmap.name=name;	
		if ( name=="play" || name=="pause" || name=="reset" ) {
			_bitmap.cursor="pointer";
		}	
		clockContainer.addChild(_bitmap);
	}
	/**remove clock from the stage*/
	removeClock = function(){
		stage.removeChild(clockContainer);
	}
	/**add clock to the stage*/
	showClock = function(){
		stage.addChild(clockContainer);
	}
	/** Time text in watch */
	function setText(name,textX,textY){  
		var text = new createjs.Text();
		text.x=textX;
		text.y=textY;
		text.textBaseline="alphabetic";
		text.name=name;
		text.font ="1.8em digiface";
		text.color="#000000";
		clockContainer.addChild(text);
	}	
	/** Stop or pause */
	pauseWatch = function() {
		getName("play").visible=true;
		getName("pause").visible=false;	
		/** If running, update elapsed time otherwise keep it */
		lapTime	= startAt ? lapTime + (now - startAt)/rate : lapTime;
		startAt	= 0; /** Paused */
		clearInterval(stop_watch_timer);
		pause_flag = true;
		stage.update();		
	}
	/** Reset the watch */
	resetWatch = function() {	
		initializeText("00","00","00","000",stage);
		pauseWatch();
		lapTime = 0;
	}
	stage.update();
}

/** Initialize text of the reading */
initializeText = function(hr, min, sec, milli,stage) {
	clockContainer.getChildByName("stopWatchmilli").text=milli;
	clockContainer.getChildByName("stopWatchSec").text=sec;
	clockContainer.getChildByName("stopWatchMin").text=min;
	clockContainer.getChildByName("stopWatchHr").text=hr;
	stage.update();
}

/** function to return chiled element of container */
getName = function(chldName){
	return clockContainer.getChildByName(chldName);
}

/** Show the stopwatch */
showWatch = function(stage) {	
	/** Initialize the time */
	getName("play").visible=false;
	getName("pause").visible=true;
	now = new Date().getTime();
	startAt	= startAt ? startAt : now;
	startStopWatch(stage); /** Start the watch */
	
}  
	
/** Stopwatch running function */  
startStopWatch = function(stage) {
	//duration	
	milli=(lapTime + (startAt ? (now - startAt)/rate : 0));	
	var milli_disp=lapTime + (startAt ? (now - startAt) : 0);
	var h = m = s = ms = 0;
	/** Finding hour, min, sec from the millisecond */
	h = Math.floor( milli / (60 * 60 * (1000)) );
	milli = milli % (60 * 60 * (1000));
	m = Math.floor( milli / (60 * (1000)) );
	milli = milli % (60 * (1000));
	s = Math.floor( milli / (1000) );
	ms = milli % (1000);
	
	second=pad(s, 2);
	minute=pad(m, 2);
	hour=pad(h, 2);

	millisecond=pad(milli_disp,3);
	time_array.push(total_time);
	total_time=(Number(hour)*60*60)+(Number(minute)*60)+(Number(second));
	initializeText(hour,minute,second,millisecond,stage);
}

/** Append the number max length with '0' */
function pad(num, size) {
	var s = "0000" + num;
	return s.substr(s.length - size);
}

/** Start the watch */
startWatch = function (stage) {		
	if(pause_flag){
	pause_flag=false;
	stop_watch_timer=setInterval(function(){showWatch(stage)},rate); 
	stage.update();
	}
}
