import { z } from "zod";

const accountTypeSchema = z.object({
  id: z.string().uuid(),
});

export default accountTypeSchema;