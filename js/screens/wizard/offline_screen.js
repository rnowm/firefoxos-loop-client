(function(exports) {
  'use strict';

  var offlinePanel;
  var ok;
  var retry;
  var settingButton;

  function _showSettingsView() {
    var activity = new window.MozActivity({
      name: 'configure',
      data: {
        target: 'device',
        section: 'root',
        filterBy: 'connectivity'
      }
    });
    activity.onerror = function() {
      console.warn('Configure activity error:', activity.error.name);
    };
  }

  var OfflineScreen = {
    init: function w_init() {
      if (offlinePanel) {
        return;
      }
      offlinePanel = document.getElementById('offline-screen');
      ok = document.getElementById('offline-ok');
      retry = document.getElementById('offline-retry');
      ok.onclick = retry.onclick = (function() {
        this.hide();
      }).bind(this);
      settingButton = document.getElementById('offline-settings-button');
      settingButton.onclick = function() {
        _showSettingsView();
      };
    },
    show: function s_show() {
      offlinePanel.classList.add('show');
    },
    hide: function s_hide() {
      offlinePanel.addEventListener('transitionend', function onTransitionEd() {
        offlinePanel.removeEventListener('transitionend', onTransitionEd);
        offlinePanel.classList.remove('show');
      });
      offlinePanel.classList.add('invisible');
    }
  };

  exports.OfflineScreen = OfflineScreen;
}(this));

OfflineScreen.init();
