import { z } from "zod";

export const roundsSchema = z.object({
  number: z.number(),
  score: z.number(),
});
