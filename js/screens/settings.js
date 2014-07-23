(function(exports) {
  'use strict';

  var _settingsPanel, _logoutSettingsButton, _cleanCallsButton,
      _cleanUrlsButton, _videoDefaultCheck, _commitHashTag;

  var _isVideoDefault = true;
  const VIDEO_SETTING = 'video-default';

  var Settings = {
    get isVideoDefault() {
      return _isVideoDefault;
    },
    reset: function s_clear() {
      asyncStorage.setItem(
        VIDEO_SETTING,
        true
      );
      _isVideoDefault = true;
    },
    init: function s_init(identity) {
      document.getElementById('settings-logout-identity').textContent =
        'Logged as ' + identity;

      if (_settingsPanel) {
        return;
      }
      _settingsPanel = document.getElementById('settings-panel');
      _logoutSettingsButton = document.getElementById('settings-logout-button');
      _cleanCallsButton = document.getElementById('settings-clean-calls-button');
      _cleanUrlsButton = document.getElementById('settings-clean-urls-button');
      _videoDefaultCheck = document.getElementById('video-default-setting');
      _commitHashTag = document.getElementById('settings-commit-hash-tag');

      asyncStorage.getItem(
        VIDEO_SETTING,
        function onSettingRetrieved(isVideoDefault) {
          if (isVideoDefault === null) {
            Settings.reset();
          } else {
            _isVideoDefault = isVideoDefault;
          }
          _videoDefaultCheck.checked = _isVideoDefault;
          _videoDefaultCheck.addEventListener(
            'change',
            function(e) {
              _isVideoDefault = e.target.checked;
              asyncStorage.setItem(
                VIDEO_SETTING,
                _isVideoDefault
              );
            }
          );
        }
      );

      _cleanCallsButton.addEventListener(
        'click',
        function() {
          CallLog.cleanCalls();
          this.hide();
        }.bind(this)
      );

      _cleanUrlsButton.addEventListener(
        'click',
         function() {
          CallLog.cleanUrls();
          this.hide();
        }.bind(this)
      );

      _logoutSettingsButton.addEventListener(
        'click',
        function onLogout() {
          this.hide();
          LoadingOverlay.show('Logging out...');
          Controller.logout();
        }.bind(this)
      );

      if (_commitHashTag && Version.id) {
        _commitHashTag.textContent = Version.id;
      }
    }
  };

  exports.Settings = Settings;
}(this));
