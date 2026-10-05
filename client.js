/* =========================================================
   STACKLY SPORT CLUB
   CLIENT DASHBOARD JAVASCRIPT
   MOBILE SIDEBAR + AOS + LOGIN EMAIL + PROFILE NAME
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });

    }



    /* =====================================================
       MOBILE SIDEBAR ELEMENTS
    ===================================================== */

    const clientSidebar =
        document.getElementById("clientSidebar");

    const clientMenuToggle =
        document.getElementById("clientMenuToggle");

    const clientSidebarClose =
        document.getElementById("clientSidebarClose");

    const clientSidebarOverlay =
        document.getElementById("clientSidebarOverlay");

    const clientNavLinks =
        document.querySelectorAll(
            ".stackly-sport-client-nav-link"
        );



    /* =====================================================
       OPEN SIDEBAR
    ===================================================== */

    function openClientSidebar() {

        if (!clientSidebar) return;


        clientSidebar.classList.add(
            "sidebar-open"
        );


        if (clientSidebarOverlay) {

            clientSidebarOverlay.classList.add(
                "overlay-active"
            );

        }


        document.body.classList.add(
            "client-sidebar-open"
        );


        if (clientMenuToggle) {

            clientMenuToggle.classList.add(
                "menu-active"
            );

            clientMenuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            clientMenuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );


            const icon =
                clientMenuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

        }

    }



    /* =====================================================
       CLOSE SIDEBAR
    ===================================================== */

    function closeClientSidebar() {

        if (!clientSidebar) return;


        clientSidebar.classList.remove(
            "sidebar-open"
        );


        if (clientSidebarOverlay) {

            clientSidebarOverlay.classList.remove(
                "overlay-active"
            );

        }


        document.body.classList.remove(
            "client-sidebar-open"
        );


        if (clientMenuToggle) {

            clientMenuToggle.classList.remove(
                "menu-active"
            );

            clientMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            clientMenuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );


            const icon =
                clientMenuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }



    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    if (clientMenuToggle) {

        clientMenuToggle.addEventListener(
            "click",
            () => {

                if (
                    clientSidebar &&
                    clientSidebar.classList.contains(
                        "sidebar-open"
                    )
                ) {

                    closeClientSidebar();

                } else {

                    openClientSidebar();

                }

            }
        );

    }



    /* =====================================================
       SIDEBAR CLOSE BUTTON
    ===================================================== */

    if (clientSidebarClose) {

        clientSidebarClose.addEventListener(
            "click",
            () => {

                closeClientSidebar();

            }
        );

    }



    /* =====================================================
       OVERLAY CLICK
    ===================================================== */

    if (clientSidebarOverlay) {

        clientSidebarOverlay.addEventListener(
            "click",
            () => {

                closeClientSidebar();

            }
        );

    }



    /* =====================================================
       CLOSE SIDEBAR WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    clientNavLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (window.innerWidth <= 900) {

                    closeClientSidebar();

                }

            }
        );

    });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeClientSidebar();

            }

        }
    );



    /* =====================================================
       CLOSE SIDEBAR ON DESKTOP RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 900) {

                closeClientSidebar();

            }

        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    clientNavLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .toLowerCase();


        if (linkPage === currentPage) {

            clientNavLinks.forEach((item) => {

                item.classList.remove(
                    "active"
                );

            });


            link.classList.add(
                "active"
            );

        }

    });



    /* =====================================================
       GET LOGGED-IN EMAIL
    ===================================================== */

    const storedEmail =
        localStorage.getItem("loginEmail");



    /* =====================================================
       DISPLAY LOGIN EMAIL IN HEADER
    ===================================================== */

    const clientEmailDisplay =
        document.getElementById(
            "clientEmailDisplay"
        );


    if (
        clientEmailDisplay &&
        storedEmail
    ) {

        clientEmailDisplay.textContent =
            storedEmail;

    }



    /* =====================================================
       DISPLAY EMAIL IN PROFILE
    ===================================================== */

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );


    if (
        profileEmail &&
        storedEmail
    ) {

        profileEmail.textContent =
            storedEmail;

    }



    /* =====================================================
       CREATE USER NAME FROM EMAIL
       
       Examples:
       
       arul@gmail.com
       → Arul
       
       arul.stefy@gmail.com
       → Arul Stefy
       
       john_doe@gmail.com
       → John Doe
       
       john-doe@gmail.com
       → John Doe
    ===================================================== */

    function getNameFromEmail(email) {

        if (!email) {

            return "Sport Member";

        }


        let namePart =
            email
                .split("@")[0]
                .replace(/[._-]+/g, " ")
                .trim();


        if (!namePart) {

            return "Sport Member";

        }


        const formattedName =
            namePart
                .split(/\s+/)
                .filter(Boolean)
                .map((word) => {

                    return (
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    );

                })
                .join(" ");


        return formattedName ||
               "Sport Member";

    }



    /* =====================================================
       GET USER NAME
    ===================================================== */

    const userName =
        getNameFromEmail(
            storedEmail
        );



    /* =====================================================
       DISPLAY NAME IN SIDEBAR
    ===================================================== */

    const clientSidebarName =
        document.getElementById(
            "clientSidebarName"
        );


    if (clientSidebarName) {

        clientSidebarName.textContent =
            userName;

    }



    /* =====================================================
       DISPLAY NAME IN PROFILE HERO
    ===================================================== */

    const profileMemberName =
        document.getElementById(
            "profileMemberName"
        );


    if (profileMemberName) {

        profileMemberName.textContent =
            userName;

    }



    /* =====================================================
       DISPLAY NAME IN PERSONAL INFORMATION
    ===================================================== */

    const profileFullName =
        document.getElementById(
            "profileFullName"
        );


    if (profileFullName) {

        profileFullName.textContent =
            userName;

    }



    /* =====================================================
       LOGOUT
    ===================================================== */

    const clientLogoutBtn =
        document.getElementById(
            "clientLogoutBtn"
        );


    if (clientLogoutBtn) {

        clientLogoutBtn.addEventListener(
            "click",
            () => {


                /* Remove login session */

                localStorage.removeItem(
                    "stacklySportLoggedIn"
                );


                /* Remove email */

                localStorage.removeItem(
                    "loginEmail"
                );


                /* Remove role */

                localStorage.removeItem(
                    "loginRole"
                );


                /* Remove optional name */

                localStorage.removeItem(
                    "loginName"
                );


                /* Remove remember session */

                localStorage.removeItem(
                    "stacklySportRemember"
                );


                /* Redirect */

                window.location.href =
                    "index.html";

            }
        );

    }



    /* =====================================================
       INITIAL SIDEBAR STATE
    ===================================================== */

    closeClientSidebar();

});