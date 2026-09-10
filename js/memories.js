const container = document.getElementById("memoryContainer");
const continueBtn = document.getElementById("continueBtn");

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const closeLightbox = document.getElementById("closeLightbox");


/* =========================================================
   MEMORY COLLECTION
========================================================= */

const memories = [
    { type: "image", src: "ekene/adaarh1.jpg" },
    { type: "image", src: "ekene/adaarh5.jpg" },
    { type: "image", src: "ekene/adaarh6.jpg" },
    { type: "image", src: "ekene/adaarh8.jpg" },
    { type: "image", src: "ekene/adaarh13.jpg" },
    { type: "image", src: "ekene/adaarh11.jpg" },
    { type: "image", src: "ekene/adaarh17.jpg" },
    { type: "image", src: "ekene/adaarh14.jpg" },
    { type: "image", src: "ekene/adaarh12.jpg" },
    { type: "image", src: "ekene/adaarh20.jpg" },
    { type: "image", src: "ekene/adaarh18.jpg" },
    { type: "image", src: "ekene/adaarh16.png" },
    { type: "image", src: "ekene/adaarh23.jpg" },
    { type: "image", src: "ekene/adaarh22.jpg" },

    { type: "video", src: "ekene/adaarhvid1.mp4" },
    { type: "video", src: "ekene/adaarhvid7.mp4" },
    { type: "video", src: "ekene/adaarhvid6.mp4" },
    { type: "video", src: "ekene/adaarhvid4.mp4" },
    { type: "video", src: "ekene/adaarhvid2.mp4" },
    { type: "video", src: "ekene/adaarhvid8.mp4" },
    { type: "video", src: "ekene/adaarhvid13.mp4" },
    { type: "video", src: "ekene/adaarhvid16.mp4" },
    { type: "video", src: "ekene/adaarhvid12.mp4" },
    { type: "video", src: "ekene/adaarhvid9.mp4" },
    { type: "video", src: "ekene/adaarhvid17.mp4" },
    { type: "video", src: "ekene/adaarhvid18.mp4" }
];


/* =========================================================
   RANDOM NUMBER
========================================================= */

function random(min, max) {
    return Math.random() * (max - min) + min;
}


/* =========================================================
   GET RESPONSIVE CARD SIZE
========================================================= */

function getMemoryWidth() {

    const screenWidth = window.innerWidth;

    /* Phone */
    if (screenWidth <= 600) {
        return random(100, 100);
    }

    /* Tablet */
    if (screenWidth <= 900) {
        return random(150, 150);
    }

    /* Laptop */
    if (screenWidth <= 1400) {
        return random(180, 180);
    }

    /* Large desktop */
    return random(230, 230);
}

/* =========================================================
   CREATE MEMORY
========================================================= */

function createMemory() {

    const selected =
        memories[
            Math.floor(
                Math.random() * memories.length
            )
        ];


    /* Create card */

    const card =
        document.createElement("div");

    card.classList.add("memory");


    /* =====================================================
       CARD SIZE
    ===================================================== */

    const width = getMemoryWidth();

    card.style.width =
        `${width}px`;


    /* =====================================================
       RANDOM ROTATION
    ===================================================== */

    const rotation =
        random(-14, 14);

    card.style.setProperty(
        "--rotation",
        `${rotation}deg`
    );


    /* =====================================================
       RANDOM SPAWN DIRECTION
    ===================================================== */

    const directions = [
        "spawn-left",
        "spawn-right",
        "spawn-top",
        "spawn-bottom"
    ];

    const direction =
        directions[
            Math.floor(
                Math.random() *
                directions.length
            )
        ];

    card.classList.add(direction);


    /* =====================================================
       CREATE IMAGE
    ===================================================== */

    if (selected.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            selected.src;

        image.alt =
            "Birthday memory";

        image.loading =
            "eager";

        card.appendChild(image);
    }


    /* =====================================================
       CREATE VIDEO
    ===================================================== */

    if (selected.type === "video") {

        const video =
            document.createElement("video");

        video.src =
            selected.src;

        /*
         * These are essential for
         * autoplay on modern browsers.
         */

        video.autoplay = true;

        video.muted = true;

        video.defaultMuted = true;

        video.playsInline = true;

        video.loop = true;

        video.controls = false;

        video.setAttribute(
            "autoplay",
            ""
        );

        video.setAttribute(
            "muted",
            ""
        );

        video.setAttribute(
            "playsinline",
            ""
        );

        card.appendChild(video);

        /*
         * Explicitly start playback.
         */

        video.play().catch((error) => {

            console.log(
                "Autoplay blocked:",
                error
            );

        });
    }


    /* =====================================================
       LABEL
    ===================================================== */

    const label =
        document.createElement("div");

    label.classList.add(
        "memory-label"
    );

    label.textContent =
        "A beautiful moment ✨";

    card.appendChild(label);


    /* =====================================================
       CLICK → LIGHTBOX
    ===================================================== */

    card.addEventListener(
        "click",
        () => {
            openLightbox(selected);
        }
    );


    /* =====================================================
       ADD CARD TO DOM FIRST
       SO WE CAN MEASURE IT
    ===================================================== */

    container.appendChild(card);


    /* =====================================================
       SAFE VIEWPORT POSITIONING
    ===================================================== */

    positionMemorySafely(card);


    /* =====================================================
       LIMIT NUMBER OF VISIBLE CARDS
    ===================================================== */

    const all =
        container.querySelectorAll(
            ".memory"
        );

    /*
     * 10 large cards is enough to
     * create controlled chaos without
     * completely covering the screen.
     */

    if (all.length > 10) {

        all[0].remove();
    }
}


