import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro"; // The model name to use for generating responses
const API_KEY = "AIzaSyCSYFC1S6Dt_o4DaD2_auVlbyiTqRVHiN4"; // Replace with your actual API key

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY); // Initialize the API with your key
  const model = genAI.getGenerativeModel({ model: MODEL_NAME }); // Retrieve the specific model

  // Configuration for generating responses
  const generationConfig = {
    temperature: 0.9, // Controls randomness (higher is more random)
    topK: 1, // Limits sampling to top K options (1 means deterministic)
    topP: 1, // Nucleus sampling (1 means no nucleus sampling)
    maxOutputTokens: 2048, // Maximum number of tokens in the response
  };

  // Safety settings to filter harmful content
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Start a chat session with the model
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [], // You can pass previous messages here if needed
  });

  // Send the prompt and get the response
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text()); // Log the response for debugging
  return response.text(); // Return the response text
}

export const testFunction = () => "This is a test";

export default runChat;
