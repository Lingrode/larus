$(function () {


  $('.header-nav__btn, .menu a').on('click', function () {
    $('.header-nav__inner').toggleClass('header-nav__inner--active');
    // $('body').toggleClass('lock');
  });

  $('.header-nav__btn').on('click', function () {
    $(this).toggleClass('header-nav__btn--active');
  });

  $(".header-nav__menu-link, .footer__contacts-link").on("click", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body, html').animate({ scrollTop: top }, 1200);
    event.preventDefault();
    $('.header-nav__menu-link').removeClass('header-nav__menu-item--active');
    $(this).addClass('header-nav__menu-item--active');
  });

  window.onclick = function (e) {
    if (!e.target.matches('.header-nav__btn')) {
      let dropdownbtn = document.getElementsByClassName("header-nav__btn");
      var dropdownmenu = document.getElementsByClassName("header-nav__inner");
      var i;
      for (i = 0; i < dropdownmenu.length; i++) {
        var openDropdown = dropdownmenu[i];
        if (openDropdown.classList.contains('header-nav__inner--active')) {
          openDropdown.classList.remove('header-nav__inner--active');
        }
      }
      for (i = 0; i < dropdownbtn.length; i++) {
        var openDropdown = dropdownbtn[i];
        if (openDropdown.classList.contains('header-nav__btn--active')) {
          openDropdown.classList.remove('header-nav__btn--active');
        }
      }
    }
  };




  const animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - animItemHeight / animStart;
        }

        if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
          animItem.classList.add('_active');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('_active');
          }
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
      animOnScroll();
    }, 300);
  }


  //POPUP

  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeout = 800;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    }
  }

  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupCloseIcon(popupActive, false);
      }
      else {
        bodyLock();
      }
      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    // body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  // document.addEventListener('keydown', function (e) {
  //   if (e.which === 27) {
  //     const popupActive = document.querySelector('.popup-open');
  //     popupClose(popupActive);
  //   }
  // })

  (function () {
    if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
  (function () {
    if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();

  let header = $('.header-nav');
  let hederHeight = header.height(); // вычисляем высоту шапки

  window.addEventListener('scroll', function () {
    if ($(this).scrollTop() > 1) {
      header.addClass('header_fixed');
      $('body').css({
        'paddingTop': hederHeight + 'px' // делаем отступ у body, равный высоте шапки
      });
    } else {
      header.removeClass('header_fixed');
      $('body').css({
        'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);
  }

  function formValidate(form) {
    let error = 0;
    let formReq = querySelectorAll('._req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }
});