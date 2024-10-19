import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  //phoneNumber: z.string().regex(/^\d{11,15}$/, "Phone number must be between 11 to 15 digits"),
  phoneNumber: z.string(),
  fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  userRole: z.string(),
  accountType: z.string(),
});

export default userSchema;