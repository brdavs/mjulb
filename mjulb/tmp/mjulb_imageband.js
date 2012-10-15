(function( $ ){
  $.fn.mjulb = function(opt) {
    var opt = typeof(opt) == 'undefined' ? {} : opt;
    var dw = $(document).width();
    var dh = $(document).height();
    var ww = $(window).width();
    var wh = $(window).height();
    opt['scaling'] = typeof(opt['scaling']) == 'undefined' ? .9 : opt['scaling'];
    opt['transition'] = typeof(opt['transition']) == 'undefined' ? 300 : opt['transition'];
    opt['imageband'] = typeof(opt['imageband']) == 'undefined' ? false : opt['imageband'];
    var scaling;
    var m_img = '<div class="image"><a id="rw" href="#"><span>&#x25c0</span></a><a id="fw" href="#"><span>&#x25b6;</span></a></div><img/>';
    var modal = '<div id="modal"><div id="blind"></div>'+m_img+'</div>';
    var allhrefs=[]; $(this).map(function() {
      allhrefs.push( $(this).attr('href') );
    });
    
    // Scale an image to factor
    function scale(img, factor) {
      wasp = ww / wh;
      iasp = img.width / img.height;
      if ( wasp > iasp ) {
        return {
          top: wh/2-wh*factor/2 + $(window).scrollTop(),
          left: ww/2-wh*factor*iasp/2,
          width: wh*factor*iasp, 
          height: wh*factor, 
          apect: iasp }
      } else {
        return {
          top: wh/2-ww*factor*iasp/2 + $(window).scrollTop(),
          left: ww/2-wh*factor/2,
          width: wh*factor, 
          height: ww*factor*iasp, 
          apect: iasp }
      }
    }
    
    // Modal image changer
    function modal_changer(href) {
      var href_fw = allhrefs[$.inArray(href, allhrefs)+1];
      var href_rw = allhrefs[$.inArray(href, allhrefs)-1];
      $('#modal #fw').attr({href: href_fw});
      $('#modal #rw').attr({href: href_rw});
      $('<img/>').attr({src: href}).load(function() {
        var scaling = scale(this, opt['scaling']);
        var attributes = {
          position: 'absolute',
          display: 'none',
          left: scaling['left'], 
          top: scaling['top'], 
          width: scaling['width'], 
          height: scaling['height'], 
          'background-image': 'url('+href+')',
          'background-size': '100%',
          'z-index': 1
        }
        if ( $('#modal .image').attr('style') ) {
          $('<div class="temp"></div>').insertBefore('#modal .image');
          $('#modal .temp').attr({style: $('#modal .image').attr('style') });
        }
        $('#modal .image').css(attributes).fadeIn(opt['transition'], function() {
          $('#modal .temp').fadeOut(opt['transition'], function() {
            $(this).remove();
          });
        });
        $('#modal img').css({display: 'none'}).attr({src: href});
      });
    }
    
    // Galery image
    this.on('click', function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      $('body').append(modal);
      $('#modal').css({
        width: $(document).width(),
        height: $(document).height()
      }).fadeIn();
      modal_changer(href);
    });
    
    // Forward, Backward modal links
    $(document).on('click', '#modal #rw, #modal #fw', function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      modal_changer(href);
    });
    
    // Modal fader
    $(document).on('click', '#modal', function(e) {
      if (e.target.id!='fw' && e.target.id!='rw') {
        $(this).fadeOut('slow', function() {
          $(this).remove();
        });
      }
    });

    // Imageband
    function imageband(content) {
      var bandlength;
      $('body').append('<div id="imageband"></div>');
      $('#imageband').css({
        display: 'none',
        'z-index': 3
      });
      $('#imageband').append(content);
      var bandlength = ($('#imageband .image').outerWidth())*allhrefs.length
      $('#imageband .gallery').css({
        position: 'absolute',
        width: bandlength
      });
      $(document).mousemove(function(e) {
        if ( e.pageY > $(document).scrollTop()+$(window).height()-200 ) {
          $('#imageband').fadeIn(opt['transition']);
        } else {
          $('#imageband').fadeOut(opt['transition']);
        }
        positioning = -bandlength/$(window).width()*e.pageX+e.pageX;
        $('#imageband .gallery').css({left: positioning});
      });
    }
    if ( opt['imageband']!=false ) {
      var map =  $.map(this, function(n,i) {
        return '<div class="image" style="background-image: url('+$('img', n).attr('src')+')">'+$(n).html()+"</div>";
      }).join('');
      imageband('<div class="gallery">'+map+'</div>');
    }
    
    // The #imageband's image
    $(document).on('click', '#imageband .gallery a', function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      $('body').append(modal);
      $('#modal').css({
        width: $(document).width(),
        height: $(document).height()
      }).fadeIn();
      modal_changer(href);
    });
  };
})( jQuery );
