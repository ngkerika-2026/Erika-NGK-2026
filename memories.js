/* ========================================
   MEMORIES PAGE
======================================== */


/* ========================================
   MEMORY DATA
======================================== */

const memories = [

    {
        year: "2026",
        title: "First Day Together",
        description:
            "The first moments of our journey as a class.",
        image: "assets/memories/memory-01.jpg"
    },

    {
        year: "2026",
        title: "First Class",
        description:
            "Our first academic moments together.",
        image: "assets/memories/memory-02.jpg"
    },

    {
        year: "2026",
        title: "Class Gathering",
        description:
            "A simple gathering that became a memory.",
        image: "assets/memories/memory-03.jpg"
    },

    {
        year: "2027",
        title: "Growing Together",
        description:
            "Another chapter of our journey.",
        image: "assets/memories/memory-04.jpg"
    },

    {
        year: "2027",
        title: "Campus Life",
        description:
            "Everyday moments on campus.",
        image: "assets/memories/memory-05.jpg"
    },

    {
        year: "2028",
        title: "Creating Together",
        description:
            "Projects and experiences we built together.",
        image: "assets/memories/memory-06.jpg"
    },

    {
        year: "2028",
        title: "Class Event",
        description:
            "A memorable day with the whole class.",
        image: "assets/memories/memory-07.jpg"
    },

    {
        year: "2029",
        title: "Almost There",
        description:
            "The final chapters begin.",
        image: "assets/memories/memory-08.jpg"
    },

    {
        year: "2030",
        title: "The Final Chapter",
        description:
            "The moment we close this chapter together.",
        image: "assets/memories/memory-09.jpg"
    }

];


/* ========================================
   ELEMENTS
======================================== */

const memoryGrid =
    document.getElementById("memoryGrid");

const yearButtons =
    document.querySelectorAll(".year-btn");

const lightbox =
    document.getElementById("memoryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxYear =
    document.getElementById("lightboxYear");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxDescription =
    document.getElementById(
        "lightboxDescription"
    );

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const viewFeatured =
    document.getElementById("viewFeatured");


/* ========================================
   CURRENT STATE
======================================== */

let currentFilter = "all";

let currentMemoryIndex = 0;

let visibleMemories = [];


/* ========================================
   RENDER GALLERY
======================================== */

function renderMemories(year = "all") {

    if (!memoryGrid) return;

    currentFilter = year;


    visibleMemories =
        memories.filter(memory => {

            if (year === "all") {
                return true;
            }

            return memory.year === year;

        });


    memoryGrid.innerHTML = "";


    if (visibleMemories.length === 0) {

        memoryGrid.innerHTML = `
            <div class="memory-empty">
                No memories available yet.
            </div>
        `;

        return;
    }


    visibleMemories.forEach(
        (memory, index) => {

            const card =
                document.createElement("article");

            card.className = "memory-card";


            card.innerHTML = `

                <img
                    src="${memory.image}"
                    alt="${memory.title}"
                    loading="lazy"
                >

                <div class="memory-card-overlay">

                    <span>
                        ${memory.year}
                    </span>

                    <h3>
                        ${memory.title}
                    </h3>

                    <p>
                        ${memory.description}
                    </p>

                </div>

            `;


            card.addEventListener(
                "click",
                () => openLightbox(index)
            );


            memoryGrid.appendChild(card);

        }
    );

}


renderMemories();


/* ========================================
   YEAR FILTER
======================================== */

yearButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            yearButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            renderMemories(
                button.dataset.year
            );

        }
    );

});


/* ========================================
   LIGHTBOX
======================================== */

function openLightbox(index) {

    if (
        !visibleMemories.length
    ) {
        return;
    }


    currentMemoryIndex = index;

    updateLightbox();


    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function updateLightbox() {

    const memory =
        visibleMemories[
            currentMemoryIndex
        ];

    if (!memory) return;


    lightboxImage.src =
        memory.image;

    lightboxImage.alt =
        memory.title;

    lightboxYear.textContent =
        memory.year;

    lightboxTitle.textContent =
        memory.title;

    lightboxDescription.textContent =
        memory.description;

}


function closeLightbox() {

    lightbox.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


function nextMemory() {

    if (!visibleMemories.length) {
        return;
    }


    currentMemoryIndex++;

    if (
        currentMemoryIndex >=
        visibleMemories.length
    ) {
        currentMemoryIndex = 0;
    }


    updateLightbox();

}


function previousMemory() {

    if (!visibleMemories.length) {
        return;
    }


    currentMemoryIndex--;

    if (currentMemoryIndex < 0) {

        currentMemoryIndex =
            visibleMemories.length - 1;

    }


    updateLightbox();

}


/* ========================================
   LIGHTBOX EVENTS
======================================== */

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextMemory
    );

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousMemory
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* ========================================
   KEYBOARD CONTROLS
======================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "show"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextMemory();

        }


        if (event.key === "ArrowLeft") {

            previousMemory();

        }

    }
);


/* ========================================
   FEATURED MEMORY
======================================== */

if (viewFeatured) {

    viewFeatured.addEventListener(
        "click",
        () => {

            /*
             * Featured memory uses the
             * first image in the gallery.
             */

            const featuredIndex =
                visibleMemories.findIndex(
                    memory =>
                        memory.year === "2026"
                );


            if (featuredIndex !== -1) {

                openLightbox(
                    featuredIndex
                );

            }

        }
    );

}