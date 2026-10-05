
/* =========================================================
   STACKLY SPORT CLUB
   LOGIN / SIGNUP JAVASCRIPT
   DIRECT LOGIN VERSION
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
       STORAGE KEYS
    ===================================================== */

    const LOGIN_EMAIL_KEY = "loginEmail";
    const LOGIN_ROLE_KEY = "loginRole";
    const LOGIN_STATE_KEY = "stacklySportLoggedIn";
    const REMEMBER_KEY = "stacklySportRemember";


    /* =====================================================
       DOM ELEMENTS
    ===================================================== */

    const loginTab =
        document.getElementById("sportLoginTab");

    const signupTab =
        document.getElementById("sportSignupTab");

    const loginForm =
        document.getElementById("sportLoginForm");

    const signupForm =
        document.getElementById("sportSignupForm");

    const loginStatus =
        document.getElementById("sportLoginStatus");

    const signupStatus =
        document.getElementById("sportSignupStatus");

    const authTitle =
        document.getElementById("sportAuthTitle");

    const authSubtitle =
        document.getElementById("sportAuthSubtitle");

    const goSignup =
        document.getElementById("sportGoSignup");

    const goLogin =
        document.getElementById("sportGoLogin");


    /* =====================================================
       CUSTOM DROPDOWNS
    ===================================================== */

    const dropdowns = [
        {
            wrapper: document.getElementById(
                "sportLoginRoleDropdown"
            ),

            trigger: document.getElementById(
                "sportLoginRoleTrigger"
            ),

            menu: document.getElementById(
                "sportLoginRoleMenu"
            ),

            valueDisplay: document.getElementById(
                "sportLoginRoleValue"
            ),

            hiddenInput: document.getElementById(
                "sportLoginRole"
            )
        },

        {
            wrapper: document.getElementById(
                "sportSignupRoleDropdown"
            ),

            trigger: document.getElementById(
                "sportSignupRoleTrigger"
            ),

            menu: document.getElementById(
                "sportSignupRoleMenu"
            ),

            valueDisplay: document.getElementById(
                "sportSignupRoleValue"
            ),

            hiddenInput: document.getElementById(
                "sportSignupRole"
            )
        }
    ];


    /* =====================================================
       DEFAULT ROLE ICON
    ===================================================== */

    const DEFAULT_ROLE_ICON = "fa-user-shield";


    /* =====================================================
       SHOW STATUS
    ===================================================== */

    function showStatus(
        element,
        message,
        type = "error"
    ) {

        if (!element) return;

        element.textContent = message;

        element.className =
            "stackly-sport-auth-status " +
            type;

        element.style.display = "block";
    }


    /* =====================================================
       CLEAR STATUS
    ===================================================== */

    function clearStatus(element) {

        if (!element) return;

        element.textContent = "";

        element.className =
            "stackly-sport-auth-status";

        element.style.display = "none";
    }


    /* =====================================================
       CUSTOM DROPDOWN SETUP
    ===================================================== */

    dropdowns.forEach(dropdown => {

        if (
            !dropdown.wrapper ||
            !dropdown.trigger ||
            !dropdown.menu
        ) {
            return;
        }


        const options =
            dropdown.menu.querySelectorAll(
                ".stackly-sport-auth-select-option"
            );


        /* =================================================
           OPEN / CLOSE DROPDOWN
        ================================================= */

        dropdown.trigger.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isOpen =
                    dropdown.wrapper.classList.contains(
                        "is-open"
                    );


                /* Close all other dropdowns */

                dropdowns.forEach(other => {

                    if (
                        other.wrapper &&
                        other.wrapper !== dropdown.wrapper
                    ) {

                        other.wrapper.classList.remove(
                            "is-open"
                        );

                        other.trigger?.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                });


                /* Toggle current dropdown */

                dropdown.wrapper.classList.toggle(
                    "is-open",
                    !isOpen
                );

                dropdown.trigger.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

            }
        );


        /* =================================================
           OPTION SELECTION
        ================================================= */

        options.forEach(option => {

            option.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    const value =
                        option.dataset.value || "";

                    const strong =
                        option.querySelector("strong");

                    const selectedText =
                        strong
                            ? strong.textContent.trim()
                            : option.textContent.trim();


                    /* Save selected role */

                    if (dropdown.hiddenInput) {

                        dropdown.hiddenInput.value =
                            value;
                    }


                    /* Update visible value */

                    if (dropdown.valueDisplay) {

                        dropdown.valueDisplay.textContent =
                            selectedText;
                    }


                    /* Selected state */

                    options.forEach(item => {

                        item.classList.remove(
                            "selected"
                        );

                        item.setAttribute(
                            "aria-selected",
                            "false"
                        );

                    });


                    option.classList.add(
                        "selected"
                    );

                    option.setAttribute(
                        "aria-selected",
                        "true"
                    );


                    /* Update trigger icon */

                    const optionIcon =
                        option.querySelector(
                            ".stackly-sport-auth-option-icon i"
                        );

                    const triggerIcon =
                        dropdown.trigger.querySelector(
                            ".stackly-sport-auth-select-icon i"
                        );


                    if (
                        optionIcon &&
                        triggerIcon
                    ) {

                        triggerIcon.className =
                            optionIcon.className;
                    }


                    /* Close dropdown */

                    dropdown.wrapper.classList.remove(
                        "is-open"
                    );

                    dropdown.trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    /* Remove dropdown error */

                    dropdown.wrapper.classList.remove(
                        "has-error"
                    );


                    /* Clear related status */

                    const form =
                        option.closest(
                            ".stackly-sport-auth-form"
                        );


                    if (
                        form?.id ===
                        "sportLoginForm"
                    ) {

                        clearStatus(
                            loginStatus
                        );

                    } else if (
                        form?.id ===
                        "sportSignupForm"
                    ) {

                        clearStatus(
                            signupStatus
                        );
                    }

                }
            );

        });


        /* =================================================
           KEYBOARD SUPPORT
        ================================================= */

        dropdown.trigger.addEventListener(
            "keydown",
            event => {

                const keyboardOptions =
                    Array.from(
                        dropdown.menu.querySelectorAll(
                            ".stackly-sport-auth-select-option"
                        )
                    );


                /* Enter / Space */

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    dropdown.trigger.click();
                }


                /* Escape */

                if (
                    event.key === "Escape"
                ) {

                    dropdown.wrapper.classList.remove(
                        "is-open"
                    );

                    dropdown.trigger.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }


                /* Arrow Down */

                if (
                    event.key === "ArrowDown" &&
                    dropdown.wrapper.classList.contains(
                        "is-open"
                    )
                ) {

                    event.preventDefault();

                    if (keyboardOptions.length) {

                        keyboardOptions[0].focus();
                    }
                }

            }
        );

    });


    /* =====================================================
       CLOSE DROPDOWNS OUTSIDE CLICK
    ===================================================== */

    document.addEventListener(
        "click",
        () => {

            dropdowns.forEach(dropdown => {

                if (!dropdown.wrapper) {
                    return;
                }

                dropdown.wrapper.classList.remove(
                    "is-open"
                );

                dropdown.trigger?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        }
    );


    /* =====================================================
       PASSWORD EYE TOGGLE
    ===================================================== */

    const passwordToggles =
        document.querySelectorAll(
            "[data-password-toggle]"
        );


    passwordToggles.forEach(toggle => {

        toggle.addEventListener(
            "click",
            () => {

                const inputId =
                    toggle.dataset.passwordToggle;

                const input =
                    document.getElementById(
                        inputId
                    );

                const icon =
                    toggle.querySelector("i");


                if (!input) {
                    return;
                }


                if (
                    input.type === "password"
                ) {

                    input.type = "text";

                    toggle.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );
                    }

                } else {

                    input.type = "password";

                    toggle.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    if (icon) {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );
                    }
                }

            }
        );

    });


    /* =====================================================
       AUTH FORM SWITCH
    ===================================================== */

    function switchToLogin() {

        clearStatus(loginStatus);
        clearStatus(signupStatus);


        loginTab?.classList.add("active");
        signupTab?.classList.remove("active");


        loginTab?.setAttribute(
            "aria-selected",
            "true"
        );

        signupTab?.setAttribute(
            "aria-selected",
            "false"
        );


        loginForm?.classList.add("active");
        signupForm?.classList.remove("active");


        if (authTitle) {

            authTitle.innerHTML =
                'Welcome <span>Back.</span>';
        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Sign in to continue your Stackly Sport Club journey.";
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function switchToSignup() {

        clearStatus(loginStatus);
        clearStatus(signupStatus);


        loginTab?.classList.remove("active");
        signupTab?.classList.add("active");


        loginTab?.setAttribute(
            "aria-selected",
            "false"
        );

        signupTab?.setAttribute(
            "aria-selected",
            "true"
        );


        loginForm?.classList.remove("active");
        signupForm?.classList.add("active");


        if (authTitle) {

            authTitle.innerHTML =
                'Create <span>Account.</span>';
        }


        if (authSubtitle) {

            authSubtitle.textContent =
                "Join Stackly Sport Club and start your fitness journey.";
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =====================================================
       TAB EVENTS
    ===================================================== */

    loginTab?.addEventListener(
        "click",
        switchToLogin
    );


    signupTab?.addEventListener(
        "click",
        switchToSignup
    );


    goSignup?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            switchToSignup();

        }
    );


    goLogin?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            switchToLogin();

        }
    );


    /* =====================================================
       LOGIN ELEMENTS
    ===================================================== */

    const loginRole =
        document.getElementById(
            "sportLoginRole"
        );

    const loginEmail =
        document.getElementById(
            "sportLoginEmail"
        );

    const loginPassword =
        document.getElementById(
            "sportLoginPassword"
        );

    const rememberMe =
        document.getElementById(
            "sportRememberMe"
        );


    /* =====================================================
       SIGNUP ELEMENTS
    ===================================================== */

    const signupName =
        document.getElementById(
            "sportSignupName"
        );

    const signupEmail =
        document.getElementById(
            "sportSignupEmail"
        );

    const signupRole =
        document.getElementById(
            "sportSignupRole"
        );

    const signupPassword =
        document.getElementById(
            "sportSignupPassword"
        );

    const signupConfirmPassword =
        document.getElementById(
            "sportSignupConfirmPassword"
        );


    /* =====================================================
       DIRECT LOGIN
       
       NO SIGNUP ACCOUNT CHECK
       NO USER STORAGE CHECK
       NO PASSWORD MATCH CHECK
       
       User can login directly with:
       - Any email
       - Any password
       - Selected role
    ===================================================== */

    loginForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            clearStatus(loginStatus);


            /* Get values */

            const role =
                loginRole?.value
                    .trim()
                    .toLowerCase() || "";

            const email =
                loginEmail?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                loginPassword?.value || "";


            /* =================================================
               ONLY BASIC EMPTY-FIELD CHECK
            ================================================= */

            if (!role) {

                showStatus(
                    loginStatus,
                    "Please select your account role.",
                    "error"
                );

                document
                    .getElementById(
                        "sportLoginRoleDropdown"
                    )
                    ?.classList.add(
                        "has-error"
                    );

                return;
            }


            if (!email) {

                showStatus(
                    loginStatus,
                    "Please enter your email address.",
                    "error"
                );

                loginEmail?.focus();

                return;
            }


            if (!password) {

                showStatus(
                    loginStatus,
                    "Please enter your password.",
                    "error"
                );

                loginPassword?.focus();

                return;
            }


            /* =================================================
               DIRECT LOGIN SESSION
               
               IMPORTANT:
               No signup validation is performed.
               No localStorage user lookup is performed.
            ================================================= */

            localStorage.setItem(
                LOGIN_EMAIL_KEY,
                email
            );

            localStorage.setItem(
                LOGIN_ROLE_KEY,
                role
            );

            localStorage.setItem(
                LOGIN_STATE_KEY,
                "true"
            );


            /* =================================================
               REMEMBER ME
            ================================================= */

            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    REMEMBER_KEY,
                    "true"
                );

            } else {

                localStorage.removeItem(
                    REMEMBER_KEY
                );

            }


            /* =================================================
               SUCCESS
            ================================================= */

            showStatus(
                loginStatus,
                "Login successful. Redirecting...",
                "success"
            );


            /* =================================================
               ROLE REDIRECT
            ================================================= */

            setTimeout(() => {

                if (role === "admin") {

                    window.location.href =
                        "admin.html";

                    return;
                }


                if (role === "client") {

                    window.location.href =
                        "client.html";

                    return;
                }


                /* Fallback */

                window.location.href =
                    "index.html";

            }, 500);

        }
    );


    /* =====================================================
       SIGNUP SUBMIT
       
       Signup simply creates a session and redirects.
       No validation.
       No duplicate check.
       No email validation.
       No password validation.
    ===================================================== */

    signupForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            clearStatus(signupStatus);


            /* Get values */

            const name =
                signupName?.value.trim() || "";

            const email =
                signupEmail?.value
                    .trim()
                    .toLowerCase() || "";

            const role =
                signupRole?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                signupPassword?.value || "";

            const confirmPassword =
                signupConfirmPassword?.value || "";


            /* =================================================
               DIRECT SIGNUP LOGIN
            ================================================= */

            localStorage.setItem(
                LOGIN_EMAIL_KEY,
                email
            );

            localStorage.setItem(
                LOGIN_ROLE_KEY,
                role
            );

            localStorage.setItem(
                LOGIN_STATE_KEY,
                "true"
            );


            /* Always remember signup session */

            localStorage.setItem(
                REMEMBER_KEY,
                "true"
            );


            /* =================================================
               SUCCESS MESSAGE
            ================================================= */

            showStatus(
                signupStatus,
                "Account created. Logging you in...",
                "success"
            );


            /* =================================================
               ROLE REDIRECT
            ================================================= */

            setTimeout(() => {

                if (role === "admin") {

                    window.location.href =
                        "admin.html";

                    return;
                }


                if (role === "client") {

                    window.location.href =
                        "client.html";

                    return;
                }


                /* If no role is selected */

                window.location.href =
                    "index.html";

            }, 500);

        }
    );


    /* =====================================================
       RESET CUSTOM DROPDOWN
    ===================================================== */

    function resetDropdown(
        wrapper,
        trigger,
        valueDisplay,
        hiddenInput
    ) {

        if (!wrapper) return;


        wrapper.classList.remove(
            "is-open",
            "has-error"
        );


        if (trigger) {

            trigger.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        if (valueDisplay) {

            valueDisplay.textContent =
                "Select Role";
        }


        if (hiddenInput) {

            hiddenInput.value = "";
        }


        const options =
            wrapper.querySelectorAll(
                ".stackly-sport-auth-select-option"
            );


        options.forEach(option => {

            option.classList.remove(
                "selected"
            );

            option.setAttribute(
                "aria-selected",
                "false"
            );

        });


        const triggerIcon =
            trigger?.querySelector(
                ".stackly-sport-auth-select-icon i"
            );


        if (triggerIcon) {

            triggerIcon.className =
                `fa-solid ${DEFAULT_ROLE_ICON}`;
        }

    }


    /* =====================================================
       CLEAR STATUS WHEN USER TYPES
    ===================================================== */

    const allInputs =
        document.querySelectorAll(
            ".stackly-sport-auth-form input"
        );


    allInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                if (
                    input.closest(
                        "#sportLoginForm"
                    )
                ) {

                    clearStatus(
                        loginStatus
                    );
                }


                if (
                    input.closest(
                        "#sportSignupForm"
                    )
                ) {

                    clearStatus(
                        signupStatus
                    );
                }

            }
        );

    });


    /* =====================================================
       REMOVE DROPDOWN ERROR ON SELECTION
    ===================================================== */

    document
        .querySelectorAll(
            ".stackly-sport-auth-select-option"
        )
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const wrapper =
                        option.closest(
                            ".stackly-sport-auth-custom-select"
                        );


                    wrapper?.classList.remove(
                        "has-error"
                    );


                    const form =
                        option.closest(
                            ".stackly-sport-auth-form"
                        );


                    if (
                        form?.id ===
                        "sportLoginForm"
                    ) {

                        clearStatus(
                            loginStatus
                        );

                    } else if (
                        form?.id ===
                        "sportSignupForm"
                    ) {

                        clearStatus(
                            signupStatus
                        );
                    }

                }
            );

        });


    /* =====================================================
       LOAD REMEMBERED EMAIL
    ===================================================== */

    const savedRemember =
        localStorage.getItem(
            REMEMBER_KEY
        );

    const savedEmail =
        localStorage.getItem(
            LOGIN_EMAIL_KEY
        );


    if (
        savedRemember === "true" &&
        savedEmail
    ) {

        if (loginEmail) {

            loginEmail.value =
                savedEmail;
        }


        if (rememberMe) {

            rememberMe.checked =
                true;
        }

    }

});
 