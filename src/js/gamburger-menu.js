(function () {
  const menuBtm = document.querySelector(".burger-menu__checkbox");
  const menuList = document.querySelector(".menu");
  const menuBody = document.querySelector("body");

  menuBtm.addEventListener("click", function (event) {
    // console.log(menuBtm.srcElement.checked);
    if (event.srcElement.checked == true) {
      menuList.style.display = "flex";
      menuBody.style.overflow = "hidden";
    } else {
      menuList.style.display = "";
      menuBody.style.overflow = "";
    }
  });
})()
