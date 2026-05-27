const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const forecastContainer = document.querySelector("#forecast");
const spotlightsContainer = document.querySelector("#spotlights");

const membersUrl = "data/members.json";

const membershipLevels = {
  1: "Member",
  2: "Silver",
  3: "Gold",
};

const apiKey = "";
const latitude = -9.38;
const longitude = -74.97;

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menuButton.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

async function getWeather() {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentResponse.ok) {
      throw new Error(await currentResponse.text());
    }

    if (!forecastResponse.ok) {
      throw new Error(await forecastResponse.text());
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentData);
    displayForecast(forecastData.list);
  } catch (error) {
    currentTemp.textContent = "Unavailable";
    weatherDescription.textContent = "Weather data could not be loaded.";
    forecastContainer.innerHTML =
      "<p class='error-message'>Forecast data is currently unavailable.</p>";

    console.error("Weather API error:", error);
  }
}

function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  currentTemp.innerHTML = `${temperature}&deg;C`;
  weatherDescription.textContent = capitalizeWords(description);

  weatherIcon.setAttribute("src", iconUrl);
  weatherIcon.setAttribute("alt", capitalizeWords(description));
}

function displayForecast(forecastList) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = getThreeDayForecast(forecastList);

  dailyForecasts.forEach((forecast) => {
    const card = document.createElement("article");
    const date = document.createElement("h4");
    const temperature = document.createElement("p");

    date.textContent = formatForecastDate(forecast.dt_txt);
    temperature.innerHTML = `${Math.round(forecast.main.temp)}&deg;C`;

    card.appendChild(date);
    card.appendChild(temperature);

    forecastContainer.appendChild(card);
  });
}

function getThreeDayForecast(forecastList) {
  const today = new Date().toISOString().split("T")[0];

  const noonForecasts = forecastList.filter((forecast) => {
    const [date, time] = forecast.dt_txt.split(" ");
    return date !== today && time === "12:00:00";
  });

  if (noonForecasts.length >= 3) {
    return noonForecasts.slice(0, 3);
  }

  const uniqueDays = [];

  forecastList.forEach((forecast) => {
    const [date] = forecast.dt_txt.split(" ");

    const alreadyAdded = uniqueDays.some((item) =>
      item.dt_txt.startsWith(date),
    );

    if (date !== today && !alreadyAdded && uniqueDays.length < 3) {
      uniqueDays.push(forecast);
    }
  });

  return uniqueDays;
}

function formatForecastDate(dateText) {
  const date = new Date(dateText.replace(" ", "T"));

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const members = await response.json();
    const qualifiedMembers = members.filter(
      (member) => member.membershipLevel === 2 || member.membershipLevel === 3,
    );

    const randomSpotlights = qualifiedMembers
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    displaySpotlights(randomSpotlights);
  } catch (error) {
    spotlightsContainer.innerHTML =
      "<p class='error-message'>Business spotlights could not be loaded.</p>";

    console.error("Spotlight loading error:", error);
  }
}

function displaySpotlights(members) {
  spotlightsContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");
    const membership = document.createElement("p");

    card.classList.add("spotlight-card");

    image.setAttribute("src", `images/${member.image}`);
    image.setAttribute("alt", `${member.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "160");
    image.setAttribute("height", "100");

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("rel", "noopener noreferrer");
    website.textContent = "Visit Website";

    membership.textContent = `Membership Level: ${
      membershipLevels[member.membershipLevel]
    }`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);

    spotlightsContainer.appendChild(card);
  });
}

function capitalizeWords(text) {
  return text
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}

getWeather();
getSpotlights();
