/*
    MJULB, a tiny lightbox for jQuery.
    Copyright (C) 2012  Toni Anzlovar

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var $,
  __slice = [].slice;

$ = jQuery;

$.fn.extend({
  mjulb: function() {
    var all, b, d, dh, dw, e, mblind, modal_changer, s, scale, scaling, t, transition, w, wh, ww, _arg;
    _arg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    scaling = _arg.scaling, transition = _arg.transition;
    b = $('body');
    d = $(document);
    w = $(window);
    dw = d.width();
    dh = d.height();
    ww = w.width();
    wh = w.height();
    all = this.map(function() {
      return $(this).attr('href');
    });
    s = scaling != null ? scaling : scaling = 0.9;
    t = transition != null ? transition : transition = 300;
    e = function(o) {
      var attr, k, v;
      if (!o.content) {
        o.content = '';
      }
      if (!o.el) {
        o.el = 'div';
      }
      attr = (function() {
        var _results;
        _results = [];
        for (k in o) {
          v = o[k];
          if (k !== 'el' && k !== 'content') {
            _results.push("" + k + "='" + v + "'");
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      })();
      if (o.el !== 'img') {
        return "<" + o.el + " " + (attr.join(' ')) + ">" + o.content + "</" + o.el + ">";
      } else {
        return "<" + o.el + " " + (attr.join(' ')) + "/>";
      }
    };
    mblind = e({
      el: 'div',
      id: 'modal',
      content: [
        e({
          el: 'div',
          id: 'blind',
          style: "width:" + dw + "px; height:" + dh + "px"
        }), [
          e({
            el: 'div',
            "class": 'content',
            content: [
              e({
                el: 'a',
                id: 'rw'
              }), e({
                el: 'a',
                id: 'fw'
              })
            ].join('')
          }), e({
            el: 'img'
          })
        ].join('')
      ].join('')
    });
    scale = function(img) {
      var iasp, nh, nw, out, wasp;
      wasp = ww / wh;
      iasp = img.width / img.height;
      nw = ww * s;
      nh = wh * s;
      if (wasp > 1) {
        nw = nh * iasp;
      } else {
        nh = nw / iasp;
      }
      return out = {
        top: (wh - nh) / 2 + w.scrollTop(),
        left: (ww - nw) / 2,
        width: nw,
        height: nh
      };
    };
    this.on('click', function(e) {
      e.preventDefault();
      b.append(mblind);
      $('#modal').fadeIn();
      return modal_changer($(this).attr('href'));
    });
    d.on('click', '#modal #fw, #modal #rw', function(e) {
      e.preventDefault();
      return modal_changer($(this).attr('href'));
    });
    d.on('click', '#modal', function(e) {
      if (e.target.id !== 'fw' && e.target.id !== 'rw') {
        return $(this).fadeOut('slow', function() {
          return $(this).remove();
        });
      }
    });
    modal_changer = function(href) {
      var fw, mc, mt, rw, temp, _name, _name1, _ref, _ref1;
      rw = (_ref = all[_name = $.inArray(href, all) - 1]) != null ? _ref : all[_name] = all[all.length - 1];
      fw = (_ref1 = all[_name1 = $.inArray(href, all) + 1]) != null ? _ref1 : all[_name1] = all[0];
      $('#modal #fw').attr({
        href: fw
      });
      $('#modal #rw').attr({
        href: rw
      });
      mc = $('#modal .content');
      mt = $('#modal .temp');
      temp = e({
        el: 'div',
        "class": 'temp'
      });
      return $('<img/>').attr({
        src: href
      }).load(function() {
        var attr, sc;
        sc = scale(this);
        attr = {
          position: 'absolute',
          display: 'none',
          left: sc.left,
          top: sc.top,
          width: sc.width,
          height: sc.height,
          'background-image': "url('" + href + "')",
          'background-size': '100%',
          'z-index': 1
        };
        if (mc.attr('style')) {
          $(temp).insertBefore(mc);
          mt.attr({
            style: mc.attr('style')
          });
        }
        mc.css(attr).fadeIn(t, function() {
          return mt.fadeOut(t, function() {
            return $(this).remove();
          });
        });
        return $('#modal img').css({
          display: 'none'
        }).attr({
          src: href
        });
      });
    };
    return true;
  }
});
