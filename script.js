// Initialize the OpenAI object with your API key
const openai = new OpenAI('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');

// Get the elements from the HTML document
const textForm = document.getElementById('text-form');
const textInput = document.getElementById('text-input');
const generateBtn = document.getElementById('generate-btn');
const textOutput = document.getElementById('text-output');
const backBtn = document.getElementById('back-btn');

// Add an event listener to the form submission
textForm.addEventListener('submit', async (event) => {
  // Prevent the default behavior of the form
  event.preventDefault(); 

  // Disable the generate button and show a loading message
  generateBtn.disabled = true;
  generateBtn.innerText = 'Generating...';

  // Get the user's input from the textarea
  const userInput = textInput.value;

  // Set the parameters for the OpenAI API request
  const params = {
    engine: 'davinci', // The name of the engine to use
    prompt: userInput, // The text to complete
    max_tokens: 100, // The maximum number of tokens to generate
    temperature: 0.5, // The randomness of the generation
    frequency_penalty: 0.5, // The penalty for repeating words or phrases
    presence_penalty: 0.5, // The penalty for mentioning new entities
    stop: ['\n'] // The token to stop the generation
  };

  try {
    // Call the OpenAI API with the parameters and get the response
    const response = await openai.complete(params);

    // Get the generated text from the response
    const generatedText = response.data.choices[0].text;

    // Set the value of the textarea to the generated text
    textOutput.value = generatedText;
  } catch (error) {
    // Handle any errors and show an alert message
    console.error(error);
    alert('Something went wrong. Please try again.');
  } finally {
    // Enable the generate button and restore the original text
    generateBtn.disabled = false;
    generateBtn.innerText = 'Generate';
  }
});

// Add an event listener to the back button
backBtn.addEventListener('click', (event) => {
  // Clear the input and output textareas
  textInput.value = '';
  textOutput.value = '';
});