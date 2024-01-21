
export let contact_form = {

    init: function(mainPhotograph, headerPhotograph) {

        let btn_contact = document.querySelector(".photographer_header button");
        btn_contact.addEventListener("click", () => {

                let current_form = this.dom_html(mainPhotograph, headerPhotograph);
                document.body.appendChild(current_form);
                mainPhotograph.setAttribute("aria-hidden", "true");
                headerPhotograph.setAttribute("aria-hidden", "true");
                let modal_x = document.querySelector(".modal_x");
                modal_x.focus();
                this.form_log();
                this.form_submit(modal_x);

        });

    },

    dom_html: function(mainPhotograph, headerPhotograph) {

        let div_modal = document.createElement("div");
        div_modal.id = "modal";
        div_modal.setAttribute("role", "dialog");
        div_modal.setAttribute("aria-labelledby", "contact_title");
        div_modal.setAttribute("aria-hidden", "false"); 
        let name = document.querySelector(".photographer_header h1").innerText;
        div_modal.innerHTML = `

            <div class="modal">
                <button class="modal_x" aria-label="Fermer formulaire contact">×</button>
                <header class="modal_header">
                    <h1 id="contact_title">
                        Contactez-moi<br>
                        <span>${name}</span>
                    </h1>
                </header>
                <form method="get" action="">
                    <label for="first_name">Prénom</label>
                    <input type="text" name="first_name" id="first_name" required>
                    <label for="last_name">Nom</label>
                    <input type="text" name="last_name" id="last_name" required>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email" required>
                    <label for="your_message">Votre message</label>
                    <textarea name="your_message" id="your_message" required></textarea>
                    <button class="btn_red">Envoyer</button>
                </form>
            </div>

            `;

        function remove_modal() {

            div_modal.remove();
            mainPhotograph.setAttribute("aria-hidden", "false");
            headerPhotograph.setAttribute("aria-hidden", "false");

        }

        let btn_close = div_modal.querySelector(".modal_x");
        btn_close.addEventListener("click", () => {

            remove_modal();

        });

        div_modal.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {

                remove_modal();

            }

        })

        return div_modal;

    },

    form_log: function() {

        const into_form = document.querySelectorAll("form input, #your_message");
        for (let i = 0; i < into_form.length; i++) {
    
            into_form[i].addEventListener ('change', () => {

                const value_label = into_form[i].labels[0].textContent;
                const value_input = into_form[i].value;
                console.log("Champ " + value_label + " : " + value_input);

            })

        }

    },

    form_submit: function(modal_x) {

        const form = document.querySelector(".modal form");
        form.addEventListener("submit", (event) => {

            event.preventDefault();
            modal_x.focus();
            const h1_modal = document.querySelector(".modal_header h1");
            form.innerHTML = `
            <p>Merci de m'avoir contacté !<br>
            Je te répondrai dès que possible.</p>
            `
            h1_modal.innerText = "Message envoyé.";

        })

    }

}