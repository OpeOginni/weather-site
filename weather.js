const api = {
  key: "42134acafee53c491e0fecabb4648971",
};

const search = document.querySelector(".search");
const date = document.querySelector(".date");
const icon = document.querySelector("#wicon");
// const location = document.querySelectorAll(".location");

search.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    whatIsThis(search.value);
  }
});

fetch(
  "https://api.ipgeolocation.io/ipgeo?apiKey=f8026ee3b1ea4630bcee58805f82df7f"
)
  .then((ipgeo) => ipgeo.json())
  .then((ipgeo) => {
    whatIsThis(ipgeo.city);
  });

function whatIsThis(query) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api.key}`
  )
    .then((weather) => weather.json())
    .then((weather) => {
      const city = document.querySelector(".city");
      const temp = document.querySelector(".temp");
      const weatherelement = document.querySelector(".weather");
      const description = document.querySelector(".description");
      const img = document.querySelector("#wicon");
      const weirdMessage = document.querySelector(".weirdMessage");

      city.innerText = `${weather.name}, ${weather.sys.country}`;
      temp.innerHTML = Math.round(weather.main.temp) + "°c";
      weatherelement.innerText = weather.weather[0].main;
      if (weatherelement.innerText === "Clouds") {
        weirdMessage.innerText = "Rains might come, still might not";
      } else if (weatherelement.innerText === "Rain") {
        weirdMessage.innerText = "Hope You got an Umbrella";
      } else if (weatherelement.innerText === "Clear") {
        weirdMessage.innerText = "Nice day for a picnic, won't you agree?";
      }
      description.innerText = weather.weather[0].description;
      let icon = weather.weather[0].icon;

      img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${weather.weather[0].description}')`;

      fetch(
        `https://timeapi.io/api/Time/current/coordinate?latitude=${weather.coord.lat}&longitude=${weather.coord.lon}`
      )
        .then((time) => time.json())
        .then((time) => {
          const date = document.querySelector(".date");
          date.innerText = time.time;
        });
    });

  // fetch(
  //   `https://timeapi.io/api/Time/current/coordinate?latitude=${weather.coord.lat}&longitude=${weather.coord.lon}`
  // )
  //   .then((time) => time.json())
  //   .then((time) => {
  //     const date = document.querySelector(".date");
  //     date.innerText = time.time;
  //   });
}
