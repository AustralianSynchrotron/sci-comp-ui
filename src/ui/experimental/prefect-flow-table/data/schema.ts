import { z } from "zod"

export const flowSchema = z.object({
  flowRunId: z.string(),
  flowName: z.string(),
  state: z.string(),
  scheduledStartTime: z.string(),
  queueName: z.string(),
})

export type Flow = z.infer<typeof flowSchema>
