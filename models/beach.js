var mongoose  = require('mongoose');
var Schema  = mongoose.Schema;

var BeachSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Beach', BeachSchema);
