export const nameExtract = (text) => {
    const extractedName = text.split('@')[0].toUpperCase();
    return extractedName;
};