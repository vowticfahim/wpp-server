import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
    stockQuantity: z.number({
      required_error: "Stock quantity is required",
      invalid_type_error: "Stock quantity must be a number",
    }),
    category: z.string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    }),
    productImages: z.array(
      z.string({
        required_error: "Product Image is required",
        invalid_type_error: "Product Image must be a string url",
      })
    ),
    isDeleted: z.boolean().optional().default(false),
  }),
});
const updateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .optional(),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .optional(),
    price: z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .optional(),
    stockQuantity: z
      .number({
        required_error: "Stock quantity is required",
        invalid_type_error: "Stock quantity must be a number",
      })
      .optional(),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .optional(),
    productImages: z
      .array(
        z.string({
          invalid_type_error: "Product Image must be a string url",
        })
      )
      .optional(),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
