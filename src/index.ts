import { Hono } from 'hono'
import { z } from 'zod'
import StartGameTool, { StartGameInputSchema } from './tools/StartGame'
import EndGameTool, { EndGameInputSchema } from './tools/EndGame'
import { env } from 'hono/adapter'

// Environment bindings
interface Env {
  AIRTABLE_TABLE_ID: string
  AIRTABLE_TOKEN: string
  API_SECRET: string
}

const app = new Hono<{ Bindings: Env }>()

// Validation middleware helper
async function validateRequestBody<T>(
  c: any,
  schema: z.ZodSchema<T>
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    const body = await c.req.json()
    const validatedData = schema.parse(body)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ')
      return { success: false, error: errorMessage }
    }
    return { success: false, error: 'Invalid request body format' }
  }
}

// Start game endpoint
app.post('/start-game', async (c) => {
  try {
    const apiSecret = c.req.header('X-API-SECRET')
    if (apiSecret !== env(c).API_SECRET) {
      return c.json({ error: 'Invalid API secret' }, 401)
    }

    const validation = await validateRequestBody(c, StartGameInputSchema)
    if (!validation.success) {
      return c.json({ error: validation.error }, 400)
    }

    const result = await StartGameTool(validation.data, c)
    return c.json(result)

  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to start game' }, 500)
  }
})

// Finish game endpoint
app.post('/finish-game', async (c) => {
  try {
    const apiSecret = c.req.header('X-API-SECRET')
    if (apiSecret !== env(c).API_SECRET) {
      return c.json({ error: 'Invalid API secret' }, 401)
    }

    const validation = await validateRequestBody(c, EndGameInputSchema)
    if (!validation.success) {
      return c.json({ error: validation.error }, 400)
    }

    const response = await EndGameTool(validation.data)
    return c.json(response)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to finish game' }, 500)
  }
})

export default app
