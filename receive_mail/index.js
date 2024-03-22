// Importation du module node-imap et des informations d'identification depuis le fichier env.js
import Imap from "node-imap";
import { user, pass } from "../env.js";

// Configuration de l'IMAP
const IMAP_CONFIG = {
    user: user,
    password: pass,
    host: "imap.gmail.com",
    port: 993,
    tls: true
};

// Création d'une instance de connexion IMAP avec la configuration définie
const imap = new Imap(IMAP_CONFIG);

// Fonction pour ouvrir la boîte de réception
const openInbox = (callback) => {
    imap.openBox("INBOX", true, callback);
};

// Fonction utilitaire pour afficher des messages avec un délimiteur
const logMessage = (message) => {
    const delimiter = "#".repeat(message.length);
    console.log(`${delimiter}\n${message}\n${delimiter}\n`);
};

// Événement "ready" déclenché lorsque la connexion IMAP est prête
imap.once("ready", () => {
    // Affichage d'un message de confirmation de la connexion réussie
    logMessage("Connected to IMAP server");

    // Ouverture de la boîte de réception
    openInbox((err, box) => {
        if (err) {
            // Gestion des erreurs lors de l'ouverture de la boîte de réception
            console.error("Error opening INBOX:", err);
            imap.end(); // Fermeture de la connexion IMAP en cas d'erreur
            return;
        }
        // Affichage du nombre total de messages dans la boîte de réception
        console.log(`Total messages: ${box.messages.total}`);
    });
});

// Événement "error" déclenché en cas d'erreur lors de la connexion IMAP
imap.once("error", (err) => {
    console.error("IMAP connection error:", err);
});

// Événement "close" déclenché lorsque la connexion IMAP est fermée
imap.once("close", () => {
    console.log("IMAP connection closed");
});

// Établissement de la connexion IMAP
imap.connect();
