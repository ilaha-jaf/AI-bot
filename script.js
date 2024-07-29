import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));

  const chatHistory = []; 

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    if (userInput.toLowerCase() === 'exit') {
      console.log(colors.green('Bot: Goodbye!'));
      break;
    }

    try {
   
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      messages.push({ role: 'user', content: userInput });

      const response = await openai.post('/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      const completionText = response.data.choices[0].message.content;

      console.log(colors.green('Bot: ') + completionText);

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red('Error fetching response from OpenAI:'), error.response ? error.response.data : error.message);
    }
  }
}

main();
