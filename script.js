const lines = [
  "BOOTING SYNTETHICA...",
  "ESTABLISHING LINK...",
  "WELCOME, USER [UNKNOWN]",
  "INITIALIZATION COMPLETE.",
  ""
];

let currentLine = 0;
const output = document.getElementById("output");
const inputLine = document.getElementById("input-line");
const inputBox = document.getElementById("terminal-input");

function typeLine(line, callback, delay = 50) {
  const span = document.createElement("span");
  output.appendChild(span);

  let i = 0;
  const cursor = document.createElement("span");
  cursor.textContent = "█";
  cursor.classList.add("blink");
  span.after(cursor);

  const interval = setInterval(() => {
    span.textContent += line[i];
    i++;
    if (i >= line.length) {
      clearInterval(interval);
      output.appendChild(document.createElement("br"));
      cursor.remove();
      callback();
    }
  }, delay);
}

function glitchText(text, callback) {
  const span = document.createElement("span");
  output.appendChild(span);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let i = 0;
  const cursor = document.createElement("span");
  cursor.textContent = "█";
  cursor.classList.add("blink");
  span.after(cursor);

  const interval = setInterval(() => {
    if (i < text.length) {
      span.textContent =
        text.slice(0, i) +
        chars.charAt(Math.floor(Math.random() * chars.length));
      i++;
    } else {
      clearInterval(interval);
      span.textContent = text;
      output.appendChild(document.createElement("br"));
      cursor.remove();
      callback();
    }
  }, 80);
}

function typeNextLine() {
  if (currentLine < lines.length) {
    const line = lines[currentLine];
    currentLine++;

    if (line.includes("[UNKNOWN]")) {
      glitchText(line, typeNextLine);
    } else {
      typeLine(line, typeNextLine);
    }
  } else {
    enableInput();
  }
}

function enableInput() {
  inputLine.style.display = "block";
  inputBox.focus();
}

typeNextLine();
