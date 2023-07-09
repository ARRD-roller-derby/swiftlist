import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
export const runtime = 'edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export default async function handler(req: Request) {
  const { name } = await req.json()
  const content = `Dans cette phrase, '${name}' est-il correctement orthographié? Si non, veuillez le corriger.`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content }],
    temperature: 0.5,
  })
  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
