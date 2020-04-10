(function () {
  const sections = $(".section");
  const display = $(".wrapper__content");
  console.log(display);
  let inScroll = false;

  const performTransition = (sectionEq) => {
    if (inScroll == false) {
      inScroll = true;
      // console.log(inScroll);
      const position = sectionEq * -100;
      sections
        .eq(sectionEq)
        .addClass("active")
        .siblings()
        .removeClass("active");

      display.css({
        transform: `translateY(${position}%)`,
      });
      display.on(
        "transitionend webkitTransitionEnd oTransitionEnd",
        function () {
          inScroll = false;
        }
      );
    }
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
