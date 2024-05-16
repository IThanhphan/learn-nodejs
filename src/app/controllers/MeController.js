const Course = require('../models/Courses');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    async storedCourses(req, res) {
        try {
            let courses = await Course.find({});
            res.render('me/stored-courses', { 
                courses: mutipleMongooseToObject(courses)
            });
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
}

module.exports = new MeController;