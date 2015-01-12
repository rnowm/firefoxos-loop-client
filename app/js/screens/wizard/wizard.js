(function(exports) {
  'use strict';

  var wizardPanel, wizardLogin, termsOfServiceElement;

  var _ = navigator.mozL10n.get;

  function localize() {
    termsOfServiceElement.innerHTML = _('termsOfServiceAndPrivacyNotice');
  }

  function render() {
    if (wizardPanel) {
      return;
    }

    wizardPanel = document.getElementById('wizard-panel');
    wizardPanel.innerHTML = Template.extract(wizardPanel);

    postRendering();
  }

  function postRendering() {
    wizardLogin = document.getElementById('wizard-login');
    termsOfServiceElement =
              document.getElementById('terms-of-service-and-privacy-notice');
    Branding.naming(wizardPanel);
    Wizard.localize();
    window.addEventListener('localized', localize);
    wizardPanel.classList.remove('hide');
  }

  var Wizard = {
    init: function w_init(isFirstUse, success, error) {

      render();

      Authenticate.init();

      if (!isFirstUse) {
        // Show the right panel
        wizardPanel.dataset.step = 6;
        wizardPanel.classList.add('login');
        wizardLogin.classList.add('show');
        success();
        return;
      }

      Tutorial.init();
      success();
    },

    localize: function w_localize() {
      if (navigator.mozL10n.readyState === 'complete') {
        localize();
      } else {
        navigator.mozL10n.ready(localize);
      }
    }
  };

  exports.Wizard = Wizard;
}(this));
