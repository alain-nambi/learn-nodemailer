// Fonction utilitaire pour afficher des messages avec un délimiteur
export const logMessage = (icon, message) => {
    const delimiter = `${icon}`.repeat(message.length);
    console.log(`${delimiter}\n${message}\n${delimiter}`);
};