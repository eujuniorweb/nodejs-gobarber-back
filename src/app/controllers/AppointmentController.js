const { User } = require('../models')

class AppointmentController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)
    return res.render('appointments/create', { provider })
  }
  async store (req, res) {
    const { filename } = req.file
    await User.create({ ...req.body, avatar: filename })
    return res.redirect('/')
  }
}
module.exports = new AppointmentController()
