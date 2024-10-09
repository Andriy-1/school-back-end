import swaggerJsDoc from 'swagger-jsdoc';
// Swagger definition
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Копачинці API Документація',
			version: '1.0.0',
			description: 'API Документація',
		},
		servers: [
			{
				url: 'http://localhost:5000/api', // Змініть на ваш базовий URL
				description: 'Local server'
			},
			// {
			// 	url: 'https://api.kopachyntsi.if.ua/api', // Продукційний сервер
			// 	description: 'Production server'
			// }
		],
	},
	apis: ['./routes/*.js'], // Вказуємо конкретні файли
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);