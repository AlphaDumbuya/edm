
import {genkit, noop as noopPlugin} from 'genkit'; // Import and alias noop
import {googleAI} from '@genkit-ai/googleai';
import type {Plugin} from 'genkit'; // For type safety

const activePlugins: Plugin<any>[] = [];
let configuredModel: string | undefined = undefined;

// Check for API key presence
const apiKeyPresent = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);

if (apiKeyPresent) {
  activePlugins.push(googleAI());
  configuredModel = 'googleai/gemini-2.0-flash'; // The model used by the app
} else {
  // Log a prominent warning to the server console. This will be visible during development.
  console.warn(
    "***********************************************************************************\n" +
    "CRITICAL WARNING: GEMINI_API_KEY or GOOGLE_API_KEY is not set in the environment.\n" +
    "Google AI functionalities (e.g., Scripture Generator) will be disabled or will not work.\n" +
    "Please set the API key in your .env file (e.g., GEMINI_API_KEY=your_api_key_here).\n" +
    "***********************************************************************************"
  );
  // Add noop plugin so Genkit can initialize and define flows without crashing.
  // Actual AI calls relying on Google AI will fail (e.g., model not found) or do nothing.
  activePlugins.push(noopPlugin); // Use the aliased noopPlugin directly as it's an instance
  // configuredModel remains undefined. Prompts/generate calls will need to specify models,
  // or they will fail if they expect a default Google AI model that isn't available.
}

export const ai = genkit({
  plugins: activePlugins,
  model: configuredModel, // Set model conditionally
});

