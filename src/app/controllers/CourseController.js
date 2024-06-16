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
            // const course = new Course(req.body);
            // await course.save();
            console.log(req.body);
            res.redirect('/me/stored/courses');
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

    async destroy(req, res, next) {
        try {
            let course = await Course.delete({ _id: req.params.id});
            res.redirect('back');
        } catch(next) {

        }
    }

    async restore(req, res, next) {
        try {
            let course = await Course.restore({ _id: req.params.id});
            res.redirect('back');
        } catch(next) {

        }
    }

    async forceDestroy(req, res, next) {
        try {
            let course = await Course.deleteOne({ _id: req.params.id});
            res.redirect('back');
        } catch(next) {

        }
    }

    async handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                try {
                    let course = await Course.delete({ _id: { $in: req.body.courseIds }});
                    res.redirect('back');
                } catch(next) {
        
                }
                break;
            default:
                res.json({ message: 'invalid' })
                break;
        }
    }
}


module.exports = new CourseController;