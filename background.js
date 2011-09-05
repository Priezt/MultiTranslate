var target_language_list = ["ko", "fr", "ja", "zh", "en"];
var target_language_fifo = new Array();
var translated_result = new Array();
var source_lang;
var source_text;
var response_func;

google.load("language", "1");

chrome.extension.onRequest.addListener(function(req, sender, send_response){
	if(req.action == "translate"){
		var text = req.text;
		console.log("translate text: " + text);
		google.language.detect(text, function(dresult){
			console.log("detect result: " + dresult.language);
			if(dresult.language == ""){
				console.log("cannot detect language");
				send_response({'result': []});
			}else{
				target_language_fifo = new Array();
				for(var c=0;c<target_language_list.length;c++){
					target_language_fifo.push(target_language_list[c]);
				}
				translated_result = new Array();
				source_lang = dresult.language;
				source_text = text;
				response_func = send_response;
				window.setTimeout("translate_loop()", 100);
			}
		});
	}
});

console.log("load complete");

function translate_loop(){
	if(target_language_fifo.length == 0){
		response_func({'result': translated_result});
		return;
	}
	var target_lang = target_language_fifo.pop();
	console.log("translate to: " + target_lang);
	google.language.translate(source_text, source_lang, target_lang, function(result){
		console.log("result: " + result.translation);
		translated_result.push(result.translation);
		window.setTimeout("translate_loop()", 100);
	});
}
