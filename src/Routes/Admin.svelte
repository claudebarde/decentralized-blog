<script>
  import bodyParser from "../body-parser";
  import store from "../store/store";

  let JSONdisplay = false;
  let rawInput = `url:
title:
subtitle:
body:{
intro:
section-1:
conclusion:
}`;
  $: article = $store;

  const buildJSON = text => {
    // parses text in textarea
    let match;
    // checks for url
    match = text.match(/url:(.*)\n/);
    if (match) store.updateURL(match[1]);

    // checks for title
    match = text.match(/title:(.*)\n/);
    if (match) store.updateTitle(match[1]);

    // checks for subtitle
    match = text.match(/subtitle:(.*)\n/);
    if (match) store.updateSubtitle(match[1]);

    // gets for body
    let body = text.match(/body:\{(.*)\}/s);
    if (body) {
      // checks for intro
      let introMatch = body[1].match(/intro:(.*?)section/s);
      if (introMatch) {
        store.updateIntro([
          {
            type: "div",
            style: "none",
            text: [...introMatch[1].split("\n").filter(el => el)]
          }
        ]);
      } else {
        store.updateIntro([]);
      }
      // checks for section
      let sectionMatch = [
        ...body[1].matchAll(/section-([0-9]*):\{\{(.*?)\}\}/gs)
      ];
      if (sectionMatch.length > 0) {
        // parses section content
        sectionMatch.map(section => {
          const sectionBlocks = section[2]
            .trim()
            .split("\n")
            .filter(el => el);
          const newSection = sectionBlocks.map(block => {
            block = block.trim();
            if (block.slice(0, 3) === "div") {
              // regular text block
              return {
                type: "div",
                style: "none",
                text: block.slice(4).split("//")
              };
            } else if (block.slice(0, 5) === "title") {
              // subtitle
              return {
                type: "title",
                style: "none",
                text: [block.slice(6)]
              };
            } else if (block.slice(0, 8) === "subtitle") {
              // subtitle
              return {
                type: "subtitle",
                style: "none",
                text: [block.slice(9)]
              };
            } else if (block.slice(0, 3) === "img") {
              // subtitle
              return {
                type: "img",
                style: "none",
                image: `https://gateway.pinata.cloud/ipfs/${block.slice(4)}`
              };
            } else if (block.slice(0, 4) === "code") {
              // code block
              return {
                type: "div",
                style: "code",
                text: block
                  .slice(5)
                  .split("[line]")
                  .map(line => line.split("[return]"))
              };
            } else if (block.slice(0, 2) === "ol") {
              // code block
              return {
                type: "ol",
                style: "none",
                text: block
                  .slice(3)
                  .split("//")
                  .map(line => line)
              };
            } else if (block.slice(0, 2) === "ul") {
              // code block
              return {
                type: "ul",
                style: "none",
                text: block
                  .slice(3)
                  .split("//")
                  .map(line => line)
              };
            }
          });

          store.addSection({ number: section[1], block: newSection });
        });
      }
    }
  };

  const updateInput = event => {
    rawInput = event.target.value;
    buildJSON(rawInput);
  };
</script>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    font-size: 1.3rem;
    padding: 100px 5px 0px 20px;
    height: 90%;
  }

  .output {
    width: 60%;
    height: 100%;
    overflow: auto;
  }

  .input {
    width: 40%;
  }
  .input textarea {
    width: 90%;
    height: 90%;
    font-size: 1rem;
  }
</style>

<div class="container">
  <div class="output">
    <h2>{article.title}</h2>
    <h3>{article.subtitle}</h3>
    <div>
      {@html bodyParser(article.body)}
    </div>
  </div>
  <div class="input">
    <textarea
      on:keyup={updateInput}
      value={JSONdisplay ? JSON.stringify(article) : rawInput} />
    <button on:click={() => (JSONdisplay = false)}>Raw input</button>
    <button on:click={() => (JSONdisplay = true)}>JSON</button>
  </div>
</div>
