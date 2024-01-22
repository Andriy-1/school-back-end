import Pool from "pg-pool";

const pool = new Pool({
	user: "andriy",
	password: '1223',
	// host: '192.168.88.208',
	host: '127.0.0.1',
	port: 5432,
	database: "school-base"
})

pool.connect(error => {
	if (error) {
		console.log(error.message);
		process.exit(1);
	}
});
console.log('DB OK');

export default pool;