/* =========================================================
   STACKLY SPORT CLUB
   MAIN JAVASCRIPT
   Complete Website Functionality
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       ELEMENT SELECTORS
    ===================================================== */

    const sportHeader =
        document.getElementById("sportHeader");

    const sportNavigation =
        document.getElementById("sportNavigation");

    const sportMenuToggle =
        document.getElementById("sportMenuToggle");

    const sportMenuClose =
        document.getElementById("sportMenuClose");

    const sportOverlay =
        document.getElementById("sportOverlay");

    const sportNavLinks =
        document.querySelectorAll(
            ".stackly-sport-nav-links a"
        );

    const sportHero =
        document.querySelector(
            ".stackly-sport-hero"
        );

    const sportVideos =
        Array.from(
            document.querySelectorAll(
                ".stackly-sport-video"
            )
        );

    const sportVideoDots =
        document.querySelectorAll(
            ".stackly-sport-video-dot"
        );

    const sportSideNumber =
        document.querySelector(
            ".stackly-sport-side-number"
        );

    const mobileBreakpoint =
        window.matchMedia(
            "(max-width: 900px)"
        );

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    /* =====================================================
       AOS INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 900,
            once: true,
            offset: 80,
            easing: "ease-out-cubic",
            mirror: false,
            disable: false
        });

    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    let scrollTicking = false;


    function updateSportHeader() {

        if (!sportHeader) {
            return;
        }

        if (window.scrollY > 50) {

            sportHeader.classList.add("scrolled");

        } else {

            sportHeader.classList.remove("scrolled");

        }

        scrollTicking = false;

    }


    window.addEventListener(
        "scroll",
        function () {

            if (!scrollTicking) {

                window.requestAnimationFrame(
                    updateSportHeader
                );

                scrollTicking = true;

            }

        },
        {
            passive: true
        }
    );


    updateSportHeader();



    /* =====================================================
       MOBILE NAVIGATION
       WORKS WITH OR WITHOUT OVERLAY
    ===================================================== */

    if (
        sportNavigation &&
        sportMenuToggle
    ) {

        let menuOpen = false;

        let previousBodyOverflow = "";


        const focusableSelector = [
            "a[href]",
            "button:not([disabled])",
            "input:not([disabled])",
            "select:not([disabled])",
            "textarea:not([disabled])",
            "[tabindex]:not([tabindex='-1'])"
        ].join(",");


        /* =================================================
           UPDATE ACCESSIBILITY
        ================================================= */

        function updateMenuAccessibility() {

            if (mobileBreakpoint.matches) {

                sportNavigation.setAttribute(
                    "aria-hidden",
                    String(!menuOpen)
                );

            } else {

                sportNavigation.removeAttribute(
                    "aria-hidden"
                );

            }


            sportMenuToggle.setAttribute(
                "aria-expanded",
                String(menuOpen)
            );


            sportMenuToggle.setAttribute(
                "aria-label",
                menuOpen
                    ? "Close menu"
                    : "Open menu"
            );


            if (sportMenuClose) {

                sportMenuClose.setAttribute(
                    "aria-label",
                    "Close menu"
                );

            }

        }



        /* =================================================
           OPEN MOBILE MENU
        ================================================= */

        function openSportMenu() {

            if (!mobileBreakpoint.matches) {
                return;
            }

            if (menuOpen) {
                return;
            }


            menuOpen = true;


            previousBodyOverflow =
                document.body.style.overflow;


            document.body.style.overflow =
                "hidden";


            /* Navigation classes */

            sportNavigation.classList.add(
                "active",
                "open",
                "is-open"
            );


            /* Hamburger classes */

            sportMenuToggle.classList.add(
                "active",
                "is-active"
            );


            /* Optional overlay */

            if (sportOverlay) {

                sportOverlay.classList.add(
                    "active",
                    "open",
                    "is-active"
                );

            }


            /* Header state */

            if (sportHeader) {

                sportHeader.classList.add(
                    "menu-open"
                );

            }


            /* Body state */

            document.body.classList.add(
                "sport-menu-active"
            );


            updateMenuAccessibility();


            /* Focus close button */

            window.setTimeout(
                function () {

                    if (
                        menuOpen &&
                        sportMenuClose
                    ) {

                        sportMenuClose.focus();

                    }

                },
                150
            );

        }



        /* =================================================
           CLOSE MOBILE MENU
        ================================================= */

        function closeSportMenu(
            restoreFocus = false
        ) {

            if (!menuOpen) {
                return;
            }


            menuOpen = false;


            /* Navigation */

            sportNavigation.classList.remove(
                "active",
                "open",
                "is-open"
            );


            /* Hamburger */

            sportMenuToggle.classList.remove(
                "active",
                "is-active"
            );


            /* Optional overlay */

            if (sportOverlay) {

                sportOverlay.classList.remove(
                    "active",
                    "open",
                    "is-active"
                );

            }


            /* Header */

            if (sportHeader) {

                sportHeader.classList.remove(
                    "menu-open"
                );

            }


            /* Body */

            document.body.classList.remove(
                "sport-menu-active"
            );


            /* Restore scrolling */

            document.body.style.overflow =
                previousBodyOverflow;


            updateMenuAccessibility();


            /* Restore focus */

            if (
                restoreFocus &&
                mobileBreakpoint.matches
            ) {

                window.setTimeout(
                    function () {

                        sportMenuToggle.focus();

                    },
                    50
                );

            }

        }



        /* =================================================
           HAMBURGER BUTTON
        ================================================= */

        sportMenuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (menuOpen) {

                    closeSportMenu();

                } else {

                    openSportMenu();

                }

            }
        );



        /* =================================================
           CLOSE BUTTON
        ================================================= */

        if (sportMenuClose) {

            sportMenuClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    closeSportMenu(true);

                }
            );

        }



        /* =================================================
           OPTIONAL OVERLAY
        ================================================= */

        if (sportOverlay) {

            sportOverlay.addEventListener(
                "click",
                function () {

                    closeSportMenu(true);

                }
            );

        }



        /* =================================================
           CLOSE WHEN NAVIGATION LINK IS CLICKED
        ================================================= */

        sportNavLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        if (
                            mobileBreakpoint.matches
                        ) {

                            closeSportMenu();

                        }

                    }
                );

            }
        );



        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (!menuOpen) {
                    return;
                }


                if (
                    event.key === "Escape" ||
                    event.key === "Esc"
                ) {

                    event.preventDefault();

                    closeSportMenu(true);

                }

            }
        );



        /* =================================================
           KEYBOARD FOCUS TRAP
        ================================================= */

        sportNavigation.addEventListener(
            "keydown",
            function (event) {

                if (
                    !menuOpen ||
                    event.key !== "Tab"
                ) {

                    return;

                }


                const focusableElements =
                    Array.from(
                        sportNavigation.querySelectorAll(
                            focusableSelector
                        )
                    ).filter(
                        function (element) {

                            return (
                                element.getClientRects()
                                    .length > 0
                            );

                        }
                    );


                if (
                    !focusableElements.length
                ) {

                    return;

                }


                const firstElement =
                    focusableElements[0];

                const lastElement =
                    focusableElements[
                        focusableElements.length - 1
                    ];


                if (
                    event.shiftKey &&
                    document.activeElement ===
                        firstElement
                ) {

                    event.preventDefault();

                    lastElement.focus();

                }


                else if (
                    !event.shiftKey &&
                    document.activeElement ===
                        lastElement
                ) {

                    event.preventDefault();

                    firstElement.focus();

                }

            }
        );



        /* =================================================
           CLOSE WHEN CLICKING OUTSIDE
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (!menuOpen) {
                    return;
                }


                if (
                    sportHeader &&
                    sportHeader.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeSportMenu();

            }
        );



        /* =================================================
           RESPONSIVE MENU RESET
        ================================================= */

        function handleBreakpointChange() {

            if (!mobileBreakpoint.matches) {

                closeSportMenu();

            }

            updateMenuAccessibility();

        }


        if (
            mobileBreakpoint.addEventListener
        ) {

            mobileBreakpoint.addEventListener(
                "change",
                handleBreakpointChange
            );

        } else {

            mobileBreakpoint.addListener(
                handleBreakpointChange
            );

        }


        updateMenuAccessibility();

    }



    /* =====================================================
       HERO VIDEO SLIDER
       THREE BACKGROUND VIDEOS
    ===================================================== */

    if (sportVideos.length > 0) {

        let currentVideoIndex =
            sportVideos.findIndex(
                function (video) {

                    return video.classList.contains(
                        "active"
                    );

                }
            );


        if (currentVideoIndex < 0) {

            currentVideoIndex = 0;

        }


        let videoInterval = null;

        let heroIsVisible = true;

        const VIDEO_DURATION = 7000;



        /* =================================================
           PLAY VIDEO
        ================================================= */

        function playSportVideo(video) {

            if (!video) {
                return;
            }


            video.muted = true;

            video.playsInline = true;

            video.setAttribute(
                "playsinline",
                ""
            );

            video.setAttribute(
                "muted",
                ""
            );


            const playPromise =
                video.play();


            if (
                playPromise &&
                typeof playPromise.catch ===
                    "function"
            ) {

                playPromise.catch(
                    function () {

                        /*
                         Browser may block
                         autoplay. No error
                         needs to be shown.
                        */

                    }
                );

            }

        }



        /* =================================================
           UPDATE VIDEO DOTS
        ================================================= */

        function updateVideoDots(index) {

            sportVideoDots.forEach(
                function (dot, dotIndex) {

                    const isActive =
                        dotIndex === index;


                    dot.classList.toggle(
                        "active",
                        isActive
                    );


                    dot.setAttribute(
                        "aria-pressed",
                        String(isActive)
                    );

                }
            );

        }



        /* =================================================
           UPDATE SLIDE NUMBER
        ================================================= */

        function updateSlideNumber(index) {

            if (!sportSideNumber) {
                return;
            }


            const slideNumber =
                String(index + 1)
                    .padStart(2, "0");


            const totalSlides =
                String(sportVideos.length)
                    .padStart(2, "0");


            sportSideNumber.textContent =
                `${slideNumber} / ${totalSlides}`;

        }



        /* =================================================
           CHANGE VIDEO
        ================================================= */

        function showSportVideo(
            index,
            manual = false
        ) {

            if (!sportVideos.length) {
                return;
            }


            const nextIndex =
                (
                    index +
                    sportVideos.length
                ) %
                sportVideos.length;


            const previousVideo =
                sportVideos[
                    currentVideoIndex
                ];


            const nextVideo =
                sportVideos[
                    nextIndex
                ];


            if (!nextVideo) {
                return;
            }


            if (
                previousVideo &&
                previousVideo !== nextVideo
            ) {

                previousVideo.classList.remove(
                    "active"
                );

                previousVideo.pause();

            }


            currentVideoIndex =
                nextIndex;


            sportVideos.forEach(
                function (video, videoIndex) {

                    const isActive =
                        videoIndex ===
                        currentVideoIndex;


                    video.classList.toggle(
                        "active",
                        isActive
                    );


                    if (!isActive) {

                        video.pause();

                    }

                }
            );


            updateVideoDots(
                currentVideoIndex
            );


            updateSlideNumber(
                currentVideoIndex
            );


            if (
                !document.hidden &&
                heroIsVisible
            ) {

                playSportVideo(
                    nextVideo
                );

            }


            if (manual) {

                restartVideoTimer();

            }

        }



        /* =================================================
           VIDEO TIMER
        ================================================= */

        function stopVideoTimer() {

            if (
                videoInterval !== null
            ) {

                window.clearInterval(
                    videoInterval
                );

                videoInterval = null;

            }

        }



        function startVideoTimer() {

            stopVideoTimer();


            if (
                sportVideos.length < 2 ||
                reducedMotion.matches ||
                document.hidden ||
                !heroIsVisible
            ) {

                return;

            }


            videoInterval =
                window.setInterval(
                    function () {

                        showSportVideo(
                            currentVideoIndex + 1
                        );

                    },
                    VIDEO_DURATION
                );

        }



        function restartVideoTimer() {

            startVideoTimer();

        }



        /* =================================================
           VIDEO DOT CONTROLS
        ================================================= */

        sportVideoDots.forEach(
            function (dot) {

                dot.addEventListener(
                    "click",
                    function () {

                        const index =
                            Number(
                                dot.dataset.video
                            );


                        if (
                            Number.isInteger(
                                index
                            ) &&
                            index >= 0 &&
                            index <
                                sportVideos.length
                        ) {

                            showSportVideo(
                                index,
                                true
                            );

                        }

                    }
                );

            }
        );



        /* =================================================
           PAUSE WHEN TAB IS HIDDEN
        ================================================= */

        document.addEventListener(
            "visibilitychange",
            function () {

                if (document.hidden) {

                    stopVideoTimer();


                    sportVideos.forEach(
                        function (video) {

                            video.pause();

                        }
                    );

                }

                else if (heroIsVisible) {

                    const activeVideo =
                        sportVideos[
                            currentVideoIndex
                        ];


                    playSportVideo(
                        activeVideo
                    );


                    startVideoTimer();

                }

            }
        );



        /* =================================================
           PAUSE WHEN HERO IS OFF SCREEN
        ================================================= */

        if (
            "IntersectionObserver" in window &&
            sportHero
        ) {

            const heroObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                heroIsVisible =
                                    entry.isIntersecting;


                                if (
                                    !heroIsVisible
                                ) {

                                    stopVideoTimer();


                                    sportVideos.forEach(
                                        function (
                                            video
                                        ) {

                                            video.pause();

                                        }
                                    );

                                }

                                else if (
                                    !document.hidden
                                ) {

                                    playSportVideo(
                                        sportVideos[
                                            currentVideoIndex
                                        ]
                                    );


                                    startVideoTimer();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.05
                    }
                );


            heroObserver.observe(
                sportHero
            );

        }



        /* =================================================
           REDUCED MOTION
        ================================================= */

        function handleMotionPreference() {

            if (
                reducedMotion.matches
            ) {

                stopVideoTimer();

            }

            else {

                startVideoTimer();

            }

        }


        if (
            reducedMotion.addEventListener
        ) {

            reducedMotion.addEventListener(
                "change",
                handleMotionPreference
            );

        }

        else {

            reducedMotion.addListener(
                handleMotionPreference
            );

        }



        /* =================================================
           INITIALIZE VIDEO SLIDER
        ================================================= */

        sportVideos.forEach(
            function (video, index) {

                video.muted = true;

                video.playsInline = true;


                if (
                    index !==
                    currentVideoIndex
                ) {

                    video.pause();

                }

            }
        );


        showSportVideo(
            currentVideoIndex
        );


        startVideoTimer();

    }



    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() ||
        "index.html";


    sportNavLinks.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith(
                    "javascript:"
                )
            ) {

                return;

            }


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage ===
                currentPage
            ) {

                sportNavLinks.forEach(
                    function (navLink) {

                        navLink.classList.remove(
                            "active"
                        );


                        navLink.removeAttribute(
                            "aria-current"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );


                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }
    );



    /* =====================================================
       SMOOTH SCROLL
       SAME-PAGE ANCHORS
    ===================================================== */

    const internalAnchors =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalAnchors.forEach(
        function (anchor) {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    let targetElement = null;


                    try {

                        targetElement =
                            document.querySelector(
                                targetId
                            );

                    }

                    catch (error) {

                        return;

                    }


                    if (!targetElement) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        sportHeader
                            ? sportHeader
                                .getBoundingClientRect()
                                .height
                            : 0;


                    const targetPosition =
                        targetElement.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top: Math.max(
                            0,
                            targetPosition
                        ),

                        behavior:
                            reducedMotion.matches
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }
    );



    /* =====================================================
       FEATURE CARD REVEAL SUPPORT
    ===================================================== */

    const featureCards =
        document.querySelectorAll(
            ".stackly-sport-feature-card"
        );


    featureCards.forEach(
        function (card, index) {

            card.style.setProperty(
                "--sport-card-index",
                index
            );


            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "sport-feature-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "sport-feature-hover"
                    );

                }
            );

        }
    );



    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(
            ".testimonial-item"
        );


    const nextButtons =
        document.querySelectorAll(
            ".testimonial-next"
        );


    const prevButtons =
        document.querySelectorAll(
            ".testimonial-prev"
        );


    if (
        testimonials.length > 0
    ) {

        let currentTestimonialIndex = 0;


        /* -----------------------------------------------
           SHOW TESTIMONIAL
        ------------------------------------------------ */

        function showTestimonial(
            index
        ) {

            testimonials.forEach(
                function (
                    testimonial,
                    testimonialIndex
                ) {

                    testimonial.classList.toggle(
                        "active",
                        testimonialIndex ===
                            index
                    );

                }
            );

        }


        /* -----------------------------------------------
           INITIAL TESTIMONIAL
        ------------------------------------------------ */

        let existingActive =
            Array.from(
                testimonials
            ).findIndex(
                function (
                    testimonial
                ) {

                    return testimonial.classList.contains(
                        "active"
                    );

                }
            );


        if (
            existingActive >= 0
        ) {

            currentTestimonialIndex =
                existingActive;

        }


        showTestimonial(
            currentTestimonialIndex
        );


        /* -----------------------------------------------
           NEXT BUTTON
        ------------------------------------------------ */

        nextButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        currentTestimonialIndex++;


                        if (
                            currentTestimonialIndex >=
                            testimonials.length
                        ) {

                            currentTestimonialIndex =
                                0;

                        }


                        showTestimonial(
                            currentTestimonialIndex
                        );

                    }
                );

            }
        );


        /* -----------------------------------------------
           PREVIOUS BUTTON
        ------------------------------------------------ */

        prevButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        currentTestimonialIndex--;


                        if (
                            currentTestimonialIndex < 0
                        ) {

                            currentTestimonialIndex =
                                testimonials.length -
                                1;

                        }


                        showTestimonial(
                            currentTestimonialIndex
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       NEWSLETTER FORM
    ===================================================== */

    const newsletterForm =
        document.getElementById(
            "sportNewsletterForm"
        );


    const newsletterEmail =
        document.getElementById(
            "sportNewsletterEmail"
        );


    const newsletterMessage =
        document.getElementById(
            "sportNewsletterMessage"
        );


    if (
        newsletterForm &&
        newsletterEmail &&
        newsletterMessage
    ) {

        let messageTimer = null;


        /* -----------------------------------------------
           EMAIL REGEX
        ------------------------------------------------ */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;



        /* -----------------------------------------------
           SHOW NEWSLETTER MESSAGE
        ------------------------------------------------ */

        function showNewsletterMessage(
            message,
            type
        ) {

            newsletterMessage.textContent =
                message;


            newsletterMessage.className =
                "stackly-sport-newsletter-message";


            newsletterMessage.classList.add(
                type
            );


            clearTimeout(
                messageTimer
            );


            messageTimer =
                window.setTimeout(
                    function () {

                        newsletterMessage.textContent =
                            "";


                        newsletterMessage.className =
                            "stackly-sport-newsletter-message";

                    },
                    4000
                );

        }



        /* -----------------------------------------------
           NEWSLETTER SUBMIT
        ------------------------------------------------ */

        newsletterForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearTimeout(
                    messageTimer
                );


                const email =
                    newsletterEmail.value.trim();


                /* Empty */

                if (
                    email === ""
                ) {

                    showNewsletterMessage(
                        "Please enter your email address.",
                        "error"
                    );


                    newsletterEmail.focus();

                    return;

                }


                /* Invalid */

                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    showNewsletterMessage(
                        "Please enter a valid email address.",
                        "error"
                    );


                    newsletterEmail.focus();

                    return;

                }


                /* Success */

                showNewsletterMessage(
                    "Thank you for subscribing! Stay in the game.",
                    "success"
                );


                newsletterForm.reset();

            }
        );

    }



    /* =====================================================
       IMAGE LOADING SUPPORT
    ===================================================== */

    const lazyImages =
        document.querySelectorAll(
            "img[loading='lazy']"
        );


    lazyImages.forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.classList.add(
                        "image-load-error"
                    );

                }
            );

        }
    );



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backTopButton =
        document.querySelector(
            ".stackly-sport-back-top"
        );


    if (backTopButton) {

        backTopButton.addEventListener(
            "click",
            function (event) {

                const href =
                    backTopButton.getAttribute(
                        "href"
                    );


                /*
                 If the href points to
                 an existing page anchor,
                 allow normal navigation.
                */

                if (
                    href &&
                    href.startsWith("#")
                ) {

                    const target =
                        document.querySelector(
                            href
                        );


                    if (target) {

                        event.preventDefault();


                        const headerHeight =
                            sportHeader
                                ? sportHeader
                                    .getBoundingClientRect()
                                    .height
                                : 0;


                        const targetPosition =
                            target
                                .getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo({

                            top:
                                Math.max(
                                    0,
                                    targetPosition
                                ),

                            behavior:
                                reducedMotion.matches
                                    ? "auto"
                                    : "smooth"

                        });

                    }

                }

            }
        );

    }



    /* =====================================================
       PAGE READY
    ===================================================== */

    document.documentElement.classList.add(
        "sport-js-ready"
    );


    /* =====================================================
       WINDOW LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            if (
                typeof AOS !== "undefined"
            ) {

                AOS.refresh();

            }

        }
    );

});



/* =========================================================
   STACKLY SPORT CLUB
   CONTACT FORM VALIDATION & CUSTOM DROPDOWNS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("sportContactForm");
    const status = document.getElementById("sportContactStatus");

    if (!form || !status) return;

    const nameInput = document.getElementById("sportContactName");
    const emailInput = document.getElementById("sportContactEmail");
    const phoneInput = document.getElementById("sportContactPhone");
    const subjectInput = document.getElementById("sportContactSubject");
    const interestInput = document.getElementById("sportContactInterest");
    const messageInput = document.getElementById("sportContactMessage");
    const consentInput = document.getElementById("sportContactConsent");

    let statusTimer;

    /* =========================================
       CUSTOM DROPDOWN SETUP
    ========================================= */

    function setupDropdown(config) {
        const dropdown = document.getElementById(config.dropdown);
        if (!dropdown) return null;

        const trigger = document.getElementById(config.trigger);
        const menu = document.getElementById(config.menu);
        const display = document.getElementById(config.display);
        const hiddenInput = document.getElementById(config.input);
        const options = Array.from(
            menu.querySelectorAll(".stackly-sport-custom-option")
        );

        if (!trigger || !menu || !display || !hiddenInput) return null;

        function open() {
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
            menu.setAttribute("aria-hidden", "false");
        }

        function close(returnFocus = false) {
            dropdown.classList.remove("is-open");
            trigger.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-hidden", "true");

            if (returnFocus) trigger.focus();
        }

        function select(option) {
            const value = option.dataset.value;
            const label = option.querySelector("span").textContent.trim();

            hiddenInput.value = value;
            display.textContent = label;
            trigger.classList.add("has-value");

            options.forEach(item => {
                const selected = item === option;
                item.classList.toggle("is-selected", selected);
                item.setAttribute("aria-selected", String(selected));
            });

            close(true);
        }

        function reset() {
            hiddenInput.value = "";
            display.textContent = config.placeholder;
            trigger.classList.remove("has-value");

            options.forEach(option => {
                option.classList.remove("is-selected");
                option.setAttribute("aria-selected", "false");
            });

            close();
        }

        trigger.addEventListener("click", function () {
            dropdown.classList.contains("is-open") ? close() : open();
        });

        trigger.addEventListener("keydown", function (event) {
            if (["ArrowDown", "Enter", " "].includes(event.key)) {
                event.preventDefault();
                open();

                const selected = options.find(option =>
                    option.classList.contains("is-selected")
                );

                (selected || options[0])?.focus();
            }
        });

        options.forEach((option, index) => {
            option.setAttribute("aria-selected", "false");

            option.addEventListener("click", () => select(option));

            option.addEventListener("keydown", function (event) {
                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    options[(index + 1) % options.length].focus();
                }

                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    options[(index - 1 + options.length) % options.length].focus();
                }

                if (event.key === "Escape") {
                    event.preventDefault();
                    close(true);
                }

                if (event.key === "Tab") close();
            });
        });

        document.addEventListener("click", function (event) {
            if (!dropdown.contains(event.target)) close();
        });

        return { reset, close };
    }

    const subjectDropdown = setupDropdown({
        dropdown: "sportContactDropdown",
        trigger: "sportContactSubjectTrigger",
        menu: "sportContactSubjectMenu",
        display: "sportContactSubjectValue",
        input: "sportContactSubject",
        placeholder: "Select an enquiry"
    });

    const interestDropdown = setupDropdown({
        dropdown: "sportContactInterestDropdown",
        trigger: "sportContactInterestTrigger",
        menu: "sportContactInterestMenu",
        display: "sportContactInterestValue",
        input: "sportContactInterest",
        placeholder: "Choose your interest (optional)"
    });

    /* =========================================
       STATUS MESSAGE
    ========================================= */

    function showStatus(message, type) {
        clearTimeout(statusTimer);

        status.textContent = message;
        status.classList.remove("success", "error");
        status.classList.add(type);
        status.style.display = "block";

        if (type === "success") {
            statusTimer = setTimeout(() => {
                status.textContent = "";
                status.classList.remove("success");
                status.style.display = "none";
            }, 5000);
        }
    }

    function clearStatus() {
        clearTimeout(statusTimer);
        status.textContent = "";
        status.classList.remove("success", "error");
        status.style.display = "none";
    }

    /* =========================================
       VALIDATION
    ========================================= */

    function validateForm() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Name: letters, spaces, apostrophes and hyphens
        const namePattern = /^\p{L}+(?:[ '\u2019-]\p{L}+)*$/u;

        if (!name) {
            nameInput.focus();
            return "Please enter your full name.";
        }

        if (!namePattern.test(name)) {
            nameInput.focus();
            return "Name should contain only letters, spaces, apostrophes or hyphens.";
        }

        // Email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!email) {
            emailInput.focus();
            return "Please enter your email address.";
        }

        if (!emailPattern.test(email)) {
            emailInput.focus();
            return "Please enter a valid email address.";
        }

        // Exactly 10 digits
        const phoneDigits = phone.replace(/\D/g, "");

        if (!phone) {
            phoneInput.focus();
            return "Please enter your phone number.";
        }

        if (!/^\d{10}$/.test(phoneDigits) || !/^\d{10}$/.test(phone)) {
            phoneInput.focus();
            return "Please enter a valid 10-digit phone number without a country code.";
        }

        // Required custom dropdown
        if (!subject) {
            document.getElementById("sportContactSubjectTrigger")?.focus();
            return "Please select an enquiry type.";
        }

        // Message
        if (!message) {
            messageInput.focus();
            return "Please enter your message.";
        }

        if (message.length < 10) {
            messageInput.focus();
            return "Your message should contain at least 10 characters.";
        }

        // Consent
        if (!consentInput.checked) {
            consentInput.focus();
            return "Please agree to be contacted regarding your enquiry.";
        }

        return "";
    }

    /* =========================================
       FORM SUBMISSION
    ========================================= */

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        clearStatus();

        const errorMessage = validateForm();

        if (errorMessage) {
            showStatus(errorMessage, "error");
            return;
        }

        // Collect the validated form data.
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            subject: subjectInput.value,
            interest: interestInput.value,
            message: messageInput.value.trim(),
            consent: consentInput.checked
        };

        /*
          Front-end demonstration:
          This validates the form, but does not send data to a server.
          Connect a backend or form service here for real delivery.
        */

        console.log("Validated contact form:", formData);

        showStatus(
            "Thank you! Your message has been validated successfully.",
            "success"
        );

        // Clear all form fields and custom dropdown selections.
        form.reset();

        subjectDropdown?.reset();
        interestDropdown?.reset();
    });

    /* =========================================
       CLEAR OLD ERROR WHEN USER EDITS
    ========================================= */

    [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
        input.addEventListener("input", clearStatus);
    });

    consentInput.addEventListener("change", clearStatus);

    document.getElementById("sportContactSubjectTrigger")
        ?.addEventListener("click", clearStatus);

    document.getElementById("sportContactInterestTrigger")
        ?.addEventListener("click", clearStatus);

    status.style.display = "none";

});


