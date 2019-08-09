window.onload = () => {
    const ACTIVE_MENU_ITEM = 'menu__item_active';

    let currentSection = 0;
    let currentSlide = 0;
    let isShowMenu = false;
    let isMobile = window.innerHeight > window.innerWidth;

    const slider = document.getElementsByClassName('content-slider')[0];
    const slidesCount = document.getElementsByClassName('slide').length;
    const currentSlideElement = document.getElementById('current-slide');
    const slidesCountElement = document.getElementById('slides-count');
    const titleWrapper = document.getElementsByClassName('info__title')[0];
    const menuItems = document.getElementsByClassName('menu__item');
    const contentBlocks = document.getElementsByClassName('content-block');
    const menuIcon = document.getElementById('menu-icon');
    const menuCloseIcon = document.getElementById('menu-close-icon');
    const menu = document.getElementById('menu');
    const socialsBlock = document.getElementsByClassName('socials')[0];

    const nextArrow = document.getElementById('next-btn');
    const prevArrow = document.getElementById('prev-btn');

    let timer = null;

    setTimeout(() => {
        titleWrapper.style.transition = 'transform .5s ease-in-out';
        slider.style.transition = 'transform .5s ease-in-out';
        titleWrapper.style.transform = `translateX(0)`;
        slider.style.transform = `translateX(0)`;
        slidesCountElement.innerText = formatDigit(slidesCount);
        currentSlideElement.innerText = formatDigit(currentSlide + 1);
    }, 500);

    function formatDigit(digit) {
        return digit < 10 && digit > 0 ? `0${digit}` : `${digit}`;
    }

    function debounce(f, ms) {
        let isCalling = false;
        return (...args) => {
            const onComplete = () => {
                isCalling = false;
            };
            if (!isCalling) {
                f.apply(this, args);
                isCalling = true;
                setTimeout(onComplete, ms);
            }
        };
    }

    function onMouseWheel(e) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const event = e || window.event;
            const delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta > 0 && currentSection < 3) {
                debounce(nextPage, 5000)();
            } else if (delta < 0 && currentSection > 0) {
                debounce(previousPage, 5000)();
            }
        }, 35);
    }

    function onKeyDown({ keyCode }) {
        if ((keyCode === 37 || keyCode === 38) && currentSection > 0) {
            previousPage();
        } else if ((keyCode === 39 || keyCode === 40) && currentSection < 3) {
            nextPage();
        }
    }

    function changePage(i) {}

    function nextPage() {
        // debugger;
        menuItems[currentSection].classList.remove(ACTIVE_MENU_ITEM);
        currentSection++;
        titleWrapper.style.transform = `translateX(${-100 * currentSection}%)`;
        for (let i = 1; i <= currentSection; i++) {
            contentBlocks[i].style.top = 0;
        }
        if (currentSection === 3) {
            for (let i = 0; i < currentSection; i++) {
                contentBlocks[i].style.opacity = 0;
            }
        } else {
            for (let i = 0; i < currentSection; i++) {
                contentBlocks[i].style.opacity = 1;
            }
        }
        menuItems[currentSection].classList.add(ACTIVE_MENU_ITEM);
    }

    function previousPage() {
        menuItems[currentSection].classList.remove(ACTIVE_MENU_ITEM);
        currentSection--;
        titleWrapper.style.transform = `translateX(${-100 * currentSection}%)`;
        for (let i = currentSection + 1; i <= 3; i++) {
            contentBlocks[i].style.top = '100%';
        }
        for (let i = 0; i <= currentSection; i++) {
            contentBlocks[i].style.opacity = 1;
        }
        menuItems[currentSection].classList.add(ACTIVE_MENU_ITEM);
    }

    function hideMenu() {
        menu.style.opacity = 0;
        setTimeout(() => {
            menu.style.zIndex = -1;
        }, 300);
        isShowMenu = false;
    }

    function showMenu() {
        menu.style.opacity = 1;
        menu.style.zIndex = 100;
        isShowMenu = true;
    }

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener('click', () => {
            menuItems[currentSection].classList.remove(ACTIVE_MENU_ITEM);
            const isNext = currentSection < i;
            currentSection = i;
            if (isNext) {
                titleWrapper.style.transform = `translateX(${-100 * currentSection}%)`;
                for (let i = 1; i <= currentSection; i++) {
                    contentBlocks[i].style.top = 0;
                }
                if (currentSection === 3) {
                    for (let i = 0; i < currentSection; i++) {
                        contentBlocks[i].style.opacity = 0;
                    }
                } else {
                    for (let i = 0; i < currentSection; i++) {
                        contentBlocks[i].style.opacity = 1;
                    }
                }
            } else {
                titleWrapper.style.transform = `translateX(${-100 * currentSection}%)`;
                for (let i = currentSection + 1; i <= 3; i++) {
                    contentBlocks[i].style.top = '100%';
                }
                for (let i = 0; i <= currentSection; i++) {
                    contentBlocks[i].style.opacity = 1;
                }
            }
            menuItems[i].classList.add(ACTIVE_MENU_ITEM);
            // if (i > 0) {
            //     socialsBlock.style.display = 'none';
            // } else {
            //     socialsBlock.style.display = 'flex';
            // }
            if (isMobile) {
                hideMenu();
            }
        });
    }

    nextArrow.addEventListener('click', () => {
        if (currentSlide < slidesCount - 1) {
            currentSlide++;
            slider.style.transform = `translateX(${-100 * currentSlide}%)`;
            currentSlideElement.innerText = formatDigit(currentSlide + 1);
            if (currentSlide === slidesCount - 1) {
                nextArrow.classList.add('header-controls__arrow_disabled');
            } else {
                prevArrow.classList.remove('header-controls__arrow_disabled');
                nextArrow.classList.remove('header-controls__arrow_disabled');
            }
        }
    });

    prevArrow.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            slider.style.transform = `translateX(${-100 * currentSlide}%)`;
            currentSlideElement.innerText = formatDigit(currentSlide + 1);
            if (currentSlide === 0) {
                prevArrow.classList.add('header-controls__arrow_disabled');
            } else {
                prevArrow.classList.remove('header-controls__arrow_disabled');
                nextArrow.classList.remove('header-controls__arrow_disabled');
            }
        }
    });

    menuIcon.addEventListener('click', () => {
        showMenu();
    });

    menuCloseIcon.addEventListener('click', () => {
        hideMenu();
    });

    window.addEventListener('resize', (e) => {
        isMobile = window.innerHeight > window.innerWidth;
        if (!isMobile) {
            showMenu();
        }
    });

    if (document.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            document.addEventListener('wheel', onMouseWheel);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            document.addEventListener('mousewheel', onMouseWheel);
        } else {
            // Firefox < 17
            document.addEventListener('MozMousePixelScroll', onMouseWheel);
        }

        document.addEventListener('keydown', onKeyDown);

        // for (let i = 0; i < menuItems.length; i++) {
        //     menuItems[i].addEventListener('click', () => {
        //         menuItems[currentSection].classList.remove(ACTIVE_MENU_ITEM);
        //         console.log(i);
        //     });
        // }
    } else {
        // IE8-
        document.attachEvent('onmousewheel', onMouseWheel);
    }
};
