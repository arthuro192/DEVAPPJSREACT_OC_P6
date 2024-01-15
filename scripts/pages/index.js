
import {photographerTemplate} from "../templates/photographer.js";

export async function get_users_medias() {

    let response = await fetch("../data/photographers.json");
    let users_medias = await response.json();
    return users_medias

}

function display_users(photographers) {

    let photographersSection = document.querySelector(".photographers_cards") ;
    photographers.forEach((photographer) => {

        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        if (photographersSection != null) {

            photographersSection.appendChild(userCardDOM)

        }

    });

}

async function init() {

    let {photographers} = await get_users_medias();
    display_users(photographers);

}

init();