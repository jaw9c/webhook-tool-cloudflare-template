import { z } from "zod"

export const EndGameInputSchema = z.object({
  phoneNumber: z.string(),
  gameId: z.string(),
  guessCount: z.number()
})

const EndGameOutputSchema = z.object({
    success: z.boolean()
})

type EndGameInput = z.infer<typeof EndGameInputSchema>
type EndGameOutput = z.infer<typeof EndGameOutputSchema>

const EndGameTool = async (input: EndGameInput): Promise<EndGameOutput> => {
  const { gameId, phoneNumber, guessCount } = input

  return { success: true }
}


export default EndGameTool