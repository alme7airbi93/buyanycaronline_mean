var config = require('../config/env/development'),
  mongoose = require('mongoose');
module.exports = function() {
  var db = mongoose.connect(config.db);

  mongoose.set('useCreateIndex',true);
  //Models registration
  require('../app/models/vehicle.discriminator.server.js');
  require('../app/models/user.server.model');
  require('../app/models/article.server.model');

  return db;
};
