export const cleanJsonResponse = (text: string): string => {
    // Remove markdown code fences and any leading/trailing whitespace
    return (
        text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/^\s+|\s+$/g, "")
            // Remove any other unexpected characters (optional, customize as needed)
            .replace(/[\r\n]+/g, "")
    );
};