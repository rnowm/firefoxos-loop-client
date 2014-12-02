'use strict';

(function(exports) {

  var modal, subjectInput, closeButton, resetButton, callButton, counter, form;

  var callAction, dismissAction;

  var _ = navigator.mozL10n.get;

  const CONFIG = {
    maxSubjectSize: 100
  };

  function render() {
    if (modal) {
      return;
    }

    modal = document.getElementById('conversation-detail');
    subjectInput = modal.querySelector('input');
    subjectInput.placeholder = _('subjectPlaceHolder');
    closeButton = modal.querySelector('.icon-close');
    callButton = modal.querySelector('.call');
    resetButton = modal.querySelector('input + button');
    counter = modal.querySelector('.counter');
    form = modal.querySelector('form');
  }

  function show(cb) {
    modal.classList.remove('hide');
    // We emit this event to center properly the header
    window.dispatchEvent(new CustomEvent('lazyload', {
      detail: modal
    }));
    // Allow UI to be painted before launching the animation
    setTimeout(() => {
      modal.addEventListener('transitionend', function onTransitionEnd() {
        modal.removeEventListener('transitionend', onTransitionEnd);
        cb();
      });
      modal.classList.add('show');
    }, 50);
  }

  function hide() {
    modal.addEventListener('transitionend', function onTransitionEnd() {
      modal.removeEventListener('transitionend', onTransitionEnd);
      removeHandlers();
      clearSubject();
      modal.classList.add('hide');
    });
    modal.classList.remove('show');
  }

  function onClose() {
    dismissAction();
    hide();
  }

  function onCall() {
    callAction();
    hide();
  }

  function clearSubject(evt) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    subjectInput.value = '';
    calculateCounter();
  }

  function calculateCounter() {
    var subject = subjectInput.value.trim();
    var countdown = counter.dataset.countdown = CONFIG.maxSubjectSize - subject.length;
    var key = countdown < 0 ? 'negativeCharactersCountdown' : 'charactersCountdown';
    counter.textContent = _(key, {
      value: countdown
    });
    callButton.disabled = countdown < 0;
  }

  function attachHandlers() {
    closeButton.addEventListener('click', onClose);
    callButton.addEventListener('click', onCall);
    resetButton.addEventListener('touchstart', clearSubject);
    form.addEventListener('input', calculateCounter);
  }

  function removeHandlers() {
    closeButton.removeEventListener('click', onClose);
    callButton.removeEventListener('click', onCall);
    resetButton.removeEventListener('touchstart', clearSubject);
    form.removeEventListener('input', calculateCounter);
  }

  exports.ConversationDetail = {
    show: function() {
      return new Promise((resolve, reject) => {
        callAction = resolve;
        dismissAction = reject;
        render();
        show(attachHandlers);
      });
    }
  };

}(window));
