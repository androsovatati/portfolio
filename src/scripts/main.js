window.onload = () => {
    const ACTIVE_MENU_ITEM = "menu__item_active";

    let currentSection = 0;
    const titleWrapper = document.getElementsByClassName("info__title")[0];
    const menuItems = document.getElementsByClassName("menu__item");
    const contentBlocks = document.getElementsByClassName("content-block");

    let timer = null;

    setTimeout(() => {
        titleWrapper.style.transition = "transform .5s ease-in-out";
        titleWrapper.style.transform = `translateX(0)`;
    }, 500);

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

    function changePage(i) {
    }

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
            contentBlocks[i].style.top = "100%";
        }
        for (let i = 0; i <= currentSection; i++) {
            contentBlocks[i].style.opacity = 1;
        }
        menuItems[currentSection].classList.add(ACTIVE_MENU_ITEM);
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
                    contentBlocks[i].style.top = "100%";
                }
                for (let i = 0; i <= currentSection; i++) {
                    contentBlocks[i].style.opacity = 1;
                }
            }
            menuItems[i].classList.add(ACTIVE_MENU_ITEM);
        });
    }

    if (document.addEventListener) {
        if ("onwheel" in document) {
            // IE9+, FF17+, Ch31+
            document.addEventListener("wheel", onMouseWheel);
        } else if ("onmousewheel" in document) {
            // устаревший вариант события
            document.addEventListener("mousewheel", onMouseWheel);
        } else {
            // Firefox < 17
            document.addEventListener("MozMousePixelScroll", onMouseWheel);
        }

        document.addEventListener("keydown", onKeyDown);

        // for (let i = 0; i < menuItems.length; i++) {
        //     menuItems[i].addEventListener('click', () => {
        //         menuItems[currentSection].classList.remove(ACTIVE_MENU_ITEM);
        //         console.log(i);
        //     });
        // }
    } else {
        // IE8-
        document.attachEvent("onmousewheel", onMouseWheel);
    }
};
