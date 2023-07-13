import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
export const runtime = 'edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export default async function handler(req: Request) {
  const { names, sections } = await req.json()
  if (!names || !sections) return new Error('Missing names or sections')
  const content = `renvoi moi cette liste:\n${names}\n\navec en face le rayon de supermarché correspondant parmi cette liste:\n\n${sections}`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content }],
  })
  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
