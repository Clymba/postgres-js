const db = require('../db')

class CourseController {
    async createcourse(req, res) {
        const {code_course, date_of_start, date_of_end, type_of_cousre, status_of_course} = req.body
        const newCat = await db.query('INSERT INTO course (code_course, date_of_start, date_of_end, type_of_cousre, status_of_course) values ($1, $2, $3, $4, $5) RETURNING *', [code_course, date_of_start, date_of_end, type_of_cousre, status_of_course])
        res.json(newCat.rows)
    }
    async getcourse(req, res) {
        const course = await db.query('SELECT * FROM course')
        res.json(course.rows)
    }
    async getOnecourse(req, res) {
        const code_course = await req.params.code_course
        const onecourse = await db.query('SELECT * FROM course where code_course = $1', [code_course])
        res.json(onecourse.rows[0])
    }
    async updatecourse(req, res) {
        const {code_course, type_of_cousre} = req.body
        const updatecourse = await db.query('UPDATE course set type_of_cousre = $1 where code_course = $2 RETURNING *', [type_of_cousre, code_course])
        res.json(updatecourse.rows[0])
    }
    async deletecourse(req, res) {
        const code_course = await req.params.code_course
        const onecourse = await db.query('DELETE FROM course where code_course = $1', [code_course])
        res.json(onecourse.rows[0])
    }
}

module.exports = new CourseController()