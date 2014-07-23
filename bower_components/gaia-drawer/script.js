(function(define){'use strict';define(function(require,exports,module){
/*globals define*//*jshint node:true*/

/**
 * Locals
 */

var baseComponents = window.COMPONENTS_BASE_URL || 'bower_components/';
var base = window.GAIA_DRAWER_BASE_URL || baseComponents + 'gaia-drawer/';

// Extend from the HTMLElement prototype
var proto = Object.create(HTMLElement.prototype);

/**
 * Runs when an instance of the
 * element is first created.
 *
 * When use this moment to create the
 * shadow-dom, inject our template
 * content, setup event listeners
 * and set the draw state to match
 * the initial `open` attribute.
 *
 * @private
 */
proto.createdCallback = function() {
  var root = this.createShadowRoot();
  var html = template.content.cloneNode(true);

  // Fetch some els
  this.els = {};
  this.els.background = html.querySelector('.background');
  this.els.content = html.querySelector('.main');
  this.els.inner = html.querySelector('.inner');

  this.attachEvents();
  this.toggle(this.hasAttribute('open'));

  // Put content in the shadow-dom
  root.appendChild(html);
  this.styleHack();
};

/**
 * Load in the the component's styles.
 *
 * We're working around a few platform bugs
 * here related to @import in the shadow-dom
 * stylesheet. When HTML-Imports are ready
 * we won't have to use @import anymore.
 *
 * @private
 */
proto.styleHack = function() {
  var style = document.createElement('style');
  var self = this;

  this.style.visibility = 'hidden';
  style.innerHTML = '@import url(' + base + 'style.css);';
  style.setAttribute('scoped', '');
  this.classList.add('content', 'host');
  this.appendChild(style);

  // There are platform issues around using
  // @import inside shadow root. Ensuring the
  // stylesheet has loaded before putting it in
  // the shadow root seems to work around this.
  style.addEventListener('load', function() {
    self.shadowRoot.appendChild(style.cloneNode(true));
    self.style.visibility = '';
    self.styled = true;
    self.dispatchEvent(new CustomEvent('styled'));
  });
};

/**
 * Runs when any attribute changes
 * on the element.
 *
 * We only support the `open` attribute,
 * so we ignore all others. We then toggle,
 * opening the drawer for all values other
 * than `null` (which means the attribute
 * was removed).
 *
 * @param  {String} attr
 * @param  {String|null} oldVal
 * @param  {String|null} newVal
 * @private
 */
proto.attributeChangedCallback = function(attr, oldVal, newVal) {
  if (attr !== 'open') { return; }
  this.toggle(newVal !== null);
};

proto.attachEvents = function() {
  this.els.background.addEventListener('click', this.close.bind(this));
  this.els.content.addEventListener('click', function(e) {
    e.stopPropagation();
  });
};

/**
 * Toggle the drawer open/closed.
 *
 * If a value is passed, we ignore the
 * current `open` value and just derive
 * the state from the value given (similar
 * to how `classList.toggle` works).
 *
 * @param  {Boolean} value
 * @public
 */
proto.toggle = function(value) {
  value = arguments.length ? value : !this.hasAttribute('open');
  if (value) { this.open(); }
  else { this.close(); }
};

/**
 * Open the drawer.
 *
 * We have to also duplicate the
 * attribute on the `.inner` element
 * inside the shadow-root as we are
 * currently missing the `:host`
 * selector from the platform.
 *
 * @public
 */
proto.open = function() {
  this.setAttribute('open', '');
  this.els.inner.setAttribute('open', '');
};

/**
 * Close the drawer.
 *
 * We have to also duplicate the
 * attribute on the `.inner` element
 * inside the shadow-root as we are
 * currently missing the `:host`
 * selector from the platform.
 *
 * @public
 */
proto.close = function() {
  this.removeAttribute('open');
  this.els.inner.removeAttribute('open');
};

// HACK: Create a <template> in memory at runtime.
// When the custom-element is created we clone
// this template and inject into the shadow-root.
// Prior to this we would have had to copy/paste
// the template into the <head> of every app that
// wanted to use <gaia-header>, this would make
// markup changes complicated, and could lead to
// things getting out of sync. This is a short-term
// hack until we can import entire custom-elements
// using HTML Imports (bug 877072).
var template = document.createElement('template');
template.innerHTML = [
  '<div class="inner">',
    '<div class="background"></div>',
    '<div class="main">',
      '<content></content>',
    '</div>',
  '</div>'
].join('');

// Register and return the constructor
module.exports = document.registerElement('gaia-drawer', { prototype: proto });

});})((function(n,w){'use strict';return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:
function(c){var m={exports:{}},r=function(n){return w[n];};
w[n]=c(r,m.exports,m)||m.exports;};})('gaia-drawer',this));
