/* ========================================
   ACADEMIC PAGE
======================================== */


/* ========================================
   MATERIAL REPOSITORY
======================================== */

const materials = [

    {
        title: "RPS Semester 1",
        type: "rps",
        typeLabel: "RPS",
        course: "Semester 1",
        year: "2026",
        description:
            "Rencana pembelajaran semester dan gambaran umum perkuliahan.",
        link: "#"
    },

    {
        title: "Pengantar Pendidikan",
        type: "materi",
        typeLabel: "MATERIAL",
        course: "Pengantar Pendidikan",
        year: "2026",
        description:
            "Kumpulan materi perkuliahan dan catatan pembelajaran.",
        link: "#"
    },

    {
        title: "Bahasa Indonesia",
        type: "materi",
        typeLabel: "MATERIAL",
        course: "Bahasa Indonesia",
        year: "2026",
        description:
            "Materi, presentasi, dan bahan pembelajaran Bahasa Indonesia.",
        link: "#"
    },

    {
        title: "Jurnal Pendidikan",
        type: "referensi",
        typeLabel: "REFERENCE",
        course: "References",
        year: "2026",
        description:
            "Kumpulan jurnal dan artikel yang dapat digunakan sebagai referensi.",
        link: "#"
    },

    {
        title: "Template Makalah",
        type: "referensi",
        typeLabel: "REFERENCE",
        course: "Academic Template",
        year: "2026",
        description:
            "Template dan format dokumen untuk kebutuhan akademik.",
        link: "academic/template Makalah.docx"
    },

    {
        title: "Materi Perkuliahan",
        type: "materi",
        typeLabel: "MATERIAL",
        course: "General",
        year: "2026",
        description:
            "Berbagai materi yang dibagikan selama kegiatan perkuliahan.",
        link: "#"
    }

];


const materialGrid =
    document.getElementById("materialGrid");

const materialSearch =
    document.getElementById("materialSearch");

const materialFilters =
    document.querySelectorAll(".material-filter");


function renderMaterials(
    filter = "all",
    search = ""
) {

    if (!materialGrid) return;

    const keyword =
        search.toLowerCase().trim();

    const filtered =
        materials.filter(material => {

            const matchesFilter =
                filter === "all" ||
                material.type === filter;

            const matchesSearch =
                material.title
                    .toLowerCase()
                    .includes(keyword) ||

                material.course
                    .toLowerCase()
                    .includes(keyword) ||

                material.description
                    .toLowerCase()
                    .includes(keyword);

            return matchesFilter && matchesSearch;

        });


    materialGrid.innerHTML = "";


    if (filtered.length === 0) {

        materialGrid.innerHTML = `
            <div class="empty-result">
                <p>No materials found.</p>
            </div>
        `;

        return;
    }


    filtered.forEach(material => {

        const card =
            document.createElement("article");

        card.className = "material-card";


        card.innerHTML = `

            <div class="material-top">

                <span class="material-type">
                    ${material.typeLabel}
                </span>

                <span class="material-year">
                    ${material.year}
                </span>

            </div>


            <h3>
                ${material.title}
            </h3>


            <p>
                ${material.description}
            </p>


            <div class="material-footer">

                <span class="material-course">
                    ${material.course}
                </span>

                <span class="material-arrow">
                    →
                </span>

            </div>

        `;


        card.addEventListener("click", () => {

            if (material.link !== "#") {
                window.open(
                    material.link,
                    "_blank"
                );
            } else {
                alert(
                    "Link materi belum ditambahkan."
                );
            }

        });


        materialGrid.appendChild(card);

    });

}


renderMaterials();


/* Search */

if (materialSearch) {

    materialSearch.addEventListener(
        "input",
        () => {

            const activeFilter =
                document
                    .querySelector(".material-filter.active")
                    ?.dataset.filter || "all";

            renderMaterials(
                activeFilter,
                materialSearch.value
            );

        }
    );

}


/* Filter */

materialFilters.forEach(button => {

    button.addEventListener("click", () => {

        materialFilters.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");


        renderMaterials(
            button.dataset.filter,
            materialSearch
                ? materialSearch.value
                : ""
        );

    });

});



