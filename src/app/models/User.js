import Sequelize, { Model } from 'sequelize';

// const bcrypt = require('bcrypt');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;

// module.exports = (sequelize, Datatypes) => {
//   const User = sequelize.define(
//     'User',
//     {
//       name: Datatypes.STRING,
//       email: Datatypes.STRING,
//       avatar: Datatypes.STRING,
//       password: Datatypes.VIRTUAL,
//       password_hash: Datatypes.STRING,
//       provider: Datatypes.BOOLEAN,
//     },
//     {
//       hooks: {
//         beforeSave: async user => {
//           if (user.password) {
//             user.password_hash = await bcrypt.hash(user.password, 8);
//           }
//         },
//       },
//     }
//   );
//   User.prototype.checkPassword = function(password) {
//     return bcrypt.compare(password, this.password_hash);
//   };
//   return User;
// };
