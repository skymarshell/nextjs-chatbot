import axios from "axios";

const ChatAI = {
  Ask: async (question: string) => {
    try {
      const response = await axios.post("/api/chat", {
        question,
      });

      return response.data.content;
    } catch (error) {
      console.error("ChatAI Ask error:", error);
      return "Sorry, an error occurred while processing your request.";
    }
  },
};

export default ChatAI;
