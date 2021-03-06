export const $  = {
    find: function( element ) {
        const node = document.querySelector( element )
        if ( node ) {
            return node
        }
    },
    findAll: function( element ) {
        const htmlCollection = document.querySelectorAll( element )
        if ( htmlCollection && htmlCollection.length > 0 ) {
            return Array.from( htmlCollection )
        }
    },
    css: function ( element , styles ) {
        if ( element && styles  ) {
            Object.assign(element.style, styles)
        }
        if ( !element ) return false
    },
    log: function ( message ) {
        console.log( message )
    }
}


export function manageTabs() {
    let tabs = document.querySelector(".tabs");
    let tabHeader = tabs.querySelector(".tab-header");
    let tabBody = tabs.querySelector(".tab-body");
    let tabIndicator = tabs.querySelector(".tab-indicator");
    let tabHeaderNodes = tabs.querySelectorAll(".tab-header > div");
    let tabBodyNodes = tabs.querySelectorAll(".tab-body > div");

    for (let i = 0; i < tabHeaderNodes.length; i++) {

        tabHeaderNodes[i].addEventListener("click", () => {
            tabHeader.querySelector(".active").classList.remove("active");
            tabHeaderNodes[i].classList.add("active");
            tabBody.querySelector(".active").classList.remove("active");
            tabBodyNodes[i].classList.add("active");
            tabIndicator.style.left = `calc(25% * ${i})`;
        });
    }
} 



export const openInNewTab = url =>  { 
    if (url) {
        window.open( url, '_blank').focus()
    }
}

export const enableScroll = () => window.onscroll = function(){};
export const disableScroll = () => {
    // GET CURRENT SCROLL POSITION
    var x=window.scrollX;
    var y=window.scrollY;
    // FORCE SCROLL POSITION TO BE THE SAME WHEN SCROLLING 
    window.onscroll = (event) => { event.stopPropagation(); window.scrollTo(x, y) } 
}

export const manageScrollDuringAnimation = duration => {
    disableScroll()
    // SET TIMEOUT WHEN ANIMATION IS BEING PLAYED
    setTimeout(() => {
        enableScroll()
    }, duration || 800);
}


export const toggleOverflowDuringAnimation = duration => {

    document.body.style.height = "102vh"
    document.body.style.overflow = "hidden"
    
    setTimeout( () => {
        document.body.style.height = "100%"
        document.body.style.overflow = "visible"
    }, duration || 800)
}


export const _scrollTo = (element, offset = 0) => {
    let yPosition = element.getBoundingClientRect().y
    if ( typeof offset === "number" ) {
        offset && ( yPosition += offset )
    }
    window.scrollTo({
        top: yPosition,
        behavior: "smooth"
    })
}

export const setActiveMenuItem =  item => {
    const menuItems = $.findAll(".left-panel--items a")
    menuItems.forEach( item => item.classList.remove("active-item"))
    const current = $.find( `#${item}-link`)
    current.classList.add("active-item")
}

export const checkIfHomeSection = () => window.scrollY > 2 ? false : true

export const scrollFromHomePage = ( section ) => {
    _scrollTo( section )
    setTimeout( () => {
        gsap.to( window, { scrollTo: section, duration: 1  })
    }, 800)
} 

export const scrollToSection = section => {
    gsap.to( window, { scrollTo: section, duration: 1 })
}

