const celebrateBtn =
    document.getElementById("celebrateBtn");


celebrateBtn.addEventListener("click", () => {

    // Start the page transition

    document.body.classList.add(
        "page-exit"
    );


    // Go to memories page

    setTimeout(() => {

        window.location.href =
            "memories.html";

    }, 700);

});