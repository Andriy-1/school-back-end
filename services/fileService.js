import * as uuid from 'uuid';
import * as path from 'path';
import fs from 'fs';
import sharp from 'sharp';


export const saveFile = async (file, pathFile) => {
	try {
	  const fileName = uuid.v4() + '.webp';
	  const filePath = path.resolve(pathFile, fileName);
  
	  const inputImageBuffer = file.data;
	  const outputImageBuffer = await sharp(inputImageBuffer)
		.webp({ quality: 75 })
		.toBuffer(); 
	  await fs.promises.writeFile(filePath, outputImageBuffer); 
	  return fileName;
	} catch (error) {
	  console.log(error);
	  throw error;
	}
  };

export const deleteFile = (fileName, pathFile) => {
	const filePath = path.resolve(pathFile, fileName);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(err);
			return
		}
		console.log('File delete success');
	})
}

export const saveFilePost = async (file) => {
	try {
		const fileName = uuid.v4() + '.webp';
		const filePath = path.resolve('static/posts', fileName);
		const inputImageBuffer = file.data;
		const outputImageBuffer = await sharp(inputImageBuffer)
		  .webp({ quality: 35 })
		  .toBuffer(); 
		await fs.promises.writeFile(filePath, outputImageBuffer); 
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

export const saveFileDoc = async (file, pathFile) => {

	try {
		if (Array.isArray(file)) {
			const fileNames = [];
			for (let i = 0; i < file.length; i++) {
				const element = file[i];
				const fileName = uuid.v4() + '.pdf';
				const filePath = path.resolve(pathFile, fileName);
				await element.mv(filePath);
				fileNames.push(fileName);
			}
			return fileNames;
		} else {
			const fileName = uuid.v4() + '.pdf';
			const filePath = path.resolve(pathFile, fileName);
			await file.mv(filePath);
			return [fileName];
		}
	} catch (error) {
		console.log(error);
	}
}

export const deleteFileDoc = (fileName, pathFile) => {
	const filePath = path.resolve(pathFile, fileName);
	fs.unlink(filePath, (err) => {
		if (err) {
			console.log(err);
			return
		}
		console.log('File delete success');
	})
}