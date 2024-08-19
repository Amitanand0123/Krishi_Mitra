import React, { useRef, useState } from 'react';
import axios from 'axios';

const MAX_RETRIES = 5;

const Chatbot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hello! How can I assist you today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const previousMessagesRef = useRef([]);

  // Function to call OpenAI API with retry logic
  const callOpenAIAPI = async (newMessages, retryCount = 0) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", // OpenAI API endpoint
        {
          model: "gpt-4o-mini", // Adjust this to the specific model you want to use
          messages: newMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`, // Use environment variable for security
          },
        }
      );

      // Extract the chatbot response from OpenAI's response structure
      return response.data.choices[0].message.content;
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < MAX_RETRIES) {
        const retryAfter = error.response.headers['retry-after']
          ? parseInt(error.response.headers['retry-after']) * 1000
          : 2 ** retryCount * 1000; // Exponential backoff
        console.warn(`Retrying after ${retryAfter / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter));
        return callOpenAIAPI(newMessages, retryCount + 1); // Retry with incremented count
      } else {
        console.error("Error calling OpenAI API", error.response ? error.response.data : error.message);
        return "An error occurred. Please try again later."; // Handle generic errors
      }
    }
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true); // Show the loading indicator

    try {
      const botResponse = await callOpenAIAPI(newMessages);
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
      previousMessagesRef.current = newMessages; // Store previous messages for potential future use
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setLoading(false); // Hide the loading indicator
    }
  };

  // Handle input key press (Enter to send)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-72 md:w-96 bg-white rounded-lg shadow-lg flex flex-col">
      <div className="flex flex-col flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 self-start"}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="p-3 bg-gray-200 rounded-lg self-start">Thinking...</div>}
      </div>

      <div className="flex items-center border-t border-gray-200 p-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleSendMessage}
          className="ml-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
