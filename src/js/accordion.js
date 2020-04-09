(function () {
  const teamAcco = document.querySelectorAll(".team__item");
  const teamUser = document.querySelector(".team__user");
  let isActiv;

  function acco(e, item, className, exeption) {
    if (!e.target.classList.contains(exeption)) {
      item.classList.add(className);
      if (isActiv) {
        isActiv.classList.remove(className);
      }
      if (isActiv === item) {
        isActiv = 0;
      } else {
        isActiv = item;
      }
    }
  }

  teamAcco.forEach(function (item, teamAcco) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log(e.target);
      acco(e, item, "team__accordion--is-activ", undefined);
    });
  });

  //Аккордион для kitch-menu
  const kitchAcco = document.querySelectorAll(".kitch-menu__item");
  let width = window.innerWidth;
  console.log(width);

  kitchAcco.forEach(function (item, kitchAcco) {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      if (width > 480) {
        acco(e, item, "kitch-menu__item--is-activ", "kitch-menu__content");
      } else {
        const mobileMenu = document.createElement("div");
        const mobileSection = document.querySelector(".kitch-menu");
        mobileMenu.classList.add("mobile__kitch-menu");
        console.log(mobileMenu);
        mobileMenu.innerHTML = this.innerHTML;
        mobileSection.append(mobileMenu);

        mobileMenu.addEventListener("click", function (e) {
          e.preventDefault();
          mobileMenu.remove();
        });
      }
    });
  });
})()
