$poster = $('#poster');
$preview = $('#preview');
$save = $('#make-img button');
$edit = $('#edit-img button');


var quotes = [
    {
        "quote": "A long time ago, a friend advised me to always leave a job when you still love it. That is certainly the case here.",
        "attr": "Donna E. Shalala, in an email announcing the end of her time as the University of Miami's president"
    },
    {
        "quote": "Yo, Taylor, I'm really happy for you, I'ma let you finish, but Beyoncé had one of the best videos of all time!",
        "attr": "Kanye West, interrupting Taylor Swift's acceptance speech for Best Female Video at the 2009 MTV Video Music Awards"
    },
    {
        "quote": "In terms of inclusiveness, I think UM is like those partitioned Styrofoam plates; you get a little bit of everything, but they don’t touch.",
        "attr": "Senior Mischael Cetoute, regarding race relations at the University of Miami"
    },
    {
        "quote": "I have a great desire to take the university to the next level. This is the Miami moment. The university is poised to achieve great heights.",
        "attr": "Dr. Julio Frenk at the announcement of his role as the University of Miami's next president"
    },
    {
        "quote": "C-A-N-E-S, Canes!",
        "attr": "Sebastian the Ibis"
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

	$i = Math.floor(Math.random()*5);
	makePoster(quotes[$i]);

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
