const flyer =
    document.getElementById(
        "birthdayFlyer"
    );


flyer.addEventListener(
    "click",
    () => {

        flyer.classList.toggle(
            "flyer-focus"
        );

    }
);