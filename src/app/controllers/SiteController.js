const Course = require('../models/Courses');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {

    async index(req, res) {
        try {
            let courses = await Course.find({});
            res.render('home', { 
                courses: mutipleMongooseToObject(courses)
            });
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }

    search(req, res) {
        res.render("search");
    }
}


module.exports = new SiteController;