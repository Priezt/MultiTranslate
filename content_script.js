$(init);

function init(){
	add_result_div();
	document.addEventListener("mouseup", function(ev){
		//console.log(window.getSelection());
		//console.log(ev);
		//console.log("selection type: " + window.getSelection().type);
		//console.log("shift key: " + ev.shiftKey);
		if(window.getSelection().type == "Range" && ev.shiftKey == true){
			var text = "" + window.getSelection();
			console.log("translate: ", text);
			show_loading();
			chrome.extension.sendRequest({'action': 'translate', 'text': text}, function(response){
				show_result(response.result);
			});
		}else{
			if(ev.srcElement.className != "translation_result"){
				hide_result();
			}
		}
	});
	console.log("select event binded");
}

function show_loading(){
	$("#multi_translate").empty();
	$("#multi_translate").append("<progress></progress>").css("width", "200");
	$("#multi_translate").show();
}

function show_result(result_array){
	$("#multi_translate").empty();
	for(var c=0;c<result_array.length;c++){
		var text = result_array[c];
		$("#multi_translate").append(
			$("<div></div>")
				.css("display", "block")
				.addClass("translation_result")
				.text(text)
		).append($("<hr>"));
	}
}

function add_result_div(){
	console.log("add result div");
	$("body").append(
		$("<div></div>")
			.attr("id", "multi_translate")
			.css("display", "block")
			.css("position", "fixed")
			.css("left", "0px")
			.css("top", "0px")
			.css("border-style", "none")
			.css("background-color", "#8C8")
			.css("padding", "10px")
			.css("z-index", "50000")
			.css("text-align", "center")
			.css("width", "300px")
			.hide()
	);
}

function hide_result(){
	$("#multi_translate").hide();
}
