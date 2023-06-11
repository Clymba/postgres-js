const db = require('../db')

class GroupController {
    async creategroup(req, res) {
        const {code_group, fk_code_course, name_c} = req.body
        const newCat = await db.query('INSERT INTO group_users (code_group, fk_code_course, name_c) values ($1, $2, $3) RETURNING *', [code_group, fk_code_course, name_c])
        res.json(newCat.rows)
    }
    async getgroup(req, res) {
        const group = await db.query('SELECT * FROM group_users')
        res.json(group.rows)
    }
    async getOnegroup(req, res) {
        const code_group = await req.params.code_group
        const onegroup = await db.query('SELECT * FROM group_users where code_group = $1', [code_group])
        res.json(onegroup.rows[0])
    }
    async updategroup(req, res) {
        const {code_group, name_c} = req.body
        const updategroup = await db.query('UPDATE group_users set name_c = $1 where code_group = $2 RETURNING *', [name_c, code_group])
        res.json(updategroup.rows[0])
    }
    async deletegroup(req, res) {
        const code_group = await req.params.code_group
        const onegroup = await db.query('DELETE FROM group_users where code_group = $1', [code_group])
        res.json(onegroup.rows[0])
    }
}

module.exports = new GroupController()