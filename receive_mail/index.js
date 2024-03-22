// Importation du module node-imap et des informations d'identification depuis le fichier env.js
import Imap from "node-imap";
import { user, pass } from "../env.js";
import { logMessage } from "../utilities/comment.js";
import { simpleParser } from "mailparser";

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

// Événement "ready" déclenché lorsque la connexion IMAP est prête
imap.once("ready", () => {
    // Affichage d'un message de confirmation de la connexion réussie
    logMessage("-", "IMAP server is ready");

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

        // Recherche les e-mails non lus sur le serveur IMAP
        imap.search(["UNSEEN"], (err, results) => {
            // Vérifie s'il y a eu une erreur lors de la recherche des nouveaux e-mails
            if (err) {
                // Affiche un message d'erreur dans la console
                console.error("Erreur lors de la recherche de nouveaux e-mails.");
                // Sort de la fonction car il y a eu une erreur
                return;
            }

            // Vérifie s'il y a des résultats de recherche ou si le tableau de résultats est vide
            if (!results || !results.length) {
                // Si aucun résultat n'est trouvé, affiche un message indiquant que le programme attend de nouveaux e-mails
                console.log("En attente de nouveaux e-mails...");
                // Quitte la fonction car il n'y a pas de nouveaux e-mails à traiter
                return;
            }

            // Si des résultats de recherche sont disponibles, récupère les détails des e-mails en utilisant la fonction fetch d'IMAP
            // Passe les résultats de la recherche et spécifie les options pour récupérer uniquement la structure de base des e-mails
            const f = imap.fetch(results, { bodies: '', struct: true });

            // Écoute l'événement "message" déclenché lorsqu'un nouvel e-mail est récupéré
            f.on("message", (message, seqno) => {
                // Appelle la fonction logMessage pour afficher un message indiquant qu'un nouvel e-mail a été reçu
                // console.log(`Nouveau message #${seqno}`);

                message.on("body", (stream, info) => {
                    // console.log(stream);

                    simpleParser(stream, (err, parsed) => {
                        // console.log(err);
                        if (err) {
                            console.log(`Erreur de parsage du mail : ${err}`)
                            return;
                        }

                        const { headers, subject, from, to, cc, date, messageId, html, text, textAsHtml, attachments } = parsed

                        console.log(subject);
                    })

                    // console.log(info);
                })

            });

            // Écoute l'événement "error" déclenché en cas d'erreur lors de la récupération des e-mails
            f.once("error", (err) => {
                // Appelle la fonction logMessage pour afficher un message d'erreur indiquant le problème de récupération des e-mails
                console.log(`Erreur lors de la récupération des e-mails : ${err}`);
            });

            // Écoute l'événement "end" déclenché lorsque tous les nouveaux e-mails ont été récupérés
            f.once("end", () => {
                // Affiche un message indiquant que la récupération de tous les nouveaux e-mails est terminée
                console.log("Tous les nouveaux e-mails ont été récupérés !");
            });
        });

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
