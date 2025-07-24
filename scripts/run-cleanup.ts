import { cleanupOldContent } from "@/lib/cleanup/auto-cleanup";

async function runCleanup() {
  try {
    console.log("Starting automated cleanup...");
    const result = await cleanupOldContent();
    console.log("Cleanup completed successfully:", result);
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
}

runCleanup();
