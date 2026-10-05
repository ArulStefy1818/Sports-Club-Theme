/* =========================================================
   STACKLY SPORT CLUB
   ADMIN DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 850,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });

    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const adminSidebar =
        document.getElementById("sportAdminSidebar");

    const adminMenu =
        document.getElementById("sportAdminMenu");

    const adminClose =
        document.getElementById("sportAdminClose");

    const adminOverlay =
        document.getElementById("sportAdminOverlay");

    const adminEmail =
        document.getElementById("sportAdminEmail");

    const adminLogout =
        document.getElementById("sportAdminLogout");

    const notificationButton =
        document.querySelector(
            ".stackly-sport-admin-notification"
        );

    const profileButton =
        document.querySelector(
            ".stackly-sport-admin-profile-button"
        );

    const navLinks =
        document.querySelectorAll(
            ".stackly-sport-admin-nav-link"
        );

    const actionCards =
        document.querySelectorAll(
            ".stackly-sport-admin-action-card"
        );

    const primaryButtons =
        document.querySelectorAll(
            ".stackly-sport-admin-primary-btn"
        );


    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    function openAdminSidebar() {

        if (!adminSidebar || !adminOverlay) {
            return;
        }

        adminSidebar.classList.add("active");
        adminOverlay.classList.add("active");

        if (adminMenu) {
            adminMenu.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        document.body.classList.add(
            "admin-menu-open"
        );

    }


    function closeAdminSidebar() {

        if (!adminSidebar || !adminOverlay) {
            return;
        }

        adminSidebar.classList.remove("active");
        adminOverlay.classList.remove("active");

        if (adminMenu) {
            adminMenu.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.classList.remove(
            "admin-menu-open"
        );

    }


    /* =====================================================
       OPEN MOBILE MENU
    ===================================================== */

    if (adminMenu) {

        adminMenu.addEventListener("click", (event) => {

            event.preventDefault();

            openAdminSidebar();

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    if (adminClose) {

        adminClose.addEventListener("click", (event) => {

            event.preventDefault();

            closeAdminSidebar();

        });

    }


    /* =====================================================
       CLOSE USING OVERLAY
    ===================================================== */

    if (adminOverlay) {

        adminOverlay.addEventListener("click", () => {

            closeAdminSidebar();

        });

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeAdminSidebar();

        }

    });


    /* =====================================================
       CLOSE SIDEBAR AFTER NAVIGATION
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 850) {

                closeAdminSidebar();

            }

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "admin.html";


    navLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        link.classList.remove("active");


        if (linkPage === currentPage) {

            link.classList.add("active");

        }

    });


    /* =====================================================
       LOAD ADMIN EMAIL
    ===================================================== */

    function loadAdminEmail() {

        if (!adminEmail) {
            return;
        }


        const savedEmail =
            localStorage.getItem("loginEmail") ||
            localStorage.getItem("sportAdminEmail") ||
            localStorage.getItem("adminEmail") ||
            sessionStorage.getItem("loginEmail") ||
            sessionStorage.getItem("sportAdminEmail") ||
            sessionStorage.getItem("adminEmail");


        if (
            savedEmail &&
            savedEmail.trim() !== ""
        ) {

            adminEmail.textContent =
                savedEmail.trim();

        } else {

            adminEmail.textContent =
                "admin@stacklysport.com";

        }

    }


    loadAdminEmail();


    /* =====================================================
       UPDATE EMAIL WHEN STORAGE CHANGES
    ===================================================== */

    window.addEventListener("storage", (event) => {

        if (
            event.key === "loginEmail" ||
            event.key === "sportAdminEmail" ||
            event.key === "adminEmail"
        ) {

            loadAdminEmail();

        }

    });


    /* =====================================================
       NOTIFICATION BUTTON
    ===================================================== */

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            (event) => {

                /*
                 * Allow the parent <a> to navigate
                 * to 404-admin.html.
                 */

                notificationButton.classList.add(
                    "notification-active"
                );

            }
        );

    }


    /* =====================================================
       PROFILE BUTTON
    ===================================================== */

    if (profileButton) {

        profileButton.addEventListener(
            "click",
            () => {

                profileButton.classList.toggle(
                    "profile-active"
                );

            }
        );

    }


    /* =====================================================
       PRIMARY CREATE EVENT BUTTON
    ===================================================== */

    primaryButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            const href =
                button.getAttribute("href");

            if (!href) {
                return;
            }

            /*
             * Normal anchor navigation.
             */

            window.location.href = href;

        });

    });


    /* =====================================================
       QUICK ACTIONS
    ===================================================== */

    actionCards.forEach((card) => {

        /*
         * Make sure every quick-action card
         * navigates to its href.
         */

        card.addEventListener("click", (event) => {

            const href =
                card.getAttribute("href");

            if (!href) {
                return;
            }

            /*
             * Allow normal browser navigation.
             * Explicit navigation also makes the
             * behavior reliable on mobile.
             */

            event.preventDefault();

            window.location.href = href;

        });


        /* =================================================
           KEYBOARD ACCESSIBILITY
        ================================================= */

        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    const href =
                        card.getAttribute("href");

                    if (href) {

                        window.location.href =
                            href;

                    }

                }

            }
        );

    });


    /* =====================================================
       ALL ADMIN 404 LINKS
       Ensures links marked for admin placeholder
       navigate correctly.
    ===================================================== */

    const admin404Links =
        document.querySelectorAll(
            'a[href="404-admin.html"]'
        );


    admin404Links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            event.preventDefault();

            window.location.href = href;

        });

    });


    /* =====================================================
       LOGOUT
    ===================================================== */

    if (adminLogout) {

        adminLogout.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                /*
                 * Clear login information.
                 */

                localStorage.removeItem(
                    "loginEmail"
                );

                localStorage.removeItem(
                    "loginRole"
                );

                localStorage.removeItem(
                    "sportAdminEmail"
                );

                localStorage.removeItem(
                    "adminEmail"
                );


                sessionStorage.removeItem(
                    "loginEmail"
                );

                sessionStorage.removeItem(
                    "loginRole"
                );

                sessionStorage.removeItem(
                    "sportAdminEmail"
                );

                sessionStorage.removeItem(
                    "adminEmail"
                );

                sessionStorage.removeItem(
                    "stacklySportLoggedIn"
                );


                /*
                 * Close mobile menu.
                 */

                closeAdminSidebar();


                /*
                 * Redirect to home/login.
                 */

                window.location.href =
                    "index.html";

            }
        );

    }


    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            closeAdminSidebar();

        }

    });


    /* =====================================================
       BODY SCROLL CONTROL
    ===================================================== */

    const bodyStyle =
        document.createElement("style");


    bodyStyle.textContent = `

        body.admin-menu-open {
            overflow: hidden;
        }

        @media (min-width: 851px) {

            body.admin-menu-open {
                overflow: auto;
            }

        }

        .stackly-sport-admin-notification.notification-active {
            background: #efff35;
            color: #080a08;
        }

        .stackly-sport-admin-profile-button.profile-active {
            background: rgba(239, 255, 53, 0.15);
            color: #080a08;
        }

    `;


    document.head.appendChild(bodyStyle);


    /* =====================================================
       STAT CARD HOVER
    ===================================================== */

    const statCards =
        document.querySelectorAll(
            ".stackly-sport-admin-stat-card"
        );


    statCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.setProperty(
                    "--card-hover-scale",
                    "1"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.removeProperty(
                    "--card-hover-scale"
                );

            }
        );

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const footerText =
        document.querySelector(
            ".stackly-sport-admin-footer p"
        );


    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} Stackly Sport Club. All rights reserved.`;

    }


    /* =====================================================
       FIX INVALID NOTIFICATION STRUCTURE
       Clicking notification should navigate to
       404-admin.html.
    ===================================================== */

    if (notificationButton) {

        notificationButton.setAttribute(
            "type",
            "button"
        );

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "stackly-sport-admin-ready"
    );

});


/* =========================================================
   STACKLY SPORT CLUB
   ADMIN SETTINGS — TAB / SECTION SWITCHING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 850,
            once: true,
            offset: 70,
            easing: "ease-out-cubic"
        });
    }


    /* =====================================================
       SETTINGS PAGE
    ===================================================== */

    const settingsPage = document.querySelector(
        "#sport-settings"
    );

    if (!settingsPage) return;


    /* =====================================================
       SETTINGS MENU LINKS
    ===================================================== */

    const menuLinks = settingsPage.querySelectorAll(
        ".stackly-sport-settings-menu-link"
    );


    /* =====================================================
       SETTINGS SECTIONS
    ===================================================== */

    const settingSections = settingsPage.querySelectorAll(
        ".stackly-sport-setting-panel"
    );


    /* =====================================================
       SHOW SELECTED SECTION
    ===================================================== */

    function showSettingsSection(targetId, updateHash = true) {

        if (!targetId) return;

        const targetSection =
            settingsPage.querySelector(`#${targetId}`);

        if (!targetSection) return;


        /* ---------------------------------------------
           HIDE ALL SECTIONS
        --------------------------------------------- */

        settingSections.forEach((section) => {

            section.classList.remove(
                "stackly-sport-setting-panel-active"
            );

            section.style.display = "none";

        });


        /* ---------------------------------------------
           REMOVE ACTIVE FROM ALL MENU LINKS
        --------------------------------------------- */

        menuLinks.forEach((link) => {

            link.classList.remove("active");

        });


        /* ---------------------------------------------
           SHOW SELECTED SECTION
        --------------------------------------------- */

        targetSection.style.display = "block";

        targetSection.classList.add(
            "stackly-sport-setting-panel-active"
        );


        /* ---------------------------------------------
           FIND CORRESPONDING MENU LINK
        --------------------------------------------- */

        const activeLink =
            settingsPage.querySelector(
                `.stackly-sport-settings-menu-link[href="#${targetId}"]`
            );


        if (activeLink) {

            activeLink.classList.add("active");

        }


        /* ---------------------------------------------
           UPDATE URL HASH
        --------------------------------------------- */

        if (updateHash) {

            history.replaceState(
                null,
                "",
                `#${targetId}`
            );

        }


        /* ---------------------------------------------
           REFRESH AOS
        --------------------------------------------- */

        if (typeof AOS !== "undefined") {

            setTimeout(() => {

                AOS.refreshHard();

            }, 50);

        }


        /* ---------------------------------------------
           SCROLL CONTENT INTO VIEW
        --------------------------------------------- */

        const isMobile =
            window.innerWidth <= 900;


        if (isMobile) {

            const contentTop =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                90;


            window.scrollTo({
                top: contentTop,
                behavior: "smooth"
            });

        } else {

            const contentTop =
                targetSection.getBoundingClientRect().top +
                window.pageYOffset -
                105;


            window.scrollTo({
                top: contentTop,
                behavior: "smooth"
            });

        }

    }


    /* =====================================================
       MENU CLICK
    ===================================================== */

    menuLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");


            if (!href || !href.startsWith("#")) {
                return;
            }


            const targetId =
                href.substring(1);


            const targetSection =
                settingsPage.querySelector(
                    `#${targetId}`
                );


            if (!targetSection) {
                return;
            }


            event.preventDefault();


            /* -----------------------------------------
               SHOW SELECTED SETTINGS SECTION
            ----------------------------------------- */

            showSettingsSection(
                targetId,
                true
            );


            /* -----------------------------------------
               SMALL CLICK ANIMATION
            ----------------------------------------- */

            link.classList.add(
                "stackly-sport-settings-menu-clicked"
            );


            setTimeout(() => {

                link.classList.remove(
                    "stackly-sport-settings-menu-clicked"
                );

            }, 350);

        });

    });


    /* =====================================================
       INITIAL SECTION
    ===================================================== */

    function initializeSettingsSection() {

        const hash =
            window.location.hash;


        /* ---------------------------------------------
           IF HASH EXISTS
        --------------------------------------------- */

        if (hash) {

            const targetId =
                hash.substring(1);


            const targetSection =
                settingsPage.querySelector(
                    `#${targetId}`
                );


            if (targetSection) {

                showSettingsSection(
                    targetId,
                    false
                );

                return;

            }

        }


        /* ---------------------------------------------
           DEFAULT SECTION
           CLUB PREFERENCES
        --------------------------------------------- */

        showSettingsSection(
            "club-preferences",
            false
        );

    }


    initializeSettingsSection();


    /* =====================================================
       BROWSER BACK / FORWARD SUPPORT
    ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            const hash =
                window.location.hash;


            if (!hash) {

                showSettingsSection(
                    "club-preferences",
                    false
                );

                return;

            }


            const targetId =
                hash.substring(1);


            showSettingsSection(
                targetId,
                false
            );

        }
    );


    /* =====================================================
       CLUB PREFERENCE SAVE BUTTON
    ===================================================== */

    const saveButton =
        settingsPage.querySelector(
            ".stackly-sport-settings-save-btn"
        );


    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                if (
                    saveButton.classList.contains(
                        "stackly-sport-settings-saving"
                    )
                ) {
                    return;
                }


                const originalHTML =
                    saveButton.innerHTML;


                /* -----------------------------------------
                   LOADING
                ----------------------------------------- */

                saveButton.disabled = true;

                saveButton.classList.add(
                    "stackly-sport-settings-saving"
                );


                saveButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Saving Changes...
                `;


                /* -----------------------------------------
                   SAVE SIMULATION
                ----------------------------------------- */

                setTimeout(() => {

                    saveButton.classList.remove(
                        "stackly-sport-settings-saving"
                    );


                    saveButton.classList.add(
                        "stackly-sport-settings-saved"
                    );


                    saveButton.innerHTML = `
                        Changes Saved
                        <i class="fa-solid fa-check"></i>
                    `;


                    /* -------------------------------------
                       UPDATE STATUS
                    ------------------------------------- */

                    const statusText =
                        settingsPage.querySelector(
                            ".stackly-sport-settings-bottom h3"
                        );


                    if (statusText) {

                        statusText.textContent =
                            "Your club configuration is up to date.";

                    }


                    /* -------------------------------------
                       RESTORE BUTTON
                    ------------------------------------- */

                    setTimeout(() => {

                        saveButton.disabled = false;

                        saveButton.classList.remove(
                            "stackly-sport-settings-saved"
                        );

                        saveButton.innerHTML =
                            originalHTML;

                    }, 2200);


                }, 900);

            }
        );

    }


    /* =====================================================
       NOTIFICATION SWITCHES
    ===================================================== */

    const notificationRows =
        settingsPage.querySelectorAll(
            ".stackly-sport-settings-toggle-row"
        );


    notificationRows.forEach((row) => {

        const checkbox =
            row.querySelector(
                ".stackly-sport-switch input"
            );


        if (!checkbox) return;


        updateNotificationRow(
            row,
            checkbox
        );


        checkbox.addEventListener(
            "change",
            () => {

                updateNotificationRow(
                    row,
                    checkbox
                );


                if (checkbox.checked) {

                    showSettingsToast(
                        "Notification enabled"
                    );

                } else {

                    showSettingsToast(
                        "Notification disabled"
                    );

                }

            }
        );

    });


    function updateNotificationRow(
        row,
        checkbox
    ) {

        row.classList.toggle(
            "stackly-sport-toggle-enabled",
            checkbox.checked
        );

    }


    /* =====================================================
       TWO FACTOR AUTHENTICATION
    ===================================================== */

    const securitySection =
        settingsPage.querySelector(
            "#security-settings"
        );


    if (securitySection) {

        const twoFactorInput =
            securitySection.querySelector(
                ".stackly-sport-switch input"
            );


        if (twoFactorInput) {

            twoFactorInput.addEventListener(
                "change",
                () => {

                    if (twoFactorInput.checked) {

                        showSettingsToast(
                            "Two-factor authentication enabled"
                        );

                    } else {

                        showSettingsToast(
                            "Two-factor authentication disabled"
                        );

                    }

                }
            );

        }

    }


    /* =====================================================
       APPEARANCE OPTIONS
    ===================================================== */

    const appearanceOptions =
        settingsPage.querySelectorAll(
            ".stackly-sport-appearance-option"
        );


    appearanceOptions.forEach((option) => {

        option.setAttribute(
            "tabindex",
            "0"
        );


        option.addEventListener(
            "click",
            () => {

                setAppearanceOption(
                    option
                );

            }
        );


        option.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    setAppearanceOption(
                        option
                    );

                }

            }
        );

    });


    function setAppearanceOption(option) {

        appearanceOptions.forEach((item) => {

            item.classList.remove(
                "active"
            );

        });


        option.classList.add(
            "active"
        );


        const title =
            option.querySelector("strong");


        if (title) {

            showSettingsToast(
                `${title.textContent.trim()} selected`
            );

        }

    }


    /* =====================================================
       INPUT FOCUS
    ===================================================== */

    const settingInputs =
        settingsPage.querySelectorAll(
            ".stackly-sport-setting-input input, " +
            ".stackly-sport-setting-input select"
        );


    settingInputs.forEach((input) => {

        input.addEventListener(
            "focus",
            () => {

                const wrapper =
                    input.closest(
                        ".stackly-sport-setting-input"
                    );


                if (wrapper) {

                    wrapper.classList.add(
                        "stackly-sport-setting-input-focused"
                    );

                }

            }
        );


        input.addEventListener(
            "blur",
            () => {

                const wrapper =
                    input.closest(
                        ".stackly-sport-setting-input"
                    );


                if (wrapper) {

                    wrapper.classList.remove(
                        "stackly-sport-setting-input-focused"
                    );

                }

            }
        );

    });


    /* =====================================================
       RIPPLE EFFECT
    ===================================================== */

    const rippleElements =
        settingsPage.querySelectorAll(
            ".stackly-sport-settings-save-btn, " +
            ".stackly-sport-settings-dashboard-btn, " +
            ".stackly-sport-account-edit, " +
            ".stackly-sport-settings-menu-link"
        );


    rippleElements.forEach((element) => {

        element.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");


                ripple.className =
                    "stackly-sport-settings-ripple";


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;


                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${event.clientX - rect.left - size / 2}px`;


                ripple.style.top =
                    `${event.clientY - rect.top - size / 2}px`;


                this.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 650);

            }
        );

    });


    /* =====================================================
       TOAST FUNCTION
    ===================================================== */

    function showSettingsToast(message) {

        let toast =
            document.querySelector(
                ".stackly-sport-settings-toast"
            );


        if (!toast) {

            toast =
                document.createElement("div");


            toast.className =
                "stackly-sport-settings-toast";


            toast.innerHTML = `
                <span>
                    <i class="fa-solid fa-check"></i>
                </span>

                <strong></strong>
            `;


            document.body.appendChild(
                toast
            );

        }


        const toastText =
            toast.querySelector("strong");


        if (toastText) {

            toastText.textContent =
                message;

        }


        toast.classList.remove(
            "stackly-sport-settings-toast-show"
        );


        void toast.offsetWidth;


        toast.classList.add(
            "stackly-sport-settings-toast-show"
        );


        clearTimeout(
            toast.hideTimer
        );


        toast.hideTimer =
            setTimeout(() => {

                toast.classList.remove(
                    "stackly-sport-settings-toast-show"
                );

            }, 2500);

    }


    /* =====================================================
       SETTINGS PAGE READY
    ===================================================== */

    settingsPage.classList.add(
        "stackly-sport-settings-ready"
    );

});


/* =========================================================
   DYNAMIC ADMIN EMAIL
========================================================= */

function loadAdminEmail() {

    const savedEmail = (
        localStorage.getItem("loginEmail") ||
        sessionStorage.getItem("loginEmail") ||
        ""
    ).trim();

    const headerEmail = document.getElementById("sportAdminEmail");
    const accountEmail = document.getElementById("sportAccountEmail");

    const displayEmail = savedEmail || "admin@stacklysport.com";

    /* Header email */
    if (headerEmail) {
        headerEmail.textContent = displayEmail;
    }

    /* Account Settings email */
    if (accountEmail) {
        accountEmail.textContent = displayEmail;
    }
}

loadAdminEmail();