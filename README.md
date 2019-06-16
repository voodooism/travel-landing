## [Travel-landing](https://voodooism.github.io/travel-landing)
A responsive HTML/CSS mockup for a travel agency. 
This is my first project that I build studying HTML and CSS technologies.
Below I give a list of technologies, tools, and features that I used:

## Technologies & Tools
+ HTML5
+ CSS3
+ BEM
+ SASS
+ JavaScript
+ NPM
+ live-server


## Features
These are some of the key features of this landing page.

### CSS transitions and animations
<p align="center">
    <img src="https://imgur.com/8c4HyyM.gif">
</p>
<p align="center">
    <img src="https://imgur.com/x0sBozV.gif">
</p>

### Css architecture  
7-1 structure
+ base/
+ components/
+ layout/
+ pages/
+ themes/
+ abstract/
+ vendors/
+ main.scss

### "Desktop first" responsive design

This is achieved by utilizing a mixin:

```css
@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media (max-width: 37.5em) { @content; } // 600px / 16
  }

  @if $breakpoint == tab-port {
    @media (max-width: 56.25em) { @content; } // 900px / 16
  }

  @if $breakpoint == tab-land {
    @media (max-width: 75em) { @content; } // 1200px / 16
  }

  @if $breakpoint == big-desktop {
    @media (min-width: 112.5em) { @content; } // 1800px / 16
  }
}
```
And responsive image too:

```html
<img srcset="img/nat-1.jpg 300w, img/nat-1-large.jpg 1000w" alt="Photo 1"
             sizes="(max-width: 900px) 20vw, (max-width: 600px) 30vw, 300px"
             class="composition__photo composition__photo--p1"
             src="img/nat-1-large.jpg">
```

### My own float-based grid system:

```css
.row {
    max-width: $grid-width;
    margin: 0 auto;
    display: flow-root;

    &:not(:last-child) {
        margin-bottom: $gutter-vertical;
        
        @include respond(tab-port) {
            margin-bottom: $gutter-vertical-small;
        }
    }

    @include respond(tab-port) {
        max-width: 50rem;
        padding: 0 3rem;
    }

    [class^="col"] {
        float: left;

        &:not(:last-child) {
            margin-right: $gutter-horizontal;

            @include respond(tab-port) {
                margin-right: 0;
                margin-bottom: $gutter-vertical-small;
            }
        }

        @include respond(tab-port) {
            width: 100% !important;
        }
    }

    .col-1-of-2,
    .col-2-of-4  {
        width: calc((100% - #{$gutter-horizontal}) / 2);
    }

    .col-1-of-3 {
        width: calc((100% - #{$gutter-horizontal} * 2) / 3);
    }

    .col-1-of-4 {
        width: calc((100% - #{$gutter-horizontal} * 3) / 4);
    }

    .col-2-of-3 {
        width: calc((200% - #{$gutter-horizontal})/ 3);
    }

    .col-3-of-4 { 
        width: calc((300% - #{$gutter-horizontal} )/4);
    }
}
```

### Some of js-animations
All animations in this project implemented by only using CSS. But to implement a smooth transition on the links in the navigation menu,
and to implement the behavior of the modal window, I had to use javascript a little 

```javascript
document.addEventListener("DOMContentLoaded", function(event) {
    //Smooth scroll to navigation link target in the navigation menu
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

    const navLinks = document.querySelectorAll('.js-navigation__link');
    navLinks.forEach((element) => element.addEventListener('click', scrollToTarget));

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
```
