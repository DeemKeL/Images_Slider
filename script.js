const slider = document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));


let isDragging = false;
let startPosition = 0;
let animationId = 0;
let currentIndex = 0;
let prevTranslate = 0;
let currentTranslate = 0;





console.log(slides);


slides.forEach((slide, index) => {
    const slideImg = slide.querySelector('.slide__img');

    slideImg.addEventListener('dragstart', function (e) {
        e.preventDefault()
    })

    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);


    //mouse
    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', touchEnd);
    slide.addEventListener('mousemove', touchMove);
    slide.addEventListener('mouseleave', touchEnd);

});



function touchStart(index) {
    return function (e) {
        // console.log('Start');
        isDragging = true;
        currentIndex = index;
        startPosition = getPositionX(e);
        animationId = requestAnimationFrame(animation);
        console.log(animationId)
        slider.classList.add('grabbing')
    }
}

function touchEnd() {
    // console.log('End');

    isDragging = false;

    cancelAnimationFrame(animationId);
    slider.classList.remove('grabbing');

    const moved = currentTranslate - prevTranslate;
    if (moved < -120 && currentIndex < slides.length - 1) {
        currentIndex += 1;
    }

    if (moved > 120 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setPositionIndex();
}

function touchMove(e) {
    if (isDragging) {
        // console.log('Move');

        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        // console.log(currentPosition);
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}


function animation(e) {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
}


window.oncontextmenu = function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function setPositionIndex() {
    currentTranslate = currentIndex * -window.innerWidth;
    prevTranslate = currentTranslate;
    setSliderPosition();
}