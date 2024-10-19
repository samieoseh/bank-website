import { z } from "zod";

const roleSchema = z.object({
  id: z.string().uuid(),
});

export default roleSchema;

