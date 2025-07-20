export function logError(context: string, error: any, additionalInfo: any = {}) {
    console.error(`[${context}] Error:`, {
        message: error.message,
        stack: error.stack,
        code: error.code,
        ...additionalInfo,
    });
}
