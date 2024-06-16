const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema({
    name: { type: String, require: true }, 
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    videoID: { type: String, maxLength: 255 },
    slug: { type: String, slug: 'name', unique: true }
    // createdAt: { type: Date, default: Date.now },
    // updatedAt:{ type: Date, default: Date.now }
}, 
{
    timestamps: true
});

Course.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')) {
        const sortType = req.query.type === 'desc' ? -1 : 1;
        return this.sort({
            [req.query.column]: sortType
        });
    }
    return this;
};

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', Course);