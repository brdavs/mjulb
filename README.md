mjulb
=====
the world's smallest jQuery lightbox
------------------------------------

There are a great number of jQuery lightboxes out there. Come of them have an extensive feature set, some are plain bulky for no reason.

Mjulb is - to my knowledge - the smallest, simplest and most badass single file jQuery plugin, that _just does it's job_. Mjulb also includes CSS in a separate file, so you can design most aspects of it to fit your particular application design.

### Usage

When you have a page of images (or just a couple of links to them) which you want lightboxed, you can simply add this into a javascript file, loaded by your page:

```javascript
$(function() {
  $('a.common_class').mjulb();
});
```

There are only two options you can change, if you dislike the defaults:

```javascript
$(function() {
  $('a.common_class').mjulb({
    scaling: 0.9, 
    transition: 300
  });
});
```

- **scaling:** This scales the lightboxed image to maximum extent (0 to 1) of width or height (depending on aspects of image and screen).  
- **transition:** Time needed for image blending and (possibly) other effects.

You can separate several lightboxes on your page by simply grouping them with appropriate class. Any group of 'a' tags will become a lightbox group on their own, when used in this manner:

```javascript
$(function() {
  $('a.common_class').mjulb();
  $('a.another_common_class').mjulb();
  $('.special_group a').mjulb();
});
```

### Caveats

1. This is an image lightbox. It expects a href with an image.
4. Does not work in IE8 or lower. Support is planned, but I am ni no rush. Nudge me if you need this.
5. This software is released under the terms of GPLv3 (http://www.gnu.org/copyleft/gpl.html) or later licence. If you cannot accept the terms offered, you may not use mjulb.

### Contact
You are welcome to visit http://http://jqp.herokuapp.com/mjulb for more information.  
You may contact the author (Tony Anzlovar) at tony [at] formalibre [dot] si.  
Should you whish to donate to the project - the author accepts alcohol or thc as payment.
