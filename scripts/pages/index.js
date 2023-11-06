import {photographerTemplate} from "../templates/photographer.js";

export async function getPhotographers() {

    let response = await fetch("../data/photographers.json");
    let photographers = await response.json();
    return photographers

}

async function displayData(photographers) {

    const photographersSection = document.querySelector(".photographers_cards") ;
    photographers.forEach((photographer) => {

        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        try {photographersSection.appendChild(userCardDOM)} catch (error) {}
        // photographersSection.appendChild(userCardDOM);

    });

}

async function init() {

    const {photographers} = await getPhotographers();
    displayData(photographers);

}

init();




