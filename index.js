import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

config();

const chatModel = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a world class documentation assistant only. Do not answer any other questions asides on documentation",
  ],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel).pipe(outputParser);

const result = await chain.invoke({
  input: "Hello",
});

console.log(result);
