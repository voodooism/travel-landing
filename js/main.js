document.addEventListener("DOMContentLoaded", function(event) {
    //Smooth scroll to navigation link target in the navigation menu
    const navLinks = document.querySelectorAll('.js-navigation__link');
    navLinks.forEach((element) => element.addEventListener('click', scrollToTarget));

    const scrollToTarget = (event) => {
        event.preventDefault();

        const navCheckbox = document.querySelector('.js-navigation__checkbox');
        navCheckbox.checked = false;

        const elementForScroll = document.querySelector(event.srcElement.getAttribute('href'));
        elementForScroll.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    

    //Turn off the pop-up by clicking outside its contents
    const popup = document.getElementById('popup');
    popup.addEventListener('click', (event) => {
        const isClickInsidePopupContent = document.querySelector('.js-popup__content').contains(event.target);
        const isClickOnActionButton = document.querySelector('.js-popup__content .js-btn').contains(event.target)

        if (!isClickInsidePopupContent || isClickOnActionButton) {
            popup.classList.remove('popup--visible');
        }
    });

    //Turn off the pop-up by clicking the close button
    document.querySelector('.js-popup__close').addEventListener('click', () => {
        popup.classList.remove('popup--visible');        
    });

    //Turn on the pop-up by clicking card button
    const cardButtons = document.querySelectorAll('.js-card__button');
    cardButtons.forEach((element) => element.addEventListener('click', () => {
        popup.classList.add('popup--visible');
    }));

    
});