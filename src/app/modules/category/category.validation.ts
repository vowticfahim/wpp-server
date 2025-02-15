import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
   
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const updateCategoryValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }).optional(),
   
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }).optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});



export const categoryValidation = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
