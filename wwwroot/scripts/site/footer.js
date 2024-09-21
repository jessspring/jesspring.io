{
    const linkNames = [
        "instagram",
        "discord",
        "spotify",
        "github",
    ];

    //Initialise clicked values to false
    linkNames.forEach(linkName => {
        const storageName = "achievement_footer_link_clicked_" + linkName;
        if (window.localStorage.getItem(storageName) == null) {
            window.localStorage.setItem(storageName, false);
        }
    });

    //Add click listeners to links
    window.addEventListener("load", () => {
        linkNames.forEach(linkName => {
            document.getElementById("footer-link-" + linkName)
                .addEventListener("auxclick", () => linkClicked(linkName));

            document.getElementById("footer-link-" + linkName)
                .addEventListener("click", () => linkClicked(linkName));
        });
    });

    function linkClicked(clickedLinkName) {
        //Set link to clicked
        window.localStorage.setItem("achievement_footer_link_clicked_" + clickedLinkName, true);

        for (let linkName of linkNames) {
            if (window.localStorage.getItem("achievement_footer_link_clicked_" + linkName) !== "true")
                return;
        }

        //All links are clicked
        unlockAchievement("number_one_fan");
    }
}
