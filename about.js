/* =====================================================
   ABOUT PAGE JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* =================================================
       2. COUNTER ANIMATION
       ================================================= */

    const counters =
        document.querySelectorAll(".counter");

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const counter =
                        entry.target;

                    const target =
                        parseInt(
                            counter.dataset.target
                        );

                    let current = 0;

                    const duration = 1200;

                    const step =
                        target /
                        (duration / 16);


                    function update() {

                        current += step;

                        if (current >= target) {

                            counter.textContent =
                                target;

                            return;
                        }

                        counter.textContent =
                            Math.floor(current);

                        requestAnimationFrame(update);
                    }

                    update();

                    counterObserver
                        .unobserve(counter);

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =================================================
       3. PROFILE MODAL
       ================================================= */

    const profileModal =
        document.querySelector("#profileModal");

    const closeProfile =
        document.querySelector("#closeProfile");

    const modalImage =
        document.querySelector("#modalImage");

    const modalName =
        document.querySelector("#modalName");

    const modalRole =
        document.querySelector("#modalRole");

    const modalBio =
        document.querySelector("#modalBio");


    const profileCards =
        document.querySelectorAll(
            ".org-card, .advisor-card"
        );


    profileCards.forEach(card => {

        card.addEventListener("click", () => {

            let name;
            let role;
            let image;
            let bio;


            /* BPH */

            if (card.classList.contains("org-card")) {

                name =
                    card.dataset.name;

                role =
                    card.dataset.role;

                image =
                    card.dataset.image;

                bio =
                    card.dataset.bio;

            }


            /* DOSEN PA */

            else {

                name =
                    "Dr. Nur Saadah Fitri Asih, M.Pd.";

                role =
                    "DOSEN PEMBIMBING AKADEMIK";

                image =
                    "assets/about/dosen-pa.jpg";

                bio =
                    "Dosen Pembimbing Akademik yang mendampingi mahasiswa dalam perjalanan akademik mereka.";
            }


            modalName.textContent = name;

            modalRole.textContent = role;

            modalImage.src = image;

            modalImage.alt = name;

            modalBio.textContent = bio;


            profileModal.classList.add("active");

            document.body.classList.add(
                "modal-open"
            );

        });

    });


    /* =================================================
       4. CLOSE PROFILE MODAL
       ================================================= */

    function closeModal() {

        profileModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    if (closeProfile) {

        closeProfile.addEventListener(
            "click",
            closeModal
        );

    }


    profileModal.addEventListener(
        "click",
        event => {

            if (
                event.target === profileModal
            ) {
                closeModal();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeModal();

            }

        }
    );


    /* =================================================
       5. JOURNEY TIMELINE
       ================================================= */

    const journeyItems =
        document.querySelectorAll(
            ".journey-item"
        );

    const journeyYear =
        document.querySelector(
            "#journeyYear"
        );

    const journeyTitle =
        document.querySelector(
            "#journeyTitle"
        );

    const journeyDescription =
        document.querySelector(
            "#journeyDescription"
        );


    journeyItems.forEach(item => {

        item.addEventListener("click", () => {

            /* Remove active */

            journeyItems.forEach(
                other => {

                    other.classList.remove(
                        "active"
                    );

                }
            );


            /* Add active */

            item.classList.add(
                "active"
            );


            /* Update content */

            journeyYear.textContent =
                item.dataset.year;

            journeyTitle.textContent =
                item.dataset.title;

            journeyDescription.textContent =
                item.dataset.description;

        });

    });


    /* =================================================
       6. SCROLL REVEAL
       ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".institution-card, " +
            ".academic-level, " +
            ".advisor-card, " +
            ".org-card, " +
            ".link-card"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add(
            "reveal-item"
        );

        revealObserver.observe(
            element
        );

    });


    /* =================================================
       7. MODAL BODY LOCK
       ================================================= */

    const style =
        document.createElement("style");

    style.textContent = `

        body.modal-open {
            overflow: hidden;
        }

        .reveal-item {
            opacity: 0;
            transform: translateY(30px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .reveal-item.show {
            opacity: 1;
            transform: translateY(0);
        }

    `;

    document.head.appendChild(style);

});