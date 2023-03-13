import Pool from "pg-pool";

const pool = new Pool({
	user: "andriy",
	password: '12233221',
	host: 'localhost',
	port: 5432,
	database: "school-db"
})

export default pool;