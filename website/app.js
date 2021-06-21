// const { response } = require("express");

/* Global Variables */
document.getElementById("generate").addEventListener("click", handleClick);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Hold posts responses
var posts = [];

async function post(url = "", data = {}) {
  // console.log(data);

  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getPosts(url = "") {
  console.log("updating posts");
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const updatedPosts = await response.json();
    console.log(updatedPosts);
    posts = updatedPosts;
  } catch (error) {
    console.log(error);
  }
}

function handleClick() {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  let submit = { zipcode: zip, post: feelings, date: newDate };
  post("http://localhost:3000/add", submit).then(async (response) => {
    console.log(response);
    await getPosts("http://localhost:3000/entries").then(() => {
      showRecentEntry();
    });
  });
}

function showRecentEntry() {
  let date = document.getElementById("date");
  let temp = document.getElementById("temp");
  let content = document.getElementById("content");

  const recentEntry = posts.sort((a, b) => b.post.date - a.post.date)[0];
  console.log(recentEntry);

  let dateNode = document.createTextNode(recentEntry.post.date);
  let tempNode = document.createTextNode(recentEntry.weather.main.temp);
  let contentNode = document.createTextNode(recentEntry.post.post);

  clearRecentEntry();

  date.appendChild(dateNode);
  temp.appendChild(tempNode);
  content.appendChild(contentNode);
}

function clearRecentEntry() {
  let date = document.getElementById("date");
  let temp = document.getElementById("temp");
  let content = document.getElementById("content");

  if (date.hasChildNodes) {
    while (date.firstChild) {
      date.removeChild(date.firstChild);
    }
  }

  if (temp.hasChildNodes) {
    while (temp.firstChild) {
      temp.removeChild(temp.firstChild);
    }
  }

  if (content.hasChildNodes) {
    while (content.firstChild) {
      content.removeChild(content.firstChild);
    }
  }
}
