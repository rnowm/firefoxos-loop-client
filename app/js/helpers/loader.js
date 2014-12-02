(function(exports) {
  'use strict';

  /*
   * The goal of this code is to have a unique entry point to request
   * the lazy loading of a given piece of code.
   *
   * For importing an external 'element', we need to create it in
   * /elements folder. Each element should contain the links & scripts
   * needed to work and the 'template' with all the content to load into
   * the panel.
   *
   * The panel, for reusable elements (as feedback) will be added via JS.
   *
   * In the case of standalone elements, as create screen, will be directly
   * into the HEAD of our HTML. Dont forget to add 'is' attribute in the HEAD
   * link or script and in the element within the markup.
   *
   */

  const PANELS_ID = {
    feedback: 'feedback',
    create_room: 'new-room',
    conversation_detail: 'conversation-detail'
  }

  var Loader = {
    getShare: function() {
      if (window.Share) {
        return Promise.resolve(Share);
      }
      return new Promise((resolve, reject) => {
        LazyLoader.load(
          ['js/helpers/share.js'],
          () => {
            resolve(Share);
          }
        );
      });
    },
    getWizard: function() {
      if (window.Wizard) {
        return Promise.resolve(Wizard);
      }

      return new Promise((resolve, reject) => {
        LazyLoader.load(
          [
            'style/wizard.css',
            'js/screens/wizard/authenticate.js',
            'js/screens/wizard/tutorial.js',
            'js/screens/wizard/wizard.js'
          ],
          () => {
            resolve(Wizard);
          }
        );
      });
    },
    getRoomCreate: function() {
      if (window.RoomCreate) {
        return Promise.resolve(RoomCreate);
      }
      return new Promise((resolve, reject) => {
        HtmlImports.populate(function() {
          resolve(RoomCreate);
        }, PANELS_ID.create_room);
      });
    },
    getConversationDetail: function() {
      if (window.ConversationDetail) {
        return Promise.resolve(ConversationDetail);
      }
      return new Promise((resolve, reject) => {
        HtmlImports.populate(function() {
          resolve(ConversationDetail);
        }, PANELS_ID.conversation_detail);
      });
    },
    getRoomDetail: function() {
      if (window.RoomDetail) {
        return Promise.resolve(RoomDetail);
      }

      return new Promise((resolve, reject) => {
        LazyLoader.load(
          [
            'style/room_detail.css',
            'js/screens/room_detail.js'
          ],
          () => {
            resolve(RoomDetail);
          }
        );
      });
    },
    getFeedback: function(attention) {
      if (window.FeedbackScreen) {
        return Promise.resolve(FeedbackScreen);
      }

      return new Promise((resolve, reject) => {
        // Shield against multiple requests
        if (!document.querySelector('#' + PANELS_ID.feedback)) {
          // Create the panel
          var panel = document.createElement('section');
          panel.id = PANELS_ID.feedback;
          panel.setAttribute('is', PANELS_ID.feedback);
          panel.className = 'vbox modal hide';
          document.body.appendChild(panel);

          var link = document.createElement('link');
          link.href = attention ? '../elements/feedback.html':'elements/feedback.html';
          link.setAttribute('rel', 'import');
          // This is adding an extra functionality to our code. This is pointing
          // the 'import' we need to load feedback, so we are going to load just
          // this panel.
          link.setAttribute('is', 'feedback');
          document.body.appendChild(link);
        }

        HtmlImports.populate(function() {
          resolve(FeedbackScreen);
        }, PANELS_ID.feedback);
      });
    },
    getRoomsSynchronizer: function() {
      if (window.RoomsSynchronizer) {
        return Promise.resolve(RoomsSynchronizer);
      }

      return new Promise((resolve, reject) => {
        LazyLoader.load(
          [
            'js/helpers/rooms_synchronizer.js'
          ],
          () => {
            resolve(RoomsSynchronizer);
          }
        );
      });
    }
  };

  exports.Loader = Loader;
}(this));
