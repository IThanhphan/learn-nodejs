const Course = require('../models/Courses');
const {  mongooseToObject } = require('../../util/mongoose');

class CourseController {
    async show(req, res) {
        try {
            let course = await Course.findOne({ slug: req.params.slug }).exec();
            res.render('courses/show', {course:  mongooseToObject(course)});
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
    //get 
    create(req, res) {
        res.render('courses/create');
    }
    //post
    async store(req, res) {
        try {
            const course = new Course(req.body);
            await course.save();
            res.redirect('/');
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
    //get 
    async edit(req, res) {
        try {
            let course = await Course.findById(req.params.id).exec();
            res.render('courses/edit', {
                course: mongooseToObject(course),
            });
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
    //put
    async update(req, res) {
        try {
            let course = await Course.updateOne({ _id: req.params.id}, req.body);
            res.redirect('/me/stored/courses');
        } catch(error) {
            res.status(400).json({ error: 'error' });
        }
    }
}


module.exports = new CourseController;