/* ========================================
   MEMBER ACHIEVEMENTS
======================================== */

const achievements = [

    {
        title: "Juara Olimpiade Bahasa Jepang",
        member: "Nama Mahasiswa",
        type: "Competition",
        year: "2026",
        image: "assets/achievements/achievement-01.jpg",
        description:
            "Pencapaian dalam kompetisi Bahasa Jepang tingkat nasional."
    },

    {
        title: "Best Presentation",
        member: "Nama Mahasiswa",
        type: "Academic",
        year: "2026",
        image: "assets/achievements/achievement-02.jpg",
        description:
            "Penghargaan atas presentasi terbaik dalam kegiatan akademik."
    },

    {
        title: "National Competition",
        member: "Nama Mahasiswa",
        type: "Competition",
        year: "2026",
        image: "assets/achievements/achievement-03.jpg",
        description:
            "Prestasi dalam kompetisi tingkat nasional."
    }

];


const achievementGrid =
    document.getElementById("achievementGrid");


function renderAchievements() {

    if (!achievementGrid) return;

    achievementGrid.innerHTML = "";


    achievements.forEach(
        (achievement, index) => {

            const card =
                document.createElement("article");

            card.className =
                "achievement-card";


            card.innerHTML = `

                <img
                    src="${achievement.image}"
                    alt="${achievement.title}"
                    class="achievement-image"
                >

                <div class="achievement-info">

                    <span class="achievement-type">
                        ${achievement.type}
                    </span>

                    <h3>
                        ${achievement.title}
                    </h3>

                    <p>
                        ${achievement.member}
                    </p>

                    <span class="achievement-year">
                        ${achievement.year}
                    </span>

                </div>

            `;


            card.addEventListener(
                "click",
                () => openAchievement(index)
            );


            achievementGrid.appendChild(card);

        }
    );

}


renderAchievements();



/* ========================================
   ACHIEVEMENT STATS
======================================== */

const achievementCount =
    document.getElementById(
        "achievementCount"
    );

const memberAchievementCount =
    document.getElementById(
        "memberAchievementCount"
    );

const yearAchievementCount =
    document.getElementById(
        "yearAchievementCount"
    );


if (achievementCount) {

    achievementCount.textContent =
        achievements.length;

}


if (memberAchievementCount) {

    const uniqueMembers =
        new Set(
            achievements.map(
                item => item.member
            )
        );

    memberAchievementCount.textContent =
        uniqueMembers.size;

}


if (yearAchievementCount) {

    const uniqueYears =
        new Set(
            achievements.map(
                item => item.year
            )
        );

    yearAchievementCount.textContent =
        uniqueYears.size;

}



/* ========================================
   ACHIEVEMENT MODAL
======================================== */

const achievementModal =
    document.getElementById(
        "achievementModal"
    );

const closeAchievement =
    document.getElementById(
        "closeAchievement"
    );


function openAchievement(index) {

    const achievement =
        achievements[index];

    if (!achievement) return;


    document.getElementById(
        "achievementImage"
    ).src = achievement.image;


    document.getElementById(
        "achievementImage"
    ).alt = achievement.title;


    document.getElementById(
        "modalAchievementType"
    ).textContent =
        achievement.type;


    document.getElementById(
        "modalAchievementTitle"
    ).textContent =
        achievement.title;


    document.getElementById(
        "modalAchievementMember"
    ).textContent =
        achievement.member;


    document.getElementById(
        "modalAchievementDescription"
    ).textContent =
        achievement.description;


    document.getElementById(
        "modalAchievementYear"
    ).textContent =
        achievement.year;


    achievementModal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


function closeAchievementModal() {

    achievementModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


if (closeAchievement) {

    closeAchievement.addEventListener(
        "click",
        closeAchievementModal
    );

}


if (achievementModal) {

    achievementModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                achievementModal
            ) {
                closeAchievementModal();
            }

        }
    );

}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            achievementModal?.classList.contains(
                "show"
            )
        ) {
            closeAchievementModal();
        }

    }
);
