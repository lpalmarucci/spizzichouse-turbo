import { z } from "zod";
import { MatchStatus } from "@workspace/api/qgl-types";
import { setMinutes } from "date-fns";

export const MATCH_FORM_INITIAL_VALUES = {
  title: "",
  description: null,
  duration: null,
  date: setMinutes(new Date(), 0),
  playerIds: [],
  status: MatchStatus.Upcoming,
};

export const matchSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string().max(255).nullable(),
  date: z.coerce.date(),
  duration: z.coerce.number().nullable(),
  playerIds: z.array(z.string()).min(1, "Select at least one player"),
  status: z.nativeEnum(MatchStatus).default(MatchStatus.Upcoming),
});

export type MatchSchemaType = z.infer<typeof matchSchema>;
