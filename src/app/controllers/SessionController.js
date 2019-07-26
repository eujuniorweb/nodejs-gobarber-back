import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async create(req, res) {
    return res.render('auth/signin');
  }

  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'user not found' });
    }
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'password dos not match' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root');
      return res.redirect('/');
    });
  }
}
export default new SessionController();