/* =========================================================
   SAFE MEMORY POSITIONING
========================================================= */

function positionMemorySafely(card) {

    /*
     * Wait one frame so the browser
     * has calculated card dimensions.
     */

    requestAnimationFrame(() => {

        const cardWidth =
            card.offsetWidth;

        const cardHeight =
            card.offsetHeight;


        const viewportWidth =
            window.innerWidth;

        const viewportHeight =
            window.innerHeight;


        /*
         * Keep a safe margin around
         * the screen edges.
         */

        const sidePadding =
            viewportWidth <= 600
                ? 8
                : 18;


        /*
         * Reserve space for the
         * Continue button.
         */

        const bottomReserved =
            viewportWidth <= 600
                ? 85
                : 105;


        /*
         * Calculate the maximum
         * safe coordinates.
         */

        const maxLeft =
            Math.max(
                sidePadding,
                viewportWidth -
                    cardWidth -
                    sidePadding
            );


        const maxTop =
            Math.max(
                sidePadding,
                viewportHeight -
                    cardHeight -
                    bottomReserved
            );


        /*
         * Keep the center area available
         * while still allowing cards to
         * appear around it.
         */

        let left =
            random(
                sidePadding,
                maxLeft
            );


        let top =
            random(
                sidePadding,
                maxTop
            );


        /*
         * Prevent cards from spawning
         * directly over the Continue button.
         */

        if (
            top + cardHeight >
            viewportHeight -
            bottomReserved
        ) {

            top =
                Math.max(
                    sidePadding,
                    viewportHeight -
                    cardHeight -
                    bottomReserved
                );
        }


        /*
         * Set final position in pixels.
         *
         * This is much more reliable
         * than percentage positioning
         * for large cards.
         */

        card.style.left =
            `${left}px`;

        card.style.top =
            `${top}px`;
    });
}


/* =========================================================
   LIGHTBOX
========================================================= */

function openLightbox(memory) {

    lightboxContent.innerHTML = "";


    /* IMAGE */

    if (memory.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            memory.src;

        image.alt =
            "Birthday memory";

        lightboxContent.appendChild(
            image
        );
    }


    /* VIDEO */

    if (memory.type === "video") {

        const video =
            document.createElement("video");

        video.src =
            memory.src;

        video.controls = true;

        video.autoplay = true;

        video.playsInline = true;

        video.setAttribute(
            "playsinline",
            ""
        );

        lightboxContent.appendChild(
            video
        );


        video.play().catch((error) => {

            console.log(
                "Lightbox autoplay blocked:",
                error
            );

        });
    }


    lightbox.classList.add(
        "active"
    );
}


/* =========================================================
   CLOSE LIGHTBOX
========================================================= */

function closeLightboxFunction() {

    lightbox.classList.remove(
        "active"
    );

    lightboxContent.innerHTML = "";
}


closeLightbox.addEventListener(
    "click",
    closeLightboxFunction
);


lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeLightboxFunction();
        }
    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeLightboxFunction();
        }
    }
);


/* =========================================================
   INITIAL MEMORIES
========================================================= */

for (
    let i = 0;
    i < 7;
    i++
) {

    setTimeout(
        () => {
            createMemory();
        },
        i * 650
    );
}


/* =========================================================
   CONTINUOUS SPAWNING
========================================================= */

const spawnInterval =
    setInterval(
        () => {

            createMemory();

        },
        3000
    );


/* =========================================================
   CONTINUE BUTTON
========================================================= */

continueBtn.addEventListener(
    "click",
    () => {

        clearInterval(
            spawnInterval
        );

        document.body.classList.add(
            "page-exit"
        );

        setTimeout(
            () => {

                window.location.href =
                    "final.html";

            },
            700
        );
    }
);


/* =========================================================
   REPOSITION EXISTING CARDS
   WHEN WINDOW RESIZES
========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );

        resizeTimer =
            setTimeout(
                () => {

                    const cards =
                        container.querySelectorAll(
                            ".memory"
                        );

                    cards.forEach(
                        (card) => {

                            positionMemorySafely(
                                card
                            );

                        }
                    );

                },
                150
            );
    }
);