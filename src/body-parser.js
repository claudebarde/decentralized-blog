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

  return text;
};

const codeParser = code => {
  return code
    .map((block, index) => {
      return `<div class="code-block">${block
        .map((line, index) => {
          if (index === 0 || line === "}" || line === "}'''") {
            return `<p>${line}</p>`;
          } else {
            return `<p>&emsp;${line}</p>`;
          }
        })
        .join("")}</div>`;
    })
    .join("");
};

const bodyParser = body => {
  // breaks down sections, each section is an array of objects
  const sections = Object.keys(body);

  return sections
    .map(section =>
      body[section]
        .map(el => {
          let block = "";
          if (el.type === "title") {
            block = `<h4>${el.text}</h4>`;
          } else if (el.type === "div" && el.style === "none") {
            block = el.text
              .map(div => `<div class="article__div">${div}</div>`)
              .join("");
          } else if (el.type === "div" && el.style === "code") {
            block = `<div class="code">${codeParser(el.text)}</div>`;
          } else if (el.type === "ol") {
            block = `<ol>${el.text
              .map(line => `<li>${line}</li>`)
              .join("")}</ol>`;
          } else if (el.type === "img") {
            block = `<img src="${el.image}" alt="image" />`;
          } else if (el.type === "conclusion") {
            block = `<h4>Conclusion</h4>${el.text
              .map(div => `<div class="article__div">${div}</div>`)
              .join("")}`;
          }

          return `<section>${format(block)}</section>`;
        })
        .join("")
    )
    .join("");
};

export default bodyParser;
