import { z } from "zod"
import { AirtablePortraitFieldsSchema } from "../types"
import { env } from "hono/adapter"

export const StartGameInputSchema = z.object({
  phoneNumber: z.string(),
})

export const AirtableResponseSchema = z.object({
  records: z.array(AirtablePortraitFieldsSchema)
})  

const StartGameOutputSchema = z.object({
    gameId: z.string(),
    portrait: AirtablePortraitFieldsSchema
  })

type StartGameInput = z.infer<typeof StartGameInputSchema>
type StartGameOutput = z.infer<typeof StartGameOutputSchema>

const StartGameTool = async (input: StartGameInput, c: any) => {
  const { phoneNumber } = input

  const airtableApiBase = `https://api.airtable.com/v0/${env(c).AIRTABLE_TABLE_ID}`
  const response = await fetch(`${airtableApiBase}/Portraits?filterByFormula=NOT({Active})`, {
    headers: {
      'Authorization': `Bearer ${env(c).AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json'
    }
  })
  
  const data = await response.json()
  const randomIndex = Math.floor(Math.random() * data.records.length)

  const portrait = data.records[randomIndex].fields
  const gameId = crypto.randomUUID().slice(0, 8)

  portrait.Gender = portrait["Is Man?"] === "Man" ? "Male" : "Female"

  const result = StartGameOutputSchema.parse({ gameId, portrait })

  return result
}


export default StartGameTool