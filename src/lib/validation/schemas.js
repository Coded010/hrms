import { z } from 'zod'

const gmail = z
  .string()
  .min(1, 'Email is required')
  .email("Please enter a valid email address")
  .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i, "Email must end with @gmail.com")

export const signInSchema = z.object({
  email: gmail,
  password: z
  .string()
  .min(1, 'Password is required'),
})

export const signUpSchema = z.object({
  firstName: z
  .string()
  .min(1, 'First name is required')
  .min(2, 'Too short, at least 2 characters'),

  lastName: z
  .string()
  .min(1, 'Last name is required')
  .min(2, 'Too short, at least 2 characters'),

  department: z
  .string()
  .min(1, 'Department is required'),

  role: z
  .string()
  .min(1, 'Role is required'),

  email: gmail,

  password: z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters'),
})

//-----------------------------------------------------------------------------------
// Zod cheat-sheet (common validations)
// const schema = z.object({

//   // STRING
//   string: z.string(),                             // any string
//   nonEmpty: z.string().min(1, "Required"),       // cannot be empty
//   minMax: z.string().min(3, "Min 3 chars").max(20, "Max 20 chars"),  
//   email: z.string().email("Invalid email address"),
//   password: z.string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[A-Z]/, "Must contain uppercase")
//     .regex(/[a-z]/, "Must contain lowercase")
//     .regex(/[0-9]/, "Must contain a number"),

//   // REGEX examples
//   username: z.string()
//     .min(3, "Username must be at least 3 characters")
//     .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores"),
//   gmailOnly: z.string()
//     .email("Invalid email address")
//     .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/i),
//   phone: z.string()
//     .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

//   // NUMBER
//   number: z.number(),
//   int: z.number().int(),
//   positive: z.number().positive(),

//   // BOOLEAN
//   boolean: z.boolean(),

//   // ARRAY
//   array: z.array(z.string()),
//   nonEmptyArray: z.array(z.string()).min(1, "At least one item required"),

//   // ENUM
//   role: z.enum(["ADMIN", "USER", "GUEST"]),

//   // OPTIONAL / NULLABLE / NULLISH / DEFAULT
//   optional: z.string().optional(),               // field may be missing
//   nullable: z.string().nullable(),               // value can be null
//   nullish: z.string().nullish(),                 // value can be null or undefined
//   defaultValue: z.string().default("default"),  // provides a default if undefined
// }).strict(); // prevents unknown keys