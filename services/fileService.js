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

export const saveFilePost = (file) => {
	try {
		const fileName = uuid.v4() + '.jpg';
		const filePath = path.resolve('static/posts', fileName);
		console.log(filePath);
		file.mv(filePath);
		return fileName;
	} catch (error) {
		console.log(error);

	}
}

export const deleteFilePost = (fileName) => {
	const filePath = path.resolve('static/posts', fileName);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(err);
			return
		}
		console.log('File delete success');
	})
}

export const saveFileDoc = (file,pathFile) => {
	try {
		const fileName = uuid.v4() + '.pdf';
		const filePath = path.resolve(pathFile, fileName);
		console.log(filePath);
		file.mv(filePath);
		return fileName;
	} catch (error) {
		console.log(error);

	}
}

export const deleteFileDoc = (fileName,pathFile) => {
	const filePath = path.resolve(pathFile, fileName);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(err);
			return
		}
		console.log('File delete success');
	})
}