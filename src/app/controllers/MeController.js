const Course = require('../models/Courses');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    async storedCourses(req, res) {
        try {
            let deletedCoursesCount = await Course.countDocumentsWithDeleted({ deleted: true });
            let courseQuery = Course.find({}).sortable(req);
            let courses = await courseQuery;
            res.render('me/stored-courses', { 
                deletedCoursesCount,
                courses: mutipleMongooseToObject(courses)
            });
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }

    async trashCourses(req, res, next) {
        try {
            let courses = await Course.findWithDeleted({deleted:true});
            res.render('me/trash-courses', { 
                courses: mutipleMongooseToObject(courses)
            });
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
}

module.exports = new MeController;