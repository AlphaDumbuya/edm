
import { genkit, noopPlugin as importedNoopPlugin } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import type { Plugin } from 'genkit';

const activePlugins: (Plugin<any> | (() => Plugin<any>))[] = [];
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

  let resolvedPluginForNoop: Plugin<any>;

  // Check if the imported noopPlugin appears to be a valid plugin object.
  // A valid plugin should at least have a 'name' (string) and 'configure' (function) property.
  if (
    importedNoopPlugin &&
    typeof importedNoopPlugin.name === 'string' &&
    typeof importedNoopPlugin.configure === 'function'
  ) {
    resolvedPluginForNoop = importedNoopPlugin;
  } else {
    console.warn(
      "Imported `noopPlugin` from 'genkit' is undefined or not a valid plugin object. " +
      "Using a minimal fallback no-op plugin. This might affect Genkit's intended behavior if it relies on its specific noopPlugin."
    );
    // Define a minimal fallback no-op plugin that Genkit can initialize.
    resolvedPluginForNoop = {
      name: 'fallback-noop-plugin',
      configure: async () => {
        // This plugin does nothing, as intended for a no-op.
      },
    };
  }
  
  // Add the chosen plugin (either importedNoopPlugin or fallback) as a factory,
  // as per the guideline: "Add noop plugin as a factory that returns the plugin object."
  activePlugins.push(() => resolvedPluginForNoop);
}

export const ai = genkit({
  plugins: activePlugins as Plugin<any>[], // Cast as Plugin[] as Genkit internals will resolve factories
  model: configuredModel, // Set model conditionally
});
