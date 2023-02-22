'use strict';


const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const person_icon = document.querySelector('.person_icon')
const modal = document.querySelector('.modal');
const logo = document.querySelector('.logo');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const body = document.querySelector('body');

const tabs = document.querySelectorAll(' .operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content')
const nav =document.querySelector('.nav')


const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////





// Modal window

const openModal = (e)=> {
    console.log('prevent')
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = ()=> {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=> btn.addEventListener('click', openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//////////////////////////////////////////////////////////
// Smooth Scrolling

btnScrollTo.addEventListener('click', e=>{
    const s1coords = section1.getBoundingClientRect();

    window.scrollTo(
        s1coords.left + window.pageXOffset,
         s1coords.top + window.pageYOffset 
         );

        //  old way of scrolling
//     window.scrollTo({
//        left: s1coords.left + window.pageXOffset,
//        top: s1coords.top + window.pageYOffset,
//        behavior:'smooth'
// });
})

////////////////////////////////////////Event DElegation on Smooth Scroll///////////////////////////////////////////////////////


// Event DElegation
// 1. Add event Listener to common parent element
// 2.Determine what element originated event

document.querySelector('.nav__links').addEventListener('click', e => {
    // console.log(e.target)
    e.preventDefault()
    // matching strategy : this is use to match only the element the is needed e.g nav__link
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href')

        document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
    }
})



////////////////////////////////////////Dom Traversing///////////////////////////////////////////////////////


// MENU ANIMATION

// opposite of mouseOver is mouseOut and mouseEnter is mounseLeave 

const handleHover =(e,opacity)=>{

    if (e.target.classList.contains('nav__link')) {

        const link = e.target;

        // to get the siblings we tranverse from the parent to the siblings

        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');
        // changing the opscity of the siblings if not the targeted link
        siblings.forEach(el => {

            if (el !== link) el.style.opacity =opacity;

        });

        logo.style.opacity = opacity;
        
    }

}

// person_icon.addEventListener('mouseover', e=>{
  
// })

nav.addEventListener('mouseover', e=>{
    handleHover(e,0.5)
   
});

nav.addEventListener('mouseout', e => {
    handleHover(e,1)
  

})



////////////////////////////////////////// INTERCEPTION OBSERVER API///////////////////////////////////////////////////////


// intersection observer requires two arguments 1.callback function 2.object
// calculating nav hiehgt dynamically


// nav stick to the bottom of mobile

const navHeight = nav.getBoundingClientRect().height

const navWidth = nav.getBoundingClientRect().width



const obsCallback = (entries,observer)=>{

const [entry ] = entries
console.log(` bounding width ${entry.boundingClientRect.width <760},${entry.isIntersecting} `)

    if (!entry.isIntersecting && entry.boundingClientRect.width >= 760) nav.classList.add('sticky') 
    
    else nav.classList.remove('sticky')

}

const headerObserver = new IntersectionObserver(obsCallback, {
                                                    root: null,
                                                    threshod: 0,
                                                    rootMargin:`-${navHeight}px`,
                                                  
   })

headerObserver.observe(header)


///////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////SECTION OBSERVER API//////////////////////////////////////////////////////

const Allsections = document.querySelectorAll('.section')


const revealsection=(entries,obsever)=>{
const [entry] = entries;
// let max_width = entry.boundingClientRect.width 
// console.log(max_width)
if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden')

}

const sectionObserver =new IntersectionObserver(revealsection,{
    root:null,
    threshold:0.15,
})

Allsections.forEach(section=>{
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})


///////////////////////////////////////////Intersection observer LAZYLOADING////////////////////////////////////////////////////




const imgTarget = document.querySelectorAll('img[data-src]')

const loadImg = (entries, observer) => {
    const [entry] = entries
if(!entry.isIntersecting) return;
entry.target.src =entry.target.dataset.src

entry.target.addEventListener('load',()=>{
    entry.target.classList.remove('lazy-img')
})

 observer.unobserve(entry.target)
}

const ImgObserver = new IntersectionObserver(loadImg, 
    {
        root:null,
        threshold:0.,
        rootMargin:'-200px'
})

imgTarget.forEach(img => {
    ImgObserver.observe(img)
})

///////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////TABBED CCOMPONET////////////////////////////////////////////////

//

// tabsContainer.addEventListener('click',e=>{
//     const clicked= e.target.closest('.operations__tab');
//     console.log(clicked)

//     // Guard clause
//     if(!clicked) return;
//     // adding and removing upward and downward movement..

//     // active tab

//     // remove activeclasss
//     tabs.forEach(t => t.classList.remove('operations__tab--active'));
//     tabsContent.forEach(c => c.classList.remove('operations__content--active'));
   

//     // Activate tab
//     clicked.classList.add('operations__tab--active');
//     // dataset is from data-tab
//     document.querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active')
// })

///////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////SLIDER///////////////////////////////////////////////////







// slider.style.transform ='scale(0.3 ) translateX(-1000px) '
// slider.style.overflow = 'visible'

const maxSlide = slides.length
let curSlider = 0

// dots

const Slider =()=>{
//FUNCTIONS
const createDots = () =>{
slides.forEach((_,i)=>{
    dotContainer.insertAdjacentHTML('beforeend', ` <button class="dots__dot" data-slide="${i}"> </btton>` )

})

}


const activeDot=(slide)=>{
    
    document.querySelectorAll('.dots__dot').forEach(dot=>{
        dot.classList.remove('dots__dot--active')

    })

    document.querySelector(`.dots__dot[data-slide="${slide}"`)
    .classList.add('dots__dot--active')
}



const goToSlide=(slide)=>{
    slides.forEach((s, i) => {
       ( s.style.transform = `translateX(${100 * (i-slide)}%)`)

    })
   
}




const nextSlide= ()=>{
    if (curSlider === maxSlide - 1) {
        curSlider = 0
    } else {
        curSlider++

    }

    goToSlide(curSlider)
    activeDot(curSlider)
}

const prevSlide = () => {
    if (curSlider === 0) {
        curSlider = maxSlide-1
    } else {
       curSlider--
    }
    goToSlide(curSlider)
    activeDot(curSlider)
}

const init = function(){
    goToSlide(0)
    createDots()
    activeDot(0)
}

init()

// EVENTS

btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)

document.addEventListener('keydown',(e)=>{
    if(e.key=== 'ArrowLeft') prevSlide()

    // short circuit
    e.key === 'ArrowRight' && nextSlide()
    
})

dotContainer.addEventListener('click', (e)=>{
    if(e.target.classList.contains('dots__dot')){
        const {slide} =e.target.dataset
        goToSlide(slide)
        activeDot(slide)
    }
})
}

Slider()