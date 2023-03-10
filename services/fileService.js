import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';


export const saveFile = (file) => {
	try {
		const fileName = uuid.v4() + '.jpg';
		const filePath = path.resolve('static/users', fileName);
		console.log(filePath);
		file.mv(filePath);
		return fileName;
	} catch (error) {
		console.log(error);

	}
}

export const deleteFile = (fileName) => {
	const filePath = path.resolve('static/users', fileName);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(err);
			return
		}
		console.log('File delete success');
	})
}