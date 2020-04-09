(function () {
  const sections = $(".section");
  const display = $(".wrapper__content");

  const performTransition = (sectionEq) => {
    const position = sectionEq * -100;
    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

    display.css({
      transform: `translateY(${position}%)`,
    });
  };

  const scrollerSection = (direction) => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (nextSection.length && direction === "next") {
      performTransition(nextSection.index());
    }

    if (prevSection.length && direction === "prev") {
      performTransition(prevSection.index());
    }
  };

  $(window).on("wheel", (e) => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
      scrollerSection("next");
    }

    if (deltaY < 0) {
      scrollerSection("prev");
    }
  });
})();
