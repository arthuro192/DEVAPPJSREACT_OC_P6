
export function photographerTemplate(data) {

    const {name, id, city, country, tagline, price, portrait} = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');
        const user_card = `
            <a href="photographer.html?id=${id}" title="Page personnelle : ${name}">
                <img class="photographer" src="${picture}" alt="Portrait représentant le ou la photographe : ${name}">
                <h2>
                    ${name}
                </h2>
            </a>
            <p aria-label="photographer_info">
                <span class="photographer_place">${city}, ${country}</span>
                <span class="photographer_tagline">${tagline}</span>
                <span class="photographer_price">${price}€/jour</span>
            </p>
        `
        article.innerHTML = user_card

        return (article);

    }

    function getUserPageDOM() {

        const photographer_header = document.querySelector(".photographer_header")
        const user_page = `
            <div aria-label="photographer_infos">
                <h1>${name}</h1>
                <p class="userpage_red_txt">${city}, ${country}</p>
                <p class="userpage_tagline">${tagline}</p>
                <div class="additional_infos" aria-label="photographer_likes_and_price">
                    <p class="photographer_likes">
                    </p>
                    <p>${price}€/jour</p>
                </div> 
            </div>
            <button class="btn_red" onclick="openModal()">
                Contactez-moi
            </button>
            <img class="photographer" src="${picture}" alt="Portrait représentant le ou la photographe : ${name}">
        `
        photographer_header.innerHTML = user_page

        // PHOTOGRAPHER_NAME_MODAL ################################################

        const h1_modal = document.querySelector(".modal h1")
        const name_modal = document.createElement('span');
        name_modal.innerHTML = `${name}`
        h1_modal.appendChild(name_modal);

        // PHOTOGRAPHER_NAME_MODAL ################################################

        return (photographer_header)

    }

    return {name, picture, getUserCardDOM, getUserPageDOM}

}

export function mediaTemplate(data) {

    const {id, photographerId, title, image, alt_image, video, likes, date, price} = data;
    const path_img = `assets/medias/ID_${photographerId}/${image}`;
    const path_video = `assets/medias/ID_${photographerId}/${video}`;

    function getMediaCardDOM() {

        const article = document.createElement('article');

        if (data.image) {

            const media_img = `
                <a href="${path_img}" aria-label="Close up view">
                    <img src="${path_img}" title ="${title}" alt="${alt_image}">
                </a>
                <p class="userpage_red_txt">
                    ${title}
                    <span class="userpage_red_txt" aria-label="media_likes">
                        ${likes}
                    </span>
                    <i class="fa-solid fa-heart" aria-label="heart_icon" role="img" tabindex="0">
                    </i>
                </p>
            `
            article.innerHTML = media_img

        }

        if (data.video) {

            const media_video = `
                <a href="${path_video}" aria-label="Close up view">
                    <video src="${path_video}" title ="${title}" controls tabindex="0">
                    </video>
                </a>
                <p class="userpage_red_txt">
                    ${title}
                    <span class="userpage_red_txt" aria-label="media_likes">
                        ${likes}
                    </span>
                    <i class="fa-solid fa-heart" aria-label="heart_icon" role="img" tabindex="0">
                    </i>
                </p>
            `
            article.innerHTML = media_video

        }

        return (article);

    }

    return {getMediaCardDOM}

}