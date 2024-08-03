let currentDirectory = "~";

/**
 * Fetches the public IP address of the user.
 * @returns {Promise<string>} The user's public IP address.
 */
async function getIP() {
  try {
    let response = await fetch("https://api.ipify.org?format=json");
    let data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "Unknown IP";
  }
}

/**
 * Handles user input and display.
 */
document.getElementById("input").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const inputValue = e.target.value.trim();
    if (inputValue) {
      processInput(inputValue);
      e.target.value = "";
    }
  }
});

/**
 * Sets the fetched IP address in the designated span.
 */
getIP().then((ip) => {
  document.getElementById("ip").innerText = ip;
});

/**
 * Updates the width of the input field to match its content.
 */
function updateInputWidth() {
  const input = document.getElementById("input");
  const mirror = document.getElementById("input-mirror");
  mirror.textContent = input.value;
}

/**
 * Handles user input and display.
 */
document.getElementById("input").addEventListener("keydown", function (e) {
  updateInputWidth();
  if (e.key === "Enter") {
    const inputValue = e.target.value.trim();
    if (inputValue) {
      processInput(inputValue);
      e.target.value = "";
      updateInputWidth();
    }
  }
});

/**
 * Clears the input field on page load.
 * This ensures that any previous input is removed when the page is refreshed.
 */
window.addEventListener("load", function () {
  document.getElementById("input").value = "";
});

/**
 * An array of predefined file and directory names for the `ls` command simulation.
 * @type {string[]}
 */
const fileList = [
  "resume.pdf",
  "project1/",
  "notes.txt",
  "todo.md",
  "photos/",
  "index.html",
  "script.js",
  "styles.css",
  "README.md",
  "config.yaml",
  "backup/",
  "videos/",
  "data.csv",
  "report.docx",
  "design.psd",
];

/**
 * Processes the user's input command and displays the appropriate response.
 * @param {string} input - The command input from the user.
 */
function processInput(input) {
  let output = document.getElementById("output");
  let result = "";

  if (input.startsWith("cd ")) {
    let newPath = input.slice(3).trim();
    if (newPath === "") {
      result = "No such file or directory";
    } else {
      currentDirectory = `~/${newPath}`;
      document.getElementById("directory").innerText = currentDirectory;
    }
  } else {
    switch (input.toLowerCase()) {
      case "help":
        result =
          "Available commands:\n" +
          "> whoami - Display user information\n" +
          "> help - List available commands\n" +
          "> cd - Change directory\n" +
          "> ls - List directory contents\n" +
          "> clear - Clear the terminal screen\n" +
          "> sudo rm -rf /* Don't do this - please!";
        break;
      case "whoami":
        result =
          '<div class="social">You can find me on:</div>' +
          '<ul class="link-list">' +
          '<li>⇒ <a href="https://www.linkedin.com/in/martinmose" target="_blank" title="LinkedIn">LinkedIn</a></li>' +
          '<li>⇒ <a href="https://twitter.com/martinmose" target="_blank" title="Twitter (X)">X</a></li>' +
          '<li>⇒ <a href="https://github.com/martinmose" target="_blank" title="Github">Github</a></li>' +
          "</ul>";
        break;
      case "clear":
        output.innerHTML = "";
        document.getElementById("directory").innerText = "~";
        document.getElementById("image-container").style.display = "none";
        return;
      case "sudo rm -rf /*":
        result = "Command not allowed! You should know better!";
        document.getElementById("image-container").style.display = "block";
        break;
      case "ls":
        result = getRandomFiles();
        break;
      default:
        result = `Command not found: ${input}`;
    }
  }

  output.innerHTML +=
    '<div class="history">' +
    '<div class="command-output">' +
    input +
    "</div>" +
    '<div class="command-result">' +
    result +
    "</div>" +
    "</div>";
  output.scrollTop = output.scrollHeight;
}

/**
 * Returns a random selection of file and directory names from the fileList.
 * @returns {string} A string containing randomly selected file and directory names.
 */
function getRandomFiles() {
  const shuffled = fileList.sort(() => 0.5 - Math.random());
  const randomFiles = shuffled.slice(0, Math.floor(Math.random() * 6) + 5);
  return randomFiles.join("\n");
}

/**
 * Focus on the input field for immediate typing.
 */
document.addEventListener("click", function () {
  document.getElementById("input").focus();
});

/**
 * Initial call to set input width correctly on load
 */
updateInputWidth();
