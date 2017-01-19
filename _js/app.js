;(function($, Modernizr, undefined){

  $(function(){

    /* Remove SVG images to avoid broken images in all browsers that don't support SVG. */
    /*==========================*/
    if (!Modernizr.svg) {
      $('img[src*=".svg"]').remove();
    }
    
    /* Prepare to have floated images fill the width of the design on blog pages on small devices. */
    /*==========================*/ 
    var images = $('.article img').load(function() {
      var src = $(this).attr('src').replace(/_grande\.|_large\.|_medium\.|_small\./, '.');
      var width = $(this).width();
      $(this).attr('src', src).attr('width', width).removeAttr('height');
    });

    /* Update cart page on blur of quantity input only if the quantity gets changed */
    /*==========================*/ 
    $('.cart-table').on('focus', '.cart-row__qty input', function(){
      var $this = $(this);
      var ogQty = $this.val();

      $this.one('blur', function(event) {
        if(ogQty != $this.val()){
          $('form[action="/cart"]').submit();  
        }
      });
    });

  });

})(jQuery, Modernizr);