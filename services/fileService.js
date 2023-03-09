import * as uuid from 'uuid';
import * as path from 'path';


export const saveFile = (file) => {
	try {
		const fileName = uuid.v4() + '.jpg';
		const filePath = path.resolve('static/users', fileName);
		file.mv(filePath);
		return fileName;
	} catch (error) {
		console.log(error);

	}

}