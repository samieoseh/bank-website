import { z } from "zod";
import roleSchema from "./role-schema";
import accountTypeSchema from "./account-type-schema";

const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username must not exceed 30 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  //phoneNumber: z.string().regex(/^\d{11,15}$/, "Phone number must be between 11 to 15 digits"),
    phoneNumber: z.string(),
    fullName: z.string().min(1, "Full name is required"),
  address: z.string().min(1, "Address is required"),
  accountNumber: z.string().regex(/^\d{9,20}$/, "Account number must be between 9 to 20 digits"),
  balance: z.number().min(0, "Balance cannot be negative"),
  active: z.boolean(),
  lastLoginAt: z.number().int().optional().nullable(),
  createdAt: z.number().int(),
  profilePictureUrl: z.string().url("Invalid URL").optional().nullable(),
  emailVerified: z.boolean(),
  phoneNumberVerified: z.boolean(),
  twoFactorAuthEnabled: z.boolean(),
  failedLoginAttempts: z.number().int().min(0, "Cannot have negative login attempts"),
  accountLockedUntil: z.number().int().optional().nullable(),
  currencyPreference: z.enum(['NGN', 'USD', 'EUR', 'GBP']),
  transactionPin: z.string().length(4, "Transaction PIN must be exactly 4 characters"),
  userRole: roleSchema,
  accountType: accountTypeSchema,
});

export default userSchema;