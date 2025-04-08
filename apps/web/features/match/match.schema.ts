import { z } from "zod";
import { MatchStatus } from "@workspace/db";

export const MATCH_FORM_INITIAL_VALUES = {
  title: "",
  description: null,
  duration: null,
  date: new Date(),
  playerIds: [],
  status: MatchStatus.UPCOMING,
};

const values = Object.values(MatchStatus);

export const matchSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().max(255).nullable(),
  date: z.coerce.date(),
  duration: z.coerce.number().nullable(),
  playerIds: z.array(z.string()).min(1),
  status: z.enum([
    MatchStatus.UPCOMING,
    MatchStatus.IN_PROGRESS,
    MatchStatus.COMPLETED,
  ]),
});

export type MatchSchemaType = z.infer<typeof matchSchema>;
