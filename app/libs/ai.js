import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import z from 'zod'
import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from '@langchain/core/documents'
import { loadQARefineChain } from 'langchain/chains'
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale of -10 to 10, where -10 is extremely negative, 0 is neutral and 10 is extremely positive.'
      ),
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?)'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color that represents the mood of the journal entry. For example #A9A9A9 is grey which represents dullness.'
      ),
  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })
  return input
}

export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0,
    model: 'gemini-1.5-flash-8b',
  })
  const result = (await model.invoke(input)).content

  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}

export const qa = async (question, entries) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: { id: entry._id, createdAt: entry.createdAt },
    })
  })

  const model = new ChatGoogleGenerativeAI({
    temperature: 0,
    model: 'gemini-1.5-pro',
  })

  const chain = loadQARefineChain(model)
  const embeddings = new GoogleGenerativeAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })
  console.log(res)

  return res.output_text
}
