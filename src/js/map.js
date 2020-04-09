(function () {
  let myMap;

  const init = () => {
    myMap = new ymaps.Map("map", {
      center: [53.051717, 158.661847],
      zoom: 7,
    });
  };

  ymaps.ready(init);
});
