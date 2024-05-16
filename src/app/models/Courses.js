const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String, require: true }, 
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true }
    // createdAt: { type: Date, default: Date.now },
    // updatedAt:{ type: Date, default: Date.now }
}, {
    timestamps: true
});

module.exports = mongoose.model('Course', Course);