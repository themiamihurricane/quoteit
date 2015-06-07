$poster = $('#poster');
$preview = $('#preview');
$save = $('#make-img button');
$edit = $('#edit-img button');


var quotes = [
    {
        "quote": "A long time ago, a friend advised me to always leave a job when you still love it. That is certainly the case here.",
        "attr": "Donna E. Shalala, in an email announcing the end of her time as the University of Miami's president"
    }
];


var nameFile = function(){
	$text = $('#quote-text p').text();
	var t = $text.replace(/\s+/g, '_').toLowerCase().replace(/[^a-zA-Z0-9_]+/g, '').split('_', 4).join('_');

	return t;
};

var cleanText = function() {
	$text = $('#quote-text p').text();
	var t = $text.replace(/\"([^\"]*)\"/gi,"&#8220;$1&#8221;");
	$('#quote-text p').empty().append(t);
}

var savePoster = function(){
	var filename = nameFile();
	cleanText();
	html2canvas($poster, {
	  onrendered: function(canvas) {
	  	$poster.hide();
	    $preview.append(canvas);
	    var img = canvas.toDataURL();
        var a = $("<a>").attr("href", img).attr("download", "quote-" + filename + ".png").appendTo("body");
	  	a[0].click();
        a.remove();
        $preview.addClass('no-edit');
	  }
	});

	$edit.show();
}

var makePoster = function(i) {
	$('#quote-text p').empty().append('&ldquo;'+i.quote+'&rdquo;');
	$('#attr-text p').empty().append(i.attr);
}

var editPoster = function() {
	$edit.hide();
	$preview.removeClass('no-edit');
	$('canvas').remove();
	$poster.show();
}



$(function() {

	//$i = Math.floor(Math.random()*5);
	makePoster(quotes[0]);

	var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements, {
    	disableToolbar: true,
    	disableReturn: true
    });

	var quoteSize = $("#quote-font-size").slider()
		.data('slider')
		.on('slide', function(){
			$('#quote-text p').css( 'font-size', quoteSize.getValue() +'px');
		});

	var attrSize = $("#attr-font-size").slider()
		.data('slider')
		.on('slide', function(){
			$('#attr-text p').css( 'font-size', attrSize.getValue() +'px');
		});

	$save.on('click', savePoster);
	$edit.on('click', editPoster);

});




//  adjust size of preview viewport according to 16x9 ratio on resize and on pageload
$(window).on('resize',function(){
	var w = $poster.width();
	$poster.height(w*0.5625);
}).resize();
