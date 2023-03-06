const avatarSection = document.querySelector("[data-avatarSection]");
const getUserName = document.querySelector("[data-getUserName]");
const searchButton = document.querySelector("[data-serchButton]");
const profilename = document.querySelector("[data-profileName]");
const profileLink = document.querySelector("[data-profileLink]");
const profileJoinedDate = document.querySelector("[data-joinedDate]");
const profileBio = document.querySelector("[data-profileBio]");
const profileReposNumber = document.querySelector("[data-reposNumber]");
const profileFollowersNumber = document.querySelector("[data-followersNumber]");
const profileFollowingNumber = document.querySelector("[data-followingNumber]");
const locationName = document.querySelector("[data-locationName]");
const githubLink = document.querySelector("[data-githubLink]");
const twitterLink = document.querySelector("[data-twitterLink]");
const companyName = document.querySelector("[data-companyName]");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const themeModeChange = document.querySelector("[data-themeChange]");
const heading = document.querySelector("[data-headerSectionHeading]");
const themeName = document.querySelector("[data-themeName]");
const moonIcon = document.querySelector("[data-moon]");
const sunIcon = document.querySelector("[data-sun]");
const searchSection = document.querySelector("[data-searchSection]");
const searchedDetails = document.querySelector("[data-SearchDetailsSection]");
const reposFollowers = document.querySelector("[data-reposFollowers]");
const icons = document.querySelectorAll(".icon");
const companyIcon = document.querySelector("[data-companyIcon]");
const crossMark = document.querySelector("[data-crossMark]");
const errorMessage = document.querySelector("[data-errorMsg]");
const fullConatiner = document.querySelector("[data-container]");

crossMark.style.display = "none";
let userName = "thepranaygupta";
fetchUserDetails(userName);


searchButton.addEventListener("click", () => {
  userName = getUserName.value;
  console.log(userName);
  if (!userName) {
    return;
  } else {
    crossMark.style.display = "block";
    fetchUserDetails(userName);
  }
});

getUserName.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    console.log(e.target.value);
    if (!e.target.value) {
      return;
    } else {
      crossMark.style.display = "block";
      fetchUserDetails(e.target.value);
    }
  }
});

async function fetchUserDetails(userName) {
  try {
    const result = await fetch(`https://api.github.com/users/${userName}`);
    const data = await result.json();
    // console.log(data);
    if(`${data?.message}` === "Not Found") {
      errorMessage.style.display = "block";
      return;
    }
    errorMessage.style.display = "none";
    randorSearchedDetails(data);
  } catch (err) {
    console.log(err);
  }
}

function randorSearchedDetails(data) {
  avatarSection.src = `${data?.avatar_url}`;
  profilename.innerHTML = `${data?.name}`;
  profileLink.href = `${data?.html_url}`;
  profileLink.innerHTML = `@${data?.login}`;
  const date = new Date(data?.created_at);
  const year = date.getFullYear();

  const month = months[date.getMonth()];
  const day = date.getDate();
  if (day < 10) {
    profileJoinedDate.innerHTML = "Joined 0" + day + " " + month + " " + year;
  } else {
    profileJoinedDate.innerHTML = "Joined " + day + " " + month + " " + year;
  }
  if (`${data?.bio}` === "null") {
    profileBio.innerHTML = "This profile has no bio";
  } else {
    profileBio.innerHTML = `${data?.bio}`;
  }
  profileReposNumber.innerHTML = `${data?.public_repos}`;
  profileFollowersNumber.innerHTML = `${data?.followers}`;
  profileFollowingNumber.innerHTML = `${data?.following}`;

  let location = `${data?.location}`;
  if (location === "null") {
    locationName.innerHTML = "Not Available";
  } else {
    locationName.innerHTML = location;
  }
  githubLink.href = `${data?.blog}`;
  if (`${data?.blog}` === "") {
    githubLink.innerHTML = "Not Available";
  } else {
    githubLink.innerHTML = `${data?.blog}`;
  }

  let twitterUserName = `${data?.twitter_username}`;
  if (twitterUserName === "null") {
    twitterLink.innerHTML = "Not Available";
    twitterLink.href = "";
  } else {
    twitterLink.href = `https://twitter.com/${twitterUserName}`;
    twitterLink.innerHTML = `${twitterUserName}`;
  }
  let companyname = `${data?.company}`;
  if (companyname === "null") {
    companyName.innerHTML = "Not Available";
  } else {
    companyName.innerHTML = companyname;
  }
}

themeModeChange.addEventListener("click", () => {
  let theme = themeName.textContent;
  if (theme === "DARK") {
    changeDarkMode();
  } else {
    changeLightMode();
  }
});

function changeDarkMode() {
  console.log("Dark Mode");
  document.body.style.backgroundColor = "#141D2F";
  heading.classList.add("header-section-heading-dark");
  themeName.classList.add("theme-name-dark");
  themeName.innerHTML = "LIGHT";
  moonIcon.style.display = "none";
  sunIcon.style.display = "flex";
  searchSection.style.backgroundColor = "#1E2A47";
  getUserName.style.color = "white";
  searchedDetails.style.backgroundColor = "#1E2A47";
  document.body.style.color = "white";
  profilename.style.color = "white";
  profileJoinedDate.style.color = "white";
  profileBio.style.color = "white";
  reposFollowers.style.backgroundColor = "#141D2F";
  profileReposNumber.style.color = "white";
  profileFollowersNumber.style.color = "white";
  profileFollowingNumber.style.color = "white";
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.color = "white";
  }
  githubLink.style.color = "white";
  twitterLink.style.color = "white";
  locationName.style.color = "white";
  companyIcon.style.filter.color = "white";
  companyName.style.color = "white";
}

function changeLightMode() {
  console.log("Light Mode");
  document.body.style.backgroundColor = "#F6F8FF";
  heading.classList.remove("header-section-heading-dark");
  themeName.classList.remove("theme-name-dark");
  themeName.innerHTML = "DARK";
  moonIcon.style.display = "flex";
  sunIcon.style.display = "none";
  searchSection.style.backgroundColor = "white";
  getUserName.style.color = "#4B6A9B";
  searchedDetails.style.backgroundColor = "white";
  document.body.style.color = "#4B6A9B";
  profilename.style.color = "black";
  profileJoinedDate.style.color = "#4B6A9B";
  profileBio.style.color = "#4B6A9B";
  reposFollowers.style.backgroundColor = "#F6F8FF";
  profileReposNumber.style.color = "black";
  profileFollowersNumber.style.color = "black";
  profileFollowingNumber.style.color = "black";
  githubLink.style.color = "#4B6A9B";
  twitterLink.style.color = "#4B6A9B";
  for (let i = 0; i < icons.length; i++) {
    icons[i].style.color = "#4B6A9B";
  }
  locationName.style.color = "#4B6A9B";
  companyName.style.color = "#4B6A9B";
}

crossMark.addEventListener("click",() => {
  getUserName.value = null;
  errorMessage.style.display = "none";
})




