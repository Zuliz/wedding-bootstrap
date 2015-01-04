
$(document).ready(function(){/* smooth scrolling for scroll to top */
	$('.scroll-top').click(function(){
	  $('body,html').animate({scrollTop:0},800);
	})
	/* smooth scrolling for scroll down */
	$('.scroll-down').click(function(){
	  $('body,html').animate({scrollTop:$(window).scrollTop()+800},1000);
	})

	/* highlight the top nav as scrolling occurs */
	$('body').scrollspy({ target: '#navbar' })

	/*$("#menu").mmenu();
	
	$("#button").click(function() {
         $("#menu").trigger("open.mm");
      });
	$("#button").click(function() {
         $("#menu").trigger("close.mm");
      });*/
	
});

function scrollNav(id){
			$('html,body').animate({scrollTop: $(""+id).offset().top},'slow');
}

/*$(function() {  
    var pull        = $('#pull');  
        menu        = $('nav ul');  
        menuHeight  = menu.height();  
  
    $(pull).on('click', function(e) {  
        e.preventDefault();  
        menu.slideToggle();  
    });  

    $(window).resize(function(){  
	    var w = $(window).width();  
	    if(w > 500 && menu.is(':hidden')) {  
	        menu.removeAttr('style');  
	    }  
	});
});  */

$(function() {
		var $menu = $('nav#menu'),
			$html = $('html, body');

		$menu
			.mmenu()
			.find( 'a' )
			.on( 'click',
				function()
				{
					var href = $(this).attr( 'href' );
					$menu.one(
						'closed.mm',
						function()
						{
							setTimeout(
								function()
								{
									$html.animate({
										scrollTop: $( href ).offset().top
									});	
								}, 10
							);	
						}
					);
				}
			)
			.end()
			.find( 'li' )
			.first()
			.trigger( 'setSelected' );
	});