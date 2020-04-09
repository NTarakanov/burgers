(function () {
  const left = document.querySelector(".slider-burger__link-left");
  const right = document.querySelector(".slider-burger__link-right");
  const slide = document.querySelector(".slider-burger__list");

  right.addEventListener("click", function (e) {
    loop("right", e);
  });

  left.addEventListener("click", function (e) {
    loop("left", e);
  });

  function loop(direction, e) {
    e.preventDefault();
    if (direction === "right") {
      slide.appendChild(slide.firstElementChild);
    } else {
      slide.insertBefore(slide.lastElementChild, slide.firstElementChild);
    }
  }
})();
