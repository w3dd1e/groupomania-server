const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

//Database connection - requires .env file in root folder with appropriate values
const sequelize = new Sequelize(
	process.env.PGDATABASE,
	process.env.PGUSER,
	process.env.PGPASSWORD,
	{
		dialect: 'postgres',
		host: process.env.PGHOST,
		port: process.env.PGPORT,
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log(' Database connection has been established successfully.');
	})
	.catch((error) => {
		console.error('Unable to connect to the database: ', error);
	});

module.exports = sequelize;
