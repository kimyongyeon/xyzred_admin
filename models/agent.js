var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agentSchema = new Schema({
    site_agent:  { type: String, unique: true},
    referer:  { type: String},
    crash_rate: { type: Number},
    riskPer_rate: { type: Number},
    use_yn: String,
    published_date: { type: Date, default: Date.now  }
});

module.exports = mongoose.model('agent', agentSchema);
