/*
A simple FAQ Plugin which can fetch FAQs from a shared Google Docs
Vivek
vivekv@vivekv.com
http://www.vivekv.com

Usage
Create a div with the id "faq" and add the below code into your webpage

<script type="text/javascript" >
$(function(){

$("#faq").faq({
	csv : 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AlsQ1nfxAXPfdFIyYl9RRk5jMzVXdV9LY3BnVEdYZkE&output=csv',
	hideOthers: 'true',
	heading: 'h1'
	});
	
});
</script>

Options
-------
csv: This is the CSV file shared on Google Docs. You may also use a csv file from other location
hideOthers: Set this to true if you want to show only the selected questions answer and hide all other answers. false by default
heading: The heading type that you want to set for the Questions. Example, h1, h2, h3, h4 and h5. h3 is default

*/

(function($){

	$.fn.faq = function(options) {

	var defaults = {
		hideOthers : 'false',
		heading : 'h3' // 
	} ;
	var options = $.extend(defaults,options);

		return this.each(function(){

			var obj = $(this);
			obj.html('');

			var yqlURL =	"http://query.yahooapis.com/v1/public/yql?q="+
					"select%20*%20from%20csv%20where%20url%3D'"+encodeURIComponent(options.csv)+
					"'%20and%20columns%3D'question%2Canswer'&format=json&callback=?";
			
			$.getJSON(yqlURL,function(msg){
				$.each(msg.query.results.row,function(){
		
					var answer = this.answer.replace(/""/g,'"').replace(/^"|"$/g,'');
					var question = this.question.replace(/""/g,'"').replace(/^"|"$/g,'');
					obj.append("<" + options.heading +" class=\"question\" >" + question + "</"+ options.heading + "><div class=\"answer\">" + answer +"</div>") ;
					$(".answer",obj).hide();
					$(options.heading,obj).css("cursor","pointer");
				});
				
			});
			
			
			$(options.heading,obj).live("click",function(){
				var next = $(this).next();
					if(next.is(":visible") == false)
					{
						if(options.hideOthers == 'true')
						{
							$("div",obj).slideUp('slow');
						}
						next.show("slow");
					}
					else
					next.hide("slow");
					
				});
			



		});
	}

})(jQuery);
