
import { genkit, noopPlugin as importedNoopPlugin } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import type { Plugin, GenkitConfig } from 'genkit'; // Import GenkitConfig for better typing

const apiKeyPresent = !!(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
let configuredModel: string | undefined = undefined;

// Use the more specific type for plugins array based on GenkitConfig
const pluginsForGenkit: GenkitConfig['plugins'] = [];

if (apiKeyPresent) {
  pluginsForGenkit.push(googleAI()); // googleAI() returns a Plugin object
  configuredModel = 'googleai/gemini-2.0-flash'; // The model used by the app
} else {
  // Log a prominent warning to the server console.
  console.warn(
    "***********************************************************************************\n" +
    "CRITICAL WARNING: GEMINI_API_KEY or GOOGLE_API_KEY is not set in the environment.\n" +
    "Google AI functionalities (e.g., Scripture Generator) will be disabled or will not work.\n" +
    "Please set the API key in your .env file (e.g., GEMINI_API_KEY=your_api_key_here).\n" +
    "***********************************************************************************"
  );

  // Check if the imported noopPlugin appears to be a valid plugin object.
  if (
    importedNoopPlugin &&
    typeof importedNoopPlugin.name === 'string' &&
    typeof importedNoopPlugin.configure === 'function'
  ) {
    // Add importedNoopPlugin as a factory
    pluginsForGenkit.push(() => importedNoopPlugin);
  } else {
    console.warn(
      "Imported `noopPlugin` from 'genkit' is undefined or not a valid plugin object. " +
      "Using a minimal fallback no-op plugin. This might affect Genkit's intended behavior if it relies on its specific noopPlugin."
    );
    // Add the fallback plugin as a factory
    pluginsForGenkit.push(() => ({
      name: 'fallback-noop-plugin',
      configure: async () => {
        // This plugin does nothing, as intended for a no-op.
      },
    } as Plugin<any>)); // Cast to Plugin<any> to satisfy the factory return type
  }
}

export const ai = genkit({
  plugins: pluginsForGenkit, // Pass the correctly typed array
  model: configuredModel, // Set model conditionally
});
