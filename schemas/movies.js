const z = require('zod')

//Esta es una forma de validar los datos
const movieSchema = z.object({
	title: z.string({
		invalid_type_error: 'Movie title must be a string', //Error que surge cuando se ingresa un tipo de dato que no sea string
		required_error: 'Movie title is required'//Aca le decimos que este campo si o si tiene que tener datos
	}),
	year: z.number().int().min(1900).max(2024), //Asi validamos que el año sea un numero entero entre 1900 y 2024
	director: z.string(),
	duration: z.number().int().positive(),
	rate: z.number().min(0).max(10).default(6),
	poster: z.string().url({
		message: 'Poster must be a valid URL'
	}),
	//Primero validamos que sea un arreglo luego si es un enum
	genre: z.array(
		z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
		{
			required_error: 'Movie genre is required',
			invalid_type_error: 'Movie genre must be an array of enum Genre'
		}
	)
})

function validateMovie(object){
	//safeParse me devuelve un objeto que indica si hay un errory si no, devuelve los datos, de esta forma validamos que
	//la pelicula este formateada correctamente
	return movieSchema.safeParse(object)
}

function valdatePartialMovie(object) {
	//Partial va a hacer que todas las propiedades del objeto movie sean opcionales
	//De forma que si no esta esa propiedad, no hace nada
	//Pero si esta, la valida
	return movieSchema.partial().safeParse(object)
}

module.exports = {
	validateMovie,
	valdatePartialMovie
}