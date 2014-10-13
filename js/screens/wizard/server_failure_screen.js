(function(exports) {
  'use strict';

  var serverFailurePanel;
  var ok;

  var ServerFailureScreen = {
    init: function w_init() {
      if (serverFailurePanel) {
        return;
      }
      serverFailurePanel = document.getElementById('server-failure-screen');
      ok = document.getElementById('server-failure-ok');
      ok.onclick = (function() {
        this.hide();
      }).bind(this);

    },
    show: function s_show() {
      serverFailurePanel.classList.add('show');
    },
    hide: function s_hide() {
      serverFailurePanel.addEventListener('transitionend', function onTransitionEd() {
        serverFailurePanel.removeEventListener('transitionend', onTransitionEd);
        serverFailurePanel.classList.remove('show');
      });
      serverFailurePanel.classList.add('invisible');
    }
  };

  exports.ServerFailureScreen = ServerFailureScreen;
}(this));

ServerFailureScreen.init();
