import { config } from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

config();

const chatModel = new ChatOpenAI({});
const outputParser = new StringOutputParser();

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, provide a befitting feedback",
  ],
]);

const chatHistory = [
  new HumanMessage("Can you write a drama with plot and characters?"),
  new AIMessage("Yes!"),
];

const chain = historyAwarePrompt.pipe(chatModel).pipe(outputParser);

const result = await chain.invoke({
  chat_history: chatHistory,
  input: "Convince me with a sample",
});

console.log(result);
