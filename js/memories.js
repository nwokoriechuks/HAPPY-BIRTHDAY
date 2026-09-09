const container =
    document.getElementById("memoryContainer");

const continueBtn =
    document.getElementById("continueBtn");

const lightbox =
    document.getElementById("lightbox");

const lightboxContent =
    document.getElementById("lightboxContent");

const closeLightbox =
    document.getElementById("closeLightbox");


// ==========================================
// MEMORIES
// ==========================================

const memories = [

     {
        type: "image",
        src: "ekene/adaarh1.jpg"
    },

   {
        type: "image",
        src: "ekene/adaarh5.jpg"
    },

    {
        type: "image",
        src: "ekene/adaarh6.jpg"
    },

    {
        type: "image",
        src: "ekene/adaarh8.jpg"
    },

       {
        type: "image",
        src: "ekene/adaarh13.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh11.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh17.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh14.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh12.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh20.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh18.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh16.png"
    },
       {
        type: "image",
        src: "ekene/adaarh23.jpg"
    },
       {
        type: "image",
        src: "ekene/adaarh22.jpg"
    },

    {
        type: "video",
        src: "ekene/adaarhvid1.mp4"
    },


      {
        type: "video",
        src: "ekene/adaarhvid7.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid6.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid4.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid2.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid8.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid13.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid16.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid12.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid9.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid17.mp4"
    },
        {
        type: "video",
        src: "ekene/adaarhvid18.mp4"
    },
];


// ==========================================
// RANDOM
// ==========================================

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


// ==========================================
// CREATE MEMORY
// ==========================================

function createMemory() {

    const selected =
        memories[
            Math.floor(
                Math.random() *
                memories.length
            )
        ];


    const card =
        document.createElement("div");

    card.classList.add("memory");


    // --------------------------------------
    // Position
    // --------------------------------------

   const x = random(3, 72);
const y = random(12, 68);


    const width =
        window.innerWidth < 600
            ? random(125, 165)
            : random(180, 270);


    const rotation =
        random(-14, 14);


    // --------------------------------------
    // Random spawn direction
    // --------------------------------------

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


    card.style.left =
        `${x}%`;

    card.style.top =
        `${y}%`;

    card.style.width =
        `${width}px`;

    card.style.setProperty(
        "--rotation",
        `${rotation}deg`
    );


    // --------------------------------------
    // IMAGE
    // --------------------------------------

    if (selected.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            selected.src;

        image.alt =
            "Birthday memory";

        card.appendChild(image);

    }


    // --------------------------------------
    // VIDEO
    // --------------------------------------

 if (selected.type === "video") {
    const video = document.createElement("video");

    video.src = selected.src;

    // Autoplay settings
    video.autoplay = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    // Don't show controls on the floating memory
    video.controls = false;

    // Add to the card first
    card.appendChild(video);

    // Force the browser to attempt playback
    video.play().catch((error) => {
        console.log("Autoplay blocked:", error);
    });
}


    // --------------------------------------
    // Label
    // --------------------------------------

    const label =
        document.createElement("div");

    label.classList.add(
        "memory-label"
    );

    label.textContent =
        "A beautiful moment ✨";

    card.appendChild(label);


    // --------------------------------------
    // Click
    // --------------------------------------

    card.addEventListener(
        "click",
        () => {

            openLightbox(selected);

        }
    );


    container.appendChild(card);


    // --------------------------------------
    // Remove oldest
    // --------------------------------------

    const all =
        container.querySelectorAll(
            ".memory"
        );


    if (all.length > 10) {

        all[0].remove();

    }

}


// ==========================================
// LIGHTBOX
// ==========================================

function openLightbox(memory) {

    lightboxContent.innerHTML =
        "";


    if (memory.type === "image") {

        const image =
            document.createElement("img");

        image.src =
            memory.src;

        lightboxContent.appendChild(
            image
        );

    }


   if (memory.type === "video") {
    const video = document.createElement("video");

    video.src = memory.src;

    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;

    lightboxContent.appendChild(video);

    video.play().catch((error) => {
        console.log("Lightbox autoplay blocked:", error);
    });
}


    lightbox.classList.add(
        "active"
    );

}


function closeLightboxFunction() {

    lightbox.classList.remove(
        "active"
    );

    lightboxContent.innerHTML =
        "";

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


// ==========================================
// INITIAL MEMORIES
// ==========================================

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


// ==========================================
// CONTINUOUS SPAWNING
// ==========================================

const spawnInterval =
    setInterval(
        () => {

            createMemory();

        },
        3000
    );


// ==========================================
// CONTINUE
// ==========================================

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