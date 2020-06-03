const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const startupSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {type: String, required: true},
    evaluation: { type: Number, requiered: true},
    founding: {type: Date, required: true},
},{
    timestamps: true,
});

const Startup = mongoose.model('Startup', startupSchema);
module.exports = Startup;