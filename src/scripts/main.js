window.onload = () => {
    const ACTIVE_MENU_ITEM = 'menu__item_active';

    let currentSection = 0;
    const titleWrapper = document.getElementsByClassName('info__title')[0];
    const menuItems = document.getElementsByClassName('menu__item');
    const contentBlocks = document.getElementsByClassName('content-block');

    setTimeout(() => {
        titleWrapper.style.transition = 'transform .5s ease-in-out';
        titleWrapper.style.transform = `translateX(0)`;
    }, 500);

    function changePage(e) {
        const event = e || window.event;
        const delta = e.deltaY || e.detail || e.wheelDelta;

        if (delta > 0 && currentSection < 3) {
            nextPage();
        } else if (delta < 0 && currentSection > 0) {
            previousPage();
        }
    }

    function nextPage() {
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

    if (document.addEventListener) {
        if ('onwheel' in document) {
            // IE9+, FF17+, Ch31+
            document.addEventListener('wheel', changePage);
        } else if ('onmousewheel' in document) {
            // устаревший вариант события
            document.addEventListener('mousewheel', changePage);
        } else {
            // Firefox < 17
            document.addEventListener('MozMousePixelScroll', changePage);
        }
    } else {
        // IE8-
        document.attachEvent('onmousewheel', changePage);
    }
};
