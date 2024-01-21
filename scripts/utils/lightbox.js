
export let lightbox = {

    init: function(mainPhotograph, headerPhotograph) {

        let medias_light = Array.from(document.querySelectorAll("a[aria-label='Close up view']"));
        medias_light.forEach((media) => {

            ["keydown", "click"].forEach((event_type) => {

                media.addEventListener(event_type, (e) => {

                    if ((event_type === "click") || (e.key === "Enter")) {

                        e.preventDefault();
                        let media_node;
                        let title;

                        if (event_type === "click") {
                            media_node = e.target.outerHTML;
                            title = e.target.title
                        } else if (e.key === "Enter") {
                            media_node = e.target.firstElementChild.outerHTML;
                            title = e.target.firstElementChild.title
                        }

                        let current_light = this.dom_html(media_node, title, mainPhotograph, headerPhotograph, medias_light);
                        document.body.appendChild(current_light);
                        mainPhotograph.setAttribute("aria-hidden", "true");
                        headerPhotograph.setAttribute("aria-hidden", "true");
                        document.querySelector(".btn_close").focus();

                    }

                });

            });

        });

    },

    dom_html: function(media_node, title, mainPhotograph, headerPhotograph, medias_light) {

        let div_light = document.createElement("div");
        div_light.classList.add("lightbox");
        div_light.setAttribute("role", "dialog");
        div_light.setAttribute("aria-hidden", "false");
        div_light.setAttribute("aria-labelledby", "lightbox");
        div_light.setAttribute("aria-describedby", "title_media");
        div_light.innerHTML = `

            <h1>Zoom sur les oeuvres du photographe</h1>
            <div class="light_media">
                <button class="btn_close">
                    <p>Fermer</p>
                </button>
                <div class="current_media">${media_node}</div>
                <p id="title_media">${title}</p>
            </div>
            <button class="btn_prev">
                <p>Précédent</p>
            </button>
            <button class="btn_next">
                <p>Suivant</p>
            </button>

        `;

        let btn_close = div_light.querySelector(".btn_close");
        btn_close.addEventListener("click", () => {

            div_light.remove();
            mainPhotograph.setAttribute("aria-hidden", "false");
            headerPhotograph.setAttribute("aria-hidden", "false");

        });

        let btn_prev = div_light.querySelector(".btn_prev");
        btn_prev.addEventListener("click", () => {

            this.navigation("prev", medias_light);

        })

        let btn_next = div_light.querySelector(".btn_next");
        btn_next.addEventListener("click", () => {

            this.navigation("next", medias_light);

        })

        div_light.addEventListener("keydown", (e) => {

            switch (e.key) {

                case "Escape" :
                    div_light.remove();
                    mainPhotograph.setAttribute("aria-hidden", "false");
                    headerPhotograph.setAttribute("aria-hidden", "false");
                    break;
                case "ArrowLeft" :
                    this.navigation("prev", medias_light);
                    break;
                case "ArrowRight" :
                    this.navigation("next", medias_light);
                    break;

            }

        })

        return div_light;

    },

    navigation: function(param, medias_light) {

        let medias_nodes = medias_light.map(media_light => media_light.firstElementChild.outerHTML);
        let current_media = document.querySelector(".current_media");
        let current_i = medias_nodes.findIndex(media_node => media_node == current_media.firstElementChild.outerHTML);
        let new_media;
        let new_title;

        switch (param) {

            case "prev":
                if (current_i == 0) {
                    current_i = medias_nodes.length;
                }
                new_media = medias_light[current_i - 1].firstElementChild.outerHTML;
                new_title = medias_light[current_i - 1].firstElementChild.title;
                break;
            case "next" :
                if (current_i == medias_nodes.length - 1) {
                    current_i = -1;
                }
                new_media = medias_light[current_i + 1].firstElementChild.outerHTML;
                new_title = medias_light[current_i + 1].firstElementChild.title;
                break;

        }

        current_media.innerHTML = new_media;
        current_media.nextElementSibling.innerHTML = new_title;

    }

};