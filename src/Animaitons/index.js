import { $, disableScroll, enableScroll, openInNewTab, manageScrollDuringAnimation, _scrollTo, setActiveMenuItem, checkIfHomeSection, scrollFromHomePage, scrollToSection} from '../helpers.js'
import { manageTabs } from '../helpers.js'



window.addEventListener("DOMContentLoaded", function() {
    
    
    window.onbeforeunload = () => window.scrollTo(0, 0);
    gsap.registerPlugin( ScrollTrigger, scrollTo )
    
    

    
    // GET DOM NODES 
    
    const burgerDiv = $.find('.navigation--burger')
    const rightMenuPanel = $.find(".right-panel")
    const buttonProject1 = $.find("#link--project1")
    const buttonProject2 = $.find("#link--project2")
    const buttonProject3 = $.find("#link--project3")
    const sectionsArray = $.findAll(".trigger")
    const triggerHomeSection = $.find("#home")
    const trigerAboutSection = $.find("#scroll-to--about")
    const triggerProjectsSection = $.find("#scroll-to--projects")
    const triggerContactSection = $.find("#scroll-to--contact")
    const menuLink_home = $.find("#home-link")
    const menuLink_projects = $.find("#projects-link")
    const menuLink_about = $.find("#about-link")
    const menuLink_contact = $.find("#contact-link")
    const homeSection = $.find("#home")
    const aboutSection = $.find("#about")
    const projectSection = $.find("#projects")
    const contactSection = $.find("#contact")
    const scrollTopButton = $.find("#scrollTop")
    
    // VARIABLES
    let isClickedMenu = false
    let isSmallScreen = false
    let isFirstAnimation = true
    let activeMenuColor = "#fff"
    const sections = [ homeSection, projectSection, aboutSection, contactSection ]
    const sections_triggers = [ menuLink_home, menuLink_projects, menuLink_about, menuLink_contact ]
    


    // Check for small screen     
    window.innerWidth < 769 && ( isSmallScreen = true )





    /** ------------------------------------------------------------------------ */

    //  Home page Scroll Trigger
    if ( !isSmallScreen ) {

        gsap.to("#home",{
            scrollTrigger: {
                trigger: "#home",
                start: "2px top",
                end: "+=5px",
                scrub: 1,
                onEnter: () => {
                    // DISABLE SCROLL
                    manageScrollDuringAnimation(500)
                    // 
                    gsap.to("#home", { x:"100%", ease: "power3.easeInOut", duration: 0.5 });
                    gsap.from(".intro--typo",{ x: "-120%", opacity: 0 })
                },
                onLeaveBack: () => {
                    //  DISABLE SCROLL
                    manageScrollDuringAnimation(500)  
                    // 
                    gsap.to("#home", { x:"0%", ease: "power3.easeInOut", duration: 0.5 })
                    gsap.from("#home-hero-typo", { opacity: 0 })
                }
            },
        })

        gsap.to( ".navigation", {
            scrollTrigger: {
                trigger: document.body,
                start: "bottom center",
                onEnter: () => alert("now")
            }
        })



    }


    /** ------------------------------------------------------------------------ */
    
    // SVG ANIMATION
    // SPARROW
    anime({ targets: "#sparrow path", strokeDashoffset: [ anime.setDashoffset, 0 ],duration: 1500, easing: "easeInQuad",})
        .play()


    /** ------------------------------------------------------------------------ */

    // LOAD IN ANIMATION ON HOME PAGE 
    isFirstAnimation && 
        gsap.from('.navigation', { y: "-100%", delay: 1.7 })
        gsap.from('#home-hero-typo h1', { x: 100, opacity: 0, delay: 1.8 })
        gsap.from('#home-hero-typo p', { x: 100, opacity: 0, delay: 1.8 })
        gsap.from("#home-hero > nav", { x: -100, opacity: 0, delay: 1.8 })
        gsap.from(".mouse-wrapper",{ opacity: 0, delay: 2 })


    /** ------------------------------------------------------------------------ */

    // BURGER ICON ANIMATION ON CLICK & MENU TOGGLING
    const animateBurgerIcon = () => {

        gsap.defaults({ duration: 0.3, ease: "power3.in"})
        isClickedMenu = !isClickedMenu
        // 
        isClickedMenu ? openMenu() : closeMenu()
    }


    const openMenu = () => {
        isClickedMenu = true
        gsap.to('#menu', { left: "100%", duration: 0.5, })
        gsap.to("#navigation--name", { opacity: 1, x: 0, delay: 0.2, })
        gsap.to("#burger-line-1", { x: 10, backgroundColor: "#111" })
        gsap.to("#burger-line-2", { x: 0, backgroundColor: "#111", width: 25 })
        gsap.to("#burger-line-3", { x: -10, backgroundColor: "#111" })
        disableScroll()
    }

    const closeMenu = () => {
        isClickedMenu = false
        gsap.to('#menu', { left: "0%", duration: 0.5, })
        gsap.to("#navigation--name", { opacity: 0, x: -10, delay: 0, })
        // gsap.to("#burger-line-1", { x: 0, backgroundColor: "#fff" })
        // gsap.to("#burger-line-2", {x: 0, backgroundColor: "#fff", width: 40 })
        // gsap.to("#burger-line-3", { x: 0, backgroundColor: "#fff" })
        gsap.to("#burger-line-1", { x: 0, backgroundColor: activeMenuColor })
        gsap.to("#burger-line-2", {x: 0, backgroundColor: activeMenuColor, width: 40 })
        gsap.to("#burger-line-3", { x: 0, backgroundColor: activeMenuColor })
        enableScroll()
    }

    manageTabs()


    /** ------------------------------------------------------------------------ */
    // EVENT LISTENERS

    burgerDiv.onclick = animateBurgerIcon
    rightMenuPanel.onclick = closeMenu

    buttonProject1.onclick = () => openInNewTab('https://catering-website.vercel.app')
    buttonProject2.onclick = () => openInNewTab('https://mans-hairdresser.netlify.app')
    buttonProject3.onclick = () => openInNewTab('https://google.com')


/* ----------------------------------------------------------------------------- */
// MENU ITEMS SCROLL TO SECTION ON CLICK
// FOR BIGGER SCREEN DEVICES


    if (!isSmallScreen) {
        sections_triggers.forEach( (section, index ) => {
            // ADD EVENT ON CLICK
            section.onclick = event => {
                // CHECK IF SECTION ISNT HOME WHICH HAS INDEX OF 0 
                if (index > 0) {
                    event.preventDefault()
                    // CHECKS IF EVENT WAS CALLED FROM HOMESCREEN 
                    if (checkIfHomeSection()) {
                        // CLOSE MENU AND AND SPECIAL METHOD HANDLING SCROLL FROM HOMESCREEN 
                        closeMenu()
                        scrollFromHomePage( sections[index])
                    }
                    else {
                        // OTHERWISE JUST CLOSE MNEU && SCROLL TO SECTION WITH GSAP SCROLL TO PLUGIN 
                        closeMenu()
                        scrollToSection( sections[index])
                    }
                }
                // IF EVENT WAS CALLED FROM HOMESCREEN HANDLE IT DIFFERENT WAY
                if (index === 0) {
                    event.preventDefault()
                    // CHECK IF MENU-HOME-LINK WAS CLICKED ON HOME SECTION 
                    // IF TRUE DONT PERFORM ANY ACTION AS ALREADY ON HOME SECTION
                    // ELSE PERFORM SCROLL
                    if (!checkIfHomeSection()){
                        closeMenu()
                        scrollToSection( 0)
                    }
                }
            }
        })
    }

// MENU ITEMS SCROLL TO SECTION ON CLICK
// FOR SMALLER SCREENS


    if ( isSmallScreen ) {
        sections_triggers.forEach( (section, index) => {
            section.onclick = ( event => {
                event.preventDefault()
                closeMenu()
                scrollToSection( sections[index] )
            })
        })
    }

/* ----------------------------------------------------------------------------- */
// HOMEPAGE MINI-MENU ITEMS
// SCROLL TO SECTION ON CLICK 
// TRIGGERS ONCLICK EVENT
// FOR BIGGER SCREEN DEVICES

    if (!isSmallScreen) {
        trigerAboutSection.onclick = event => {
            event.preventDefault()
            _scrollTo( aboutSection )
            setTimeout( () => {
                _scrollTo( aboutSection)
            }, 900)
        } 

        triggerProjectsSection.onclick = event => {
            event.preventDefault()
            _scrollTo( projectSection )
            setTimeout( () => {
                _scrollTo( projectSection )
            }, 900)
        }
        triggerContactSection.onclick = event => {
            event.preventDefault()
            _scrollTo( contactSection )
            setTimeout( () => {
                _scrollTo( contactSection )
            }, 900)
        }
    }

/* ----------------------------------------------------------------------------- */
// 
// 
// FOR SMALLER SCREEN DEVICES


    if ( isSmallScreen ) {
        trigerAboutSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 1, scrollTo: aboutSection})
        }
        triggerProjectsSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 0.5, scrollTo: projectSection})
        }
        triggerContactSection.onclick = event => {
            event.preventDefault()
            gsap.to( window, { duration: 1.2, scrollTo: contactSection})        }
    }

