const db = require('../db')

class UserController {
    async createUser(req, res) {
        const {code_user, fk_code_category, e_mail, gender, name_ , famille, patronymique, biography} = req.body
        const newUser = await db.query('INSERT INTO user_ (code_user, fk_code_category, e_mail, gender, name_ , famille, patronymique, biography) values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [code_user, fk_code_category, e_mail, gender, name_ , famille, patronymique, biography])
        res.json(newUser.rows[0])
    }
    async getUser(req, res) {
        const getUser = await db.query('SELECT * FROM user_')
        res.json(getUser.rows)
    }

    async getOneUser(req, res) {
        const code_user = req.params.code_user
        const oneUser = await db.query('SELECT * FROM user_ where code_user = $1', [code_user])
        res.json(oneUser.rows[0])
    }

    async updateUser(req, res) {
        const {code_user, name_} = req.body
        const updateUser = await db.query('UPDATE user_ set name_ = $1 where code_user = $2 RETURNING *', [name_, code_user])
        res.json(updateUser.rows[0])
    }

    async deleteUser(req, res) {
        const code_user = req.params.code_user
        const delUser = await db.query('DELETE FROM user_ where code_user = $1', [code_user])
        res.json(delUser.rows[0])
    }
}

module.exports = new UserController()