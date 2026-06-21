import { z } from "zod";

export const productSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  moq: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  status: z.string().optional().or(z.literal("")),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional().or(z.literal("")),
  annualVolume: z.string().optional().or(z.literal("")),
  mainMarkets: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export const inquirySchema = z.object({
  senderName: z.string().min(1, "Name is required"),
  senderEmail: z.string().email("Invalid email address"),
  company: z.string().optional().or(z.literal("")),
  message: z.string().min(1, "Message is required"),
  status: z.string().optional().or(z.literal("")),
});
