// const { response } = require("express");

/* Global Variables */
document.getElementById("generate").addEventListener("click", handleClick);

// Create a new date instance dynamically with JS
// let d = new Date();
let newDate = new Date().toLocaleDateString();

// Hold posts responses
var postData = {};

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
    postData = updatedPosts;
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

  console.log(postData);

  let dateNode = document.createTextNode(postData.post.date);
  let tempNode = document.createTextNode(postData.weather.main.temp);
  let contentNode = document.createTextNode(postData.post.post);

  clearRecentEntry();

  date.innerHTML = postData.post.date;
  temp.innerHTML = postData.weather.main.temp;
  content.innerHTML = postData.post.post;
}

function clearRecentEntry() {
  clearNode("date");
  clearNode("temp");
  clearNode("content");
}

function clearNode(name) {
  let node = document.getElementById(name);
  if (node.hasChildNodes) {
    let child;
    while ((child = node.firstChild)) {
      node.removeChild(child);
    }
  }
}