/* ----------------------------------------------------------------------------- */
// SCROLLTOP  BUTTON ADD EVENT LISTENER

    scrollTopButton.onclick = event => {
        event.preventDefault()
        if (!checkIfHomeSection()) {
            scrollToSection(0)
        }
    }



/* ----------------------------------------------------------------------------- */
// ANIMATING NAVIGATION BURGER & ICONS ON SCROLL
// FOR BIGGER DEVICES


    if ( !isSmallScreen ) {

        let t1 = gsap.timeline({ duration: 0, delay: 0.5})
        let t2 = gsap.timeline({ duration: 0, delay: 0, ease: 'power2'})
    
        ScrollTrigger.create({
            trigger: sectionsArray[0],
            start: "top top",
            onEnter: self => {
                 t1.to(".burger-line", { backgroundColor: "#fff" })
                 activeMenuColor = "#fff"
            }
        })
        ScrollTrigger.create({
            trigger: sectionsArray[1],
            start: "-20px top",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000" })
                t2.to(".navicon", {fill: "#000" })
                activeMenuColor = "#000"
                setActiveMenuItem("projects")
            },
            onLeaveBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
                activeMenuColor = "#fff"
                setActiveMenuItem('home')
            }
        })
        ScrollTrigger.create({
            trigger: sectionsArray[2],
            start: "-35px top",
            onEnter: self =>  { t1.to(".burger-line", { backgroundColor: "#fff"}); activeMenuColor = "#fff";setActiveMenuItem('about')},
            onLeaveBack: self => { t1.to(".burger-line", { backgroundColor: "#000"}); activeMenuColor = "#000";setActiveMenuItem('projects')}
        })
        ScrollTrigger.create({
            trigger: '.trigger--wave',
            start: "50px top",
            onEnter: self => t2.to(".navicon", { fill: "#fff"}),
            onLeaveBack: self => t1.to(".navicon", { fill: "#000"})
        })
        ScrollTrigger.create({
            trigger: sectionsArray[3],
            start: "-30px top",
            onEnter: self => {
                t1.to(".burger-line", { backgroundColor: "#000"})
                t2.to(".navicon", { fill: "#000"})
                activeMenuColor = "#000"
                setActiveMenuItem('contact')
            },
            onLeaveBack: self => {
                t1.to(".burger-line", { backgroundColor: "#fff"})
                t2.to(".navicon", { fill: "#fff"})
                activeMenuColor = "#fff"
                setActiveMenuItem('about')
            }
        })
    }


})