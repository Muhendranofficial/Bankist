'use strict'

////////////////////////////////////////////////////
// NAVIGATION ANIMATION
const nav = document.querySelector('.nav');

const handleHover = function (el) {
    if (el.target.classList.contains('nav__link')) {
        const link = el.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('.nav__logo');
        siblings.forEach(element => {
            if (element !== link) {
                element.style.opacity = this;
            }
            logo.style.opacity = this;
        })
    }
}


nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////////////////////////
////////////// TABBED COMPONENT

const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (el) {
    const clicked = el.target.closest('.operations__tab');

    // Guard Clause
    if (!clicked) return;

    //Remove active class from both tabs and content
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    content.forEach(c => c.classList.remove('operations__content--active'));

    //Let us activate the content for the slected tab and selected content
    clicked.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})


////////////////////////////////////////////////////
////////////// MODAL WINDOW


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnOpenModal.forEach(m => m.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})

////////////////////////////////////////////////////
////////////// LEARN MORE WINDOW

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
    section1.scrollIntoView({ behavior: 'smooth' });
})


////////////////////////////////////////////////////
////////////// STICKY NAVIGATION : Intersection Observer API
/*
const obsCallback = function (entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    })
};

const obsOptions = {
    root: null,
    threshold: [0, 1, 0.2],

}

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);*/



const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }

}

const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
}

const headerObserver = new IntersectionObserver(obsCallback, obsOptions);
headerObserver.observe(header);

//root is the element that the target is intersecting
//section1 is the target and the route element  will be the
//element that we want our target element to intersect
//threshold: percentage of intersection at which the observer callback
//will be called
//in simple terms threshold is the feature which is defined to check the 
//percentage of the visible viewport that's it

////////////////////////////////////////////////////
////////////// REVEAL SECTION

const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    console.log(entry.isIntersecting);
    if (entry.isIntersecting) {
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    }

}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSection.forEach(function (section) {
    sectionObserver.observe(section);
    //section.classList.add('section--hidden');
})

////////////////////////////////////////////////////
////////////// LAZY LOADING IMAGES

const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    })

};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
})

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////
////////////// LAZY LOADING IMAGES

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

let count = 0;

//Creation of dots

const createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend', `<button class="dots__dot" data-slide="${i}"> </button>`
        );
    });
};

createDots();

//Activating Dots

const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach((dots) => dots.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}
activateDots(0);

//Let us Make Slider Side by Side
slides.forEach((s, i) => s.style.transform = `translateX(${100 * i}%)`);

//next slide animation

console.log(slides.length);

const goToSlide = function () {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - count)}%)`;
    })
}

const nextSlide = function () {
    if (count === slides.length - 1) {
        count = 0;
    } else {
        count++;
    }
}

const prevSlide = function () {
    if (count === 0) {
        count = slides.length - 1;
    } else {
        count--;
    }

}

btnRight.addEventListener('click', function (el) {
    nextSlide();
    goToSlide();
    activateDots(count);
})


btnLeft.addEventListener('click', function (el) {
    prevSlide();
    goToSlide();
    activateDots(count);
})

console.log('Theri ');