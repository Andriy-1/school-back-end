import Pool from "pg-pool";

const pool = new Pool({
	user: 'andriy',
	password: '1223',
	host: process.env.HOST,
	port: 5432,
	database: 'school-base'
})

pool.connect(error => {
	if (error) {
		console.log(error.message);
		process.exit(1);
	}
});
console.log('DB OK');

export default pool;