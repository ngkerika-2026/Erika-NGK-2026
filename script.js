/* =====================================================
   CLASS WEBSITE - JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GLOBAL
       ===================================================== */

    const body = document.body;


    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }


    /* =====================================================
       2. TIME-BASED GREETING
       ===================================================== */

    const greetingElement = document.querySelector("#greeting");

    if (greetingElement) {
        const hour = new Date().getHours();

        let greeting;

        if (hour >= 5 && hour < 11) {
            greeting = "Good Morning";
        } else if (hour >= 11 && hour < 15) {
            greeting = "Good Afternoon";
        } else if (hour >= 15 && hour < 18) {
            greeting = "Good Evening";
        } else {
            greeting = "Good Night";
        }

        greetingElement.textContent = greeting;
    }


    /* =====================================================
       3. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .section-header, .update-card, .member-card, .timeline-item"
    );

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal-hidden");
            revealObserver.observe(element);
        });
    }


    /* =====================================================
       4. ANIMATED STATISTICS
       ===================================================== */

    const counters = document.querySelectorAll(".counter");

    if (counters.length > 0) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);

                    let current = 0;
                    const duration = 1200;
                    const increment = target / (duration / 16);

                    const updateCounter = () => {

                        current += increment;

                        if (current >= target) {
                            counter.textContent = target;
                            return;
                        }

                        counter.textContent = Math.floor(current);

                        requestAnimationFrame(updateCounter);
                    };

                    updateCounter();

                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }


    /* =====================================================
       5. ANNOUNCEMENT MODAL
       ===================================================== */

    const announcementButtons =
        document.querySelectorAll("[data-announcement]");

    const announcementModal =
        document.querySelector("#announcementModal");

    const closeAnnouncement =
        document.querySelector("#closeAnnouncement");

    if (announcementModal) {

        announcementButtons.forEach(button => {

            button.addEventListener("click", () => {

                const title =
                    button.dataset.title || "Announcement";

                const content =
                    button.dataset.announcement || "";

                const modalTitle =
                    announcementModal.querySelector(".modal-title");

                const modalContent =
                    announcementModal.querySelector(".modal-content-text");

                if (modalTitle) {
                    modalTitle.textContent = title;
                }

                if (modalContent) {
                    modalContent.textContent = content;
                }

                announcementModal.classList.add("active");
                body.classList.add("modal-open");

            });

        });


        if (closeAnnouncement) {
            closeAnnouncement.addEventListener("click", closeModal);
        }

        announcementModal.addEventListener("click", event => {

            if (event.target === announcementModal) {
                closeModal();
            }

        });
    }


    /* =====================================================
       6. MEMBER DATA
       ===================================================== */

    const members = [
        {
            name: "Sultan Rizky Akbar",
            role: "Member",
            photo: "assets/members/member-01.jpg",
            instagram: "#",
            github: "#",
            bio: "Student interested in writing, web development, Japanese culture, and creative projects."
        },

        {
            name: "Nama Mahasiswa",
            role: "Member",
            photo: "assets/members/member-02.jpg",
            instagram: "#",
            github: "#",
            bio: "A member of our class."
        },

        {
            name: "Nama Mahasiswa",
            role: "Member",
            photo: "assets/members/member-03.jpg",
            instagram: "#",
            github: "#",
            bio: "A member of our class."
        },

        {
            name: "Nama Mahasiswa",
            role: "Member",
            photo: "assets/members/member-04.jpg",
            instagram: "#",
            github: "#",
            bio: "A member of our class."
        },

        {
            name: "Nama Mahasiswa",
            role: "Member",
            photo: "assets/members/member-05.jpg",
            instagram: "#",
            github: "#",
            bio: "A member of our class."
        },

        {
            name: "Nama Mahasiswa",
            role: "Member",
            photo: "assets/members/member-06.jpg",
            instagram: "#",
            github: "#",
            bio: "A member of our class."
        }
    ];


    /* =====================================================
       7. MEMBER DIRECTORY
       ===================================================== */

    const memberGrid = document.querySelector("#memberGrid");
    const memberSearch = document.querySelector("#memberSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const memberCount = document.querySelector("#memberCount");

    let currentFilter = "All";


    function renderMembers() {

        if (!memberGrid) return;

        const searchValue =
            memberSearch
                ? memberSearch.value.toLowerCase().trim()
                : "";

        const filteredMembers = members.filter(member => {

            const matchesSearch =
                member.name.toLowerCase().includes(searchValue);

            const matchesRole =
                currentFilter === "All" ||
                member.role === currentFilter;

            return matchesSearch && matchesRole;
        });


        memberGrid.innerHTML = "";


        filteredMembers.forEach((member, index) => {

            const card = document.createElement("article");

            card.className = "member-card";

            card.innerHTML = `
                <div class="member-image">
                    <img
                        src="${member.photo}"
                        alt="${member.name}"
                        loading="lazy"
                    >
                    <span class="member-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <div class="member-info">

                    <span class="member-role">
                        ${member.role}
                    </span>

                    <h3>${member.name}</h3>

                    <span class="member-arrow">
                        →
                    </span>

                </div>
            `;


            card.addEventListener("click", () => {
                openMemberModal(member);
            });


            memberGrid.appendChild(card);
        });


        if (memberCount) {
            memberCount.textContent =
                `${filteredMembers.length} Members`;
        }


        if (filteredMembers.length === 0) {

            memberGrid.innerHTML = `
                <div class="no-results">
                    <h3>No member found</h3>
                    <p>
                        Try another name or filter.
                    </p>
                </div>
            `;
        }
    }


    /* =====================================================
       8. MEMBER SEARCH
       ===================================================== */

    if (memberSearch) {

        memberSearch.addEventListener("input", () => {
            renderMembers();
        });

    }


    /* =====================================================
       9. MEMBER FILTER
       ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            renderMembers();

        });

    });


    /* =====================================================
       10. MEMBER MODAL
       ===================================================== */

    const memberModal =
        document.querySelector("#memberModal");


    function openMemberModal(member) {

        if (!memberModal) return;

        const image =
            memberModal.querySelector(".profile-image");

        const name =
            memberModal.querySelector(".profile-name");

        const role =
            memberModal.querySelector(".profile-role");

        const bio =
            memberModal.querySelector(".profile-bio");

        const instagram =
            memberModal.querySelector(".profile-instagram");

        const github =
            memberModal.querySelector(".profile-github");


        if (image) {
            image.src = member.photo;
            image.alt = member.name;
        }

        if (name) {
            name.textContent = member.name;
        }

        if (role) {
            role.textContent = member.role;
        }

        if (bio) {
            bio.textContent = member.bio;
        }

        if (instagram) {
            instagram.href = member.instagram;
        }

        if (github) {
            github.href = member.github;
        }


        memberModal.classList.add("active");
        body.classList.add("modal-open");
    }


    /* =====================================================
       11. CLOSE MEMBER MODAL
       ===================================================== */

    const closeMember =
        document.querySelector("#closeMember");


    if (closeMember) {
        closeMember.addEventListener("click", closeModal);
    }


    if (memberModal) {

        memberModal.addEventListener("click", event => {

            if (event.target === memberModal) {
                closeModal();
            }

        });

    }


    function closeModal() {

        document
            .querySelectorAll(".modal.active")
            .forEach(modal => {
                modal.classList.remove("active");
            });

        body.classList.remove("modal-open");
    }


    /* =====================================================
       12. ESC KEY TO CLOSE MODAL
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =====================================================
       13. TIMELINE INTERACTION
       ===================================================== */

    const timelineItems =
        document.querySelectorAll(".timeline-item");


    timelineItems.forEach(item => {

        item.addEventListener("click", () => {

            timelineItems.forEach(other => {
                other.classList.remove("selected");
            });

            item.classList.add("selected");

        });

    });


    /* =====================================================
       14. INITIALIZE MEMBER PAGE
       ===================================================== */

    if (memberGrid) {
        renderMembers();
    }


    /* =====================================================
       15. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            document
                .querySelector(targetId)
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });

});

/* ========================================
   MOBILE NAVIGATION
======================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.add("active");
    navMenu.classList.add("open");

    if (navOverlay) {
        navOverlay.classList.add("show");
    }

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");

    document.body.style.overflow = "hidden";
}

function closeMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");

    if (navOverlay) {
        navOverlay.classList.remove("show");
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");

    document.body.style.overflow = "";
}

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        if (navMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    navMenu.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", closeMenu);
    });
}

if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
}

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeMenu();
    }

});

window.addEventListener("resize", function() {

    if (window.innerWidth > 800) {
        closeMenu();
    }

});