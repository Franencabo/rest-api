const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required",
  }),
  year: z.number().int().min(1888).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum(["Action", "Comedy", "Drama", "Horror", "Thriller", "Crime"]),
    {
      required_error: "Genre is required",
      invalid_type_error: "Genre must be an array of strings",
    }
  ),
});

function validateMovie(object) {
  return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
    // partial() permite que el objeto no tenga todas las propiedades
    // y las hace opcionales
  return movieSchema.partial().safeParse(object);
}

module.exports = {
  validateMovie,
  validatePartialMovie
};
