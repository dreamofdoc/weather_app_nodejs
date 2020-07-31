console.log("Client side");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
let errorMessage = document.querySelector("#error");
let dataMessage = document.querySelector("#data");
let li_1 = document.querySelector("#li1");
let li_2 = document.querySelector("#li2");
let li_3 = document.querySelector("#li3");
let li_4 = document.querySelector("#li4");
let li_5 = document.querySelector("#li5");
let li_6 = document.querySelector("#li6");
let li_7 = document.querySelector("#li7");
let li_8 = document.querySelector("#li8");
let loader = document.querySelector("#toggleLoader");
let list = document.querySelector(".list");

errorMessage.textContent = "";
li_1.textContent = "";
li_2.textContent = "";
li_3.textContent = "";
li_4.textContent = "";
li_5.textContent = "";
li_6.textContent = "";
li_7.textContent = "";
li_8.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loader.classList.add("progress");
  const url = `http://localhost:5000/weather?address=${search.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        loader.classList.remove("progress");
        errorMessage.classList.add("warning");
        errorMessage.textContent = data.error;
      } else {
        list.classList.add("collection");
        loader.classList.remove("progress");
        errorMessage.classList.remove("warning");
        errorMessage.textContent = "";
        li_1.textContent = `Location:   ${data.location.name}, ${data.location.region}, ${data.location.country}`;
        li_2.textContent = `Description:   ${data.current.weather_descriptions[0]}`;
        li_3.textContent = `Temperature:   ${data.current.temperature}℃`;
        li_4.textContent = `Humidity:   ${data.current.humidity}%`;
        li_5.textContent = `Wind Speed:   ${data.current.wind_speed} (m/s)`;
        li_6.textContent = `Visibility:   ${data.current.visibility}%`;
        li_7.textContent = `Pressure:   ${data.current.pressure} (Pa)`;
        li_8.textContent = `Current Time:   ${data.current.observation_time}`;
      }
    });
  search.value = "";
});
