import {getPhotographers} from "./index.js";
import {mediaTemplate, photographerTemplate} from "../templates/photographer.js";

let {photographers} = await getPhotographers();
let {media} = await getPhotographers();

let url_params = new URL(document.location).searchParams;
let url_id = parseInt(url_params.get("id"));

let mainPhotograph = document.querySelector("main");
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

        let photographerModel = photographerTemplate(photographer);
        let userPageDOM = photographerModel.getUserPageDOM();

    }

});

// PHOTOGRAPHER_MEDIA_ARRAY #######################################################

let id_medias = [];

media.forEach((media_unit) => {

    if (media_unit.photographerId == url_id) {

        id_medias.push(media_unit)

    }

});

// PHOTOGRAPHER_MEDIA_DISPLAY #####################################################

function display_media(medias) {

    medias.forEach((media) => {

        let mediaModel = mediaTemplate(media);
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
    lightbox();
    media_likes();

}

let sort_by = document.getElementById("sort_by");
["keydown", "click"].forEach((event_type) => {

    sort_by.addEventListener((event_type), (e) => {

        if ((event_type === "keydown" && e.key === "Enter") || (event_type === "click")) {
            sort_id_medias()
        }

    });

})

// LIGHTBOX #######################################################################

let medias_light = Array.from(document.querySelectorAll("a[aria-label='Close up view'] *"));
let medias_nodes = medias_light.map(media_light => media_light.outerHTML);
let lightbox = {

    init: function() {

        medias_light.forEach((media) => {

            media.addEventListener("click", (e) => {

                e.preventDefault();
                let media_node = e.target.outerHTML;
                let title = e.target.title;
                let current_light = this.dom_html(media_node, title);
                document.body.appendChild(current_light);

            });

        });

    },

    dom_html: function(media_node, title) {

        let div_light = document.createElement("div");
        div_light.classList.add("lightbox");
        div_light.innerHTML = `
        <button class="btn_prev">
            <p>Précédent</p>
        </button>
        <div class="light_media">
            <div class="current_media">${media_node}</div>
            <p>${title}</p>
            <button class="btn_close">
                <p>Fermer</p>
            </button>
        </div>
        <button class="btn_next">
            <p>Suivant</p>
        </button>
        `;

        let btn_close = div_light.querySelector(".btn_close");
        btn_close.addEventListener("click", () => {

            div_light.remove();

        })
        let btn_prev = div_light.querySelector(".btn_prev");
        btn_prev.addEventListener("click", () => {

            this.navigation("prev");

        })
        let btn_next = div_light.querySelector(".btn_next");
        btn_next.addEventListener("click", () => {

            this.navigation("next");

        })

        return div_light;

    },

    navigation: function(param) {

        let current_media = document.querySelector(".current_media");
        let current_i = medias_nodes.findIndex(media_node => media_node == current_media.firstElementChild.outerHTML);
        let new_media;
        let new_title;

        if (param == "prev") {

            if (current_i == 0) {
                current_i = medias_nodes.length;
            }
            new_media = medias_light[current_i - 1].outerHTML;
            new_title = medias_light[current_i - 1].title;

        } else if (param == "next") {

            if (current_i == medias_nodes.length - 1) {
                current_i = -1;
            }
            new_media = medias_light[current_i + 1].outerHTML;
            new_title = medias_light[current_i + 1].title;

        }

        current_media.innerHTML = new_media;
        current_media.nextElementSibling.innerHTML = new_title;

    }

};

lightbox.init();
lightbox.dom_html();

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
                        ((event_type === "keydown" && e.key === "Enter") ||
                        (event_type === "click"))) {

                            media_likes_new++
                            span_media_likes.innerText = media_likes_new

                    } else if (media_likes_origin == (media_likes_new - 1)) {

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
