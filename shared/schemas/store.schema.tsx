import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(1),
});
export type StoreSchemaType = z.infer<typeof storeSchema>;
