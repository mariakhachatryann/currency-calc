"use strict";

const amdInp = document.querySelector("#amd");
const usdInp = document.querySelector("#usd");
const date = document.querySelector("[data-date]");
date.textContent += ` ${new Date().toLocaleDateString() }`;

amdInp.addEventListener("input", function () {
  const request = new XMLHttpRequest();

  request.open("GET", "./db/data.json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.addEventListener("load", () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      usdInp.value = (parseFloat(this.value) / parseFloat(data.value.usd));
    }

    if (isNaN(usdInp.value)) {
      usdInp.value = 0;
    }
  });

});
 

usdInp.addEventListener("input", function () {
  const request = new XMLHttpRequest();
  request.open("GET", "./db/data.json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.addEventListener("load", () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      amdInp.value = (parseFloat(data.value.usd) * parseFloat(this.value));
    }

    if (isNaN(amdInp.value)) {
      amdInp.value = 0;
    }
  });
});