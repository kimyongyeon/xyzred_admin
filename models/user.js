var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    site_agent: { type: String, unique: true},
    user_id:  { type: String, unique: true},
    amount:  { type: String},
    use_yn: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('agent', userSchema);
