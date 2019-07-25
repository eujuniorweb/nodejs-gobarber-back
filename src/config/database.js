module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  operatorAliases: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