/* =========================================================
   STACKLY SPORT CLUB
   CONTACT PAGE — FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const faqItems = document.querySelectorAll(
        ".stackly-sport-contact-faq-item"
    );

    if (!faqItems.length) return;


    /* =====================================================
       INITIAL FAQ STATE
    ===================================================== */

    faqItems.forEach((item) => {

        const button = item.querySelector(
            ".stackly-sport-contact-faq-question"
        );

        const answer = item.querySelector(
            ".stackly-sport-contact-faq-answer"
        );

        const icon = item.querySelector(
            ".stackly-sport-contact-faq-icon i"
        );

        if (!button || !answer) return;

        button.setAttribute("aria-expanded", "false");
        answer.setAttribute("aria-hidden", "true");

        if (icon) {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        }

    });


    /* =====================================================
       OPEN / CLOSE FAQ
    ===================================================== */

    faqItems.forEach((item) => {

        const button = item.querySelector(
            ".stackly-sport-contact-faq-question"
        );

        const answer = item.querySelector(
            ".stackly-sport-contact-faq-answer"
        );

        const icon = item.querySelector(
            ".stackly-sport-contact-faq-icon i"
        );

        if (!button || !answer) return;


        button.addEventListener("click", () => {

            const isOpen = item.classList.contains("active");


            /* =============================================
               CLOSE ALL FAQ ITEMS
            ============================================= */

            faqItems.forEach((otherItem) => {

                const otherButton = otherItem.querySelector(
                    ".stackly-sport-contact-faq-question"
                );

                const otherAnswer = otherItem.querySelector(
                    ".stackly-sport-contact-faq-answer"
                );

                const otherIcon = otherItem.querySelector(
                    ".stackly-sport-contact-faq-icon i"
                );


                otherItem.classList.remove("active");

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                }

                if (otherIcon) {
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }

            });


            /* =============================================
               OPEN SELECTED FAQ
            ============================================= */

            if (!isOpen) {

                item.classList.add("active");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.setAttribute(
                    "aria-hidden",
                    "false"
                );

                if (icon) {
                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");
                }

            }

        });

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

    faqItems.forEach((item) => {

        const button = item.querySelector(
            ".stackly-sport-contact-faq-question"
        );

        if (!button) return;


        button.addEventListener("keydown", (event) => {

            const currentIndex = Array.from(faqItems).indexOf(item);

            let nextIndex;


            /* Arrow Down */
            if (event.key === "ArrowDown") {

                event.preventDefault();

                nextIndex =
                    currentIndex + 1 < faqItems.length
                        ? currentIndex + 1
                        : 0;

                faqItems[nextIndex]
                    .querySelector(
                        ".stackly-sport-contact-faq-question"
                    )
                    .focus();
            }


            /* Arrow Up */
            if (event.key === "ArrowUp") {

                event.preventDefault();

                nextIndex =
                    currentIndex - 1 >= 0
                        ? currentIndex - 1
                        : faqItems.length - 1;

                faqItems[nextIndex]
                    .querySelector(
                        ".stackly-sport-contact-faq-question"
                    )
                    .focus();
            }


            /* Home */
            if (event.key === "Home") {

                event.preventDefault();

                faqItems[0]
                    .querySelector(
                        ".stackly-sport-contact-faq-question"
                    )
                    .focus();
            }


            /* End */
            if (event.key === "End") {

                event.preventDefault();

                faqItems[faqItems.length - 1]
                    .querySelector(
                        ".stackly-sport-contact-faq-question"
                    )
                    .focus();
            }

        });

    });


    /* =====================================================
       SMOOTH CTA SCROLL
    ===================================================== */

     

});

