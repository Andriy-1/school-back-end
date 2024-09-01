import { body } from 'express-validator';

export const loginValidation = [
	body('email', 'Невірній формат пошти').isEmail(),
	body('password', 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 }),
];

export const registerValidation = [
	body("email", 'Невірній формат пошти').isEmail(),
	body("password", 'Пароль повинен бути мінімум 5 символів').isLength({ min: 5 }),
	body("fullName", 'Укажіть імя').isLength({ min: 3 }),
	body("avatarUrl", 'Нівірна ссилка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
	body('title', 'Введіть заголовок статті').isLength({ min: 3 }).isString(),
	body('text', 'Введіть текст статті').isLength({ min: 3 }).isString(),
	body('imageUrl', 'Невірна ссилка на зображення').optional().isString(),
];
export const userCreateValidation = [
	body('fullName', 'Введіть ПІБ').isLength({ min: 3 }).isString(),
	body('position', 'Введіть посаду').isLength({ min: 3 }).isString(),
];

export const postCategoriesCreateValidation = [
	body('title', 'Введіть мінімум 3 символи').isLength({ min: 3 }).isString(),
];
