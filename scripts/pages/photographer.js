
import {get_users_medias} from "./index.js";
import * as template from "../templates/photographer.js";
import {lightbox} from "../utils/lightbox.js";

let {photographers} = await get_users_medias();
let {medias} = await get_users_medias();

let url_params = new URL(document.location).searchParams;
let url_id = parseInt(url_params.get("id"));

let headerPhotograph = document.querySelector("header");
headerPhotograph.setAttribute("aria-hidden", "false");
let mainPhotograph = document.querySelector("main");
mainPhotograph.setAttribute("aria-hidden", "false");
let sectionPhotograph = document.createElement('section');
sectionPhotograph.classList.add("medias_photographer");

mainPhotograph.appendChild(sectionPhotograph)

// PHOTOGRAPHER_FORM ##############################################################

let div_filter = document.querySelector(".medias_filters");
let form = document.createElement('form');
form.setAttribute("method", "get");
form.setAttribute("action", "");

form.innerHTML = `
<label for="sort_by">Trier par</label>
<select name="sort_by" id="sort_by" class="btn_red">
    <option class="opt_pop">Popularité</option>
    <option class="opt_dat">Date</option>
    <option class="opt_tit">Titre</option>
</select>
`

div_filter.appendChild(form)

// PHOTOGRAPHER_INFO ##############################################################

photographers.forEach((photographer) => {

    if (photographer.id == url_id) {

        let photographerModel = template.photographerTemplate(photographer);
        photographerModel.getUserPageDOM();

    }

});

// PHOTOGRAPHER_MEDIA_ARRAY #######################################################

let id_medias = [];
medias.forEach((media_unit) => {

    if (media_unit.photographerId == url_id) {

        id_medias.push(media_unit)

    }

});

// PHOTOGRAPHER_MEDIA_DISPLAY #####################################################

function display_media(medias) {

    medias.forEach((media) => {

        let mediaModel = template.mediaTemplate(media);
        let mediaCardDOM = mediaModel.getMediaCardDOM();
        sectionPhotograph.appendChild(mediaCardDOM);

    });

}

display_media(id_medias)

// MEDIAS_SORT ###################################################################

function sort_id_medias() {

    let sort_medias = Array.from(id_medias);
    sort_medias.sort(function (a, b) {

        // INVERSER LES VALEURS A & B POUR UN TRI CROISSANT.
        if (event.target.value == "Popularité") {
            return b.likes - a.likes;
        } else if (event.target.value == "Date") {
            return (b.date > a.date)?1:-1;
        } else if (event.target.value == "Titre") {
            return (b.title < a.title)?1:-1;
        }

    });

    sectionPhotograph.innerHTML = "";
    display_media(sort_medias);
    lightbox.init(mainPhotograph, headerPhotograph);
    media_likes();

}

let sort_by = document.getElementById("sort_by");
["keydown", "click"].forEach((event_type) => {

    sort_by.addEventListener(event_type, (e) => {

        if ((event_type === "click") || (e.key === "Enter")) {

            sort_id_medias();

        }

    });

});

// LIGHTBOX #######################################################################

lightbox.init(mainPhotograph, headerPhotograph);

// MEDIA_LIKES ####################################################################

function media_likes() {

    let icos_likes = document.querySelectorAll("article p i")
    icos_likes.forEach((ico_likes) => {

        ["keydown", "click"].forEach((event_type) => {

            let span_media_likes = ico_likes.previousElementSibling;
            let media_likes_origin = Number(span_media_likes.textContent)
            ico_likes.addEventListener((event_type), (e) => {

                let media_likes_new = Number(span_media_likes.textContent)

                if ((media_likes_origin == media_likes_new) && 
                    ((event_type === "click") ||
                    (e.key === "Enter"))) {

                        media_likes_new++
                        span_media_likes.innerText = media_likes_new

                    } else if ((media_likes_origin == (media_likes_new - 1)) && 
                        ((event_type === "click") ||
                        (e.key === "Enter"))) {

                        media_likes_new--
                        span_media_likes.innerText = media_likes_new

                    }

                id_medias.forEach((id_media) => {

                    if (span_media_likes.previousSibling.textContent.includes(id_media.title)) {

                        id_media.likes = media_likes_new

                    }
                
                })

                total_likes()

            })

        })

    })

}

media_likes()

// TOTAL_LIKES ####################################################################

function total_likes() {

    let photographer_likes = document.querySelector(".photographer_likes")
    let span_medias_likes = document.querySelectorAll("article p span")
    let total_likes = 0;

    span_medias_likes.forEach((span_media_likes) => {

        total_likes += Number(span_media_likes.textContent)

    })

    photographer_likes.innerHTML = `${total_likes} <i class="fa-solid fa-heart" aria-label="heart_icon" role="img"></i>`

}

total_likes()

// ?????_????? ########################################################################################################################################################

// TESTS_OK #####################################################################

// TESTS_KO #####################################################################

// CONCLUSION ###################################################################