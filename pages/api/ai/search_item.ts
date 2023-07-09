import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'
export const runtime = 'edge'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export default async function handler(req: Request) {
  const { name, sections } = await req.json()
  const content = `dans quel rayon de supermarché, parmi cette liste :\n${sections} \n je trouve ${name} ? (retourne uniquement le nom du rayon)`

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{ role: 'user', content }],
  })
  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
