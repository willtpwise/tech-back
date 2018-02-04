'use strict';
module.exports = function(app) {
  const controllers = require('../controllers/index.js');

  app.route('/messages')
    .post(controllers.messagesCreate);

  app.route('/health')
    .get(controllers.health)
};