/* =========================================================
   STACKLY SPORT CLUB
   PREMIUM PAGE LOADER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const sportPageLoader =
        document.getElementById("sportPageLoader");

    const sportLoaderProgress =
        document.getElementById("sportLoaderProgress");

    const sportLoaderPercentage =
        document.getElementById("sportLoaderPercentage");

    const sportLoaderStatus =
        document.getElementById("sportLoaderStatus");


    if (!sportPageLoader) {
        return;
    }


    /* =====================================================
       LOADING STATUS MESSAGES
    ===================================================== */

    const loadingMessages = [
        "Preparing facilities...",
        "Setting up your training experience...",
        "Loading sports programs...",
        "Getting the club ready...",
        "Almost ready to perform..."
    ];


    let progress = 0;
    let messageIndex = 0;


    /* =====================================================
       UPDATE LOADING PROGRESS
    ===================================================== */

    const loaderInterval = setInterval(() => {

        progress += Math.floor(
            Math.random() * 4
        ) + 1;


        if (progress >= 100) {

            progress = 100;

        }


        if (sportLoaderProgress) {

            sportLoaderProgress.style.width =
                progress + "%";

        }


        if (sportLoaderPercentage) {

            sportLoaderPercentage.textContent =
                progress + "%";

        }


        /* Change loading message */

        if (
            progress % 20 < 4 &&
            messageIndex < loadingMessages.length
        ) {

            if (sportLoaderStatus) {

                sportLoaderStatus.textContent =
                    loadingMessages[messageIndex];

            }

            messageIndex++;

        }


        /* Finish loading */

        if (progress >= 100) {

            clearInterval(loaderInterval);

            if (sportLoaderStatus) {

                sportLoaderStatus.textContent =
                    "Welcome to Stackly Sport Club";

            }


            setTimeout(() => {

                sportPageLoader.classList.add(
                    "loader-hidden"
                );

                document.body.classList.remove(
                    "stackly-sport-loading"
                );

            }, 1500);

        }

    }, 55);

});