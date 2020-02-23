const format = text => {
  // formats links
  const regexpLinks = RegExp('\\[\\["link", "(.*?)", "(.*?)"\\]\\]', "g");
  let match;
  while ((match = regexpLinks.exec(text)) !== null) {
    // formats link
    text = text.replace(
      match[0],
      `<a href="${match[1]}" target="_blank" rel="noopener noreferrer">${match[2]}</a>`
    );
  }
  // formats bold text
  const regexpBold = RegExp("'''(.*?)'''", "g");
  while ((match = regexpBold.exec(text)) !== null) {
    // formats string
    text = text.replace(match[0], `<strong>${match[1]}</strong>`);
  }
  // formats italic text
  const regexpItalic = RegExp("''(.*?)''", "g");
  while ((match = regexpItalic.exec(text)) !== null) {
    // formats string
    text = text.replace(match[0], `<em>${match[1]}</em>`);
  }
  // formats inline code
  const regexpInlineCode = RegExp("\\[\\[code (.*?)\\]\\]", "g");
  while ((match = regexpInlineCode.exec(text)) !== null) {
    // formats string
    text = text.replace(
      match[0],
      `<span class="inline-code">${match[1]}</span>`
    );
  }

  return text;
};

const codeParser = code => {
  return code
    .map((block, index) => {
      return `<div class="code-block">${block
        .map((line, index) => {
          return `<p>${line.replace(/\[tab\]/g, "&emsp;")}</p>`;
          /*if (index === 0 || line === "}" || line === "}'''") {
            return `<p>${line}</p>`;
          } else if (line.includes("no-tab")) {
            return `<p>${line.replace("no-tab", "")}</p>`;
          } else {
            return `<p>&emsp;${line}</p>`;
          }*/
        })
        .join("")}</div>`;
    })
    .join("");
};

const bodyParser = body => {
  // breaks down sections, each section is an array of objects
  const sections = Object.keys(body);

  return sections
    .map(
      section =>
        `<section>${body[section]
          .map(el => {
            let block = "";
            if (el && el.type === "title") {
              block = `<h4>${el.text}</h4>`;
            } else if (el && el.type === "subtitle") {
              block = `<div class="subtitle">${el.text}</div>`;
            } else if (el && el.type === "div" && el.style === "none") {
              block = el.text
                .map(div => `<div class="article__div">${div}</div>`)
                .join("");
            } else if (el && el.type === "div" && el.style === "code") {
              block = `<div class="code">${codeParser(el.text)}</div>`;
            } else if (el && el.type === "ol") {
              block = `<ol>${el.text
                .map(line => `<li>${line}</li>`)
                .join("")}</ol>`;
            } else if (el && el.type === "ul") {
              block = `<ul>${el.text
                .map(line => `<li>${line}</li>`)
                .join("")}</ul>`;
            } else if (el && el.type === "img") {
              block = `<img src="${el.image}" alt="image" />`;
            } else if (el && el.type === "conclusion") {
              block = `<h4>Conclusion</h4>${el.text
                .map(div => `<div class="article__div">${div}</div>`)
                .join("")}`;
            }

            return `<div>${format(block)}</div>`;
          })
          .join("")}</section>`
    )
    .join("");
};

export default bodyParser;
