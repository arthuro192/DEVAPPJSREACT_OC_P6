
import {photographerTemplate} from "../templates/photographer.js";

    // FONCTION QUI RÉCUPÈRE TOUS LES OBJETS PHOTOGRAPHES & MEDIAS AINSI QUE TOUTES LEUR PROPRIÉTÉS.
    export async function getPhotographers() {
        // Récupération de tous les objets photographes & medias.
        let response = await fetch("../data/photographers.json");
        let photographers = await response.json();
        // Contient 2 objets_tableaux : photographers + media.
        // photographers = objet_tableau contenant tous les objets photographes.
        // media = objet_tableau contenant tous les objets medias de chacun des objets photographes.
        return photographers
    }

    // FONCTION QUI PERMET D'AFFICHER À L'ÉCRAN LES USERCARDDOM.
    // Elle récupère en paramètre les 2 objets_tableaux : photographers + media.
    async function displayData(photographers) {

        // Récupération de l'emplacement de l'affichage des userCardDOM.
        const photographersSection = document.querySelector(".photographers_cards") ;
        // Ici, la variable photographers ne contient plus qu'un seul objet_tableau (photographers) et je ne sais pas vraiment pourquoi.
        // Quoi qu'il en soit, on boucle sur chacun des objets photographe.
        photographers.forEach((photographer) => {
            // Je ne comprends pas bien ce que fait ce bout de code de manière individuelle.
            const photographerModel = photographerTemplate(photographer);
            // Chacune des balises <article> (et tout leur contenu) propre à chacun des photographes est créée.
            const userCardDOM = photographerModel.getUserCardDOM();

            // Puis, rattachée à son emplacement d'affichage. Spécificité :
            // ici, j'intercepte une erreur générée au chargement de la page photographer.html,
            // > photographersSection est NULL, ce qui est logique, pourtant,
            // je n'utilise pas du tout cette fonction [displayData(photographers)] dans [scripts/pages/photographer.js],
            // la seule fonction que j'importe dans photographer.js est la suivante : getPhotographers().
            // Je ne comprends donc pas la source réelle de ce problème (question à poser lors de la soutenance).
            try {photographersSection.appendChild(userCardDOM)} catch (error) {}
            // photographersSection.appendChild(userCardDOM);

        });
        
    }

    // FONCTION D'INITIALISATION QUI PERMET DE LANCER TOUTES LES AUTRES.
    async function init() {
        // Récupération de tous les objets photographe.
        const {photographers} = await getPhotographers();

        // Exécution de la fonction qui permet d'afficher à l'écran les userCardDOM.
        displayData(photographers);
    }

    init();




