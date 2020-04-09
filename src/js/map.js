let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [53.051717, 158.661847],
    zoom: 16,
    controls: [],
  });

  const coord = [
    [53.051717, 158.661847],
    [53.07874, 158.652981],
    [53.059857, 158.625618],
    [53.054017, 158.609098],
  ];

  const myCollection = new ymaps.GeoObjectCollection(
    {},
    {
      draggable: false,
      iconLayout: "default#image",
      iconImageHref: "./images/icons/map-marker.svg",
      iconImageSize: [75, 135],
      iconImageOffset: [-35, -125],
    }
  );

  coord.forEach((coord) => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable("scrollZoom");
  console.log(myMap.behaviors);
};

ymaps.ready(init);
