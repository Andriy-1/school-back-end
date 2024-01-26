import Pool from "pg-pool";

const pool = new Pool({
	user: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	host: process.env.HOST,
	port: 5432,
	database: process.env.POSTGRES_DATABASE
})

pool.connect(error => {
	if (error) {
		console.log(error.message);
		process.exit(1);
	}
});
console.log('DB OK');

export default pool;