
create TABLE auth(
	_id SERIAL PRIMARY KEY,
	fullName VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	passwordHash VARCHAR(255) NOT NULL
);


create TABLE users(
	_id SERIAL PRIMARY KEY,
	fullName VARCHAR(255) NOT NULL,
	position VARCHAR(255) NOT NULL,
	"description" VARCHAR(255),
	imageUrl VARCHAR(255)
);

create TABLE post(
	_id SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	"text" VARCHAR(255),
	viewsCount INTEGER DEFAULT 0,
	likeCount INTEGER DEFAULT 0,
	imageUrl VARCHAR(255),
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users (_id)
);