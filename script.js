// Inject terminal HTML and CSS dynamically
(function() {
  const style = `
    body {
      background: black;
      color: #00ff00;
      font-family: 'Courier New', monospace;
      padding: 20px;
    }
    #terminal {
      max-width: 800px;
      margin: auto;
      white-space: pre-wrap;
      font-size: 1rem;
    }
    .blink {
      animation: blink 1s step-start infinite;
    }
    @keyframes blink {
      50% { opacity: 0; }
    }
    input {
      background: black;
      color: #00ff00;
      border: none;
      outline: none;
      font-family: inherit;
      font-size: inherit;
    }
  `;

  const styleElem = document.createElement('style');
  styleElem.type = 'text/css';
  styleElem.appendChild(document.createTextNode(style));
  document.head.appendChild(styleElem);

  const html = `
    <div id="terminal">
      <div id="output"></div>
      <div id="input-line" style="display: none;">
        <span>&gt; </span><input type="text" id="terminal-input" autofocus />
      </div>
    </div>
  `;

  document.body.innerHTML = html;
})();

// Domain lock: Only run on https://sites.google.com/view/terminal73/*
(function() {
  const allowedHost = 'sites.google.com';
  const allowedPathStart = '/view/terminal73';

  if (
    window.location.hostname !== allowedHost ||
    !window.location.pathname.startsWith(allowedPathStart)
  ) {
    document.body.innerHTML = "<h2 style='color: red; text-align: center; margin-top: 20%;'>Unauthorized domain.<br>Content cannot be displayed here.</h2>";
    throw new Error("Unauthorized domain");
  }
})();

// Terminal typing logic
(function() {
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
})();
