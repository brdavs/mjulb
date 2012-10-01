mjulb - The little lightbox that could
======================================

There are a great number of jQuery lightboxes out there. Come of them have an extensive feature set, some are plain bulky for no reason.

Mjulb is - to my knowledge - the smallest, simplest and most badass single file jQuery plugin, that _just does it's job_. There are precious few things to configure, but it's tiny, and super simple to use. Mjulb also includes CSS in a separate file, so you can design most aspects of it to fit your particular application design.

Usage
-----

When you have a page of images (or just a couple of links to them) which you want lightboxed, you can simply add this into a javascript file, loaded by your page:
`$(function() {
  $('.thumb.frame a').tlb();
});`

There are only three options you can change, if you dislike the defaults:
`$(function() {
  $('.thumb.frame a').tlb({
    scaling: 0.9, 
    transition: 300, 
    imageband: true
  });
});`

**scaling:** This scales the lightboxed image to maximum percentage of width or height (depending on aspects of image and screen).  
**transition:** Time needed for image blending and (possibly) other effects.
**imageband:** Will render and additional navigational image bar at the bottom of the screen if set to anything other than nil.

Caution
-------
Until this (YES, THIS CAUTION) notice is removed, this project is not usable. The reason is - it was developped together with a gallery project, and now needs a clear separation. Please, bare with me.

Thank you for your patience



