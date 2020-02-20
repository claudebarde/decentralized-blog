<script>
  import bodyParser from "../body-parser";

  let blankText = `url:
title:
subtitle:
body:{
intro:
section-1:
conclusion:
}`;
  let article = {
    url: "",
    title: "",
    subtitle: "",
    body: {
      intro: [],
      "section-1": [],
      conclusion: []
    },
    signature: "",
    timestamp: Date.now()
  };
  $: output = bodyParser(article.body);

  const buildJSON = text => {
    // parses text in textarea
    let match;
    // checks for url
    match = text.match(/url:(.*)\n/);
    if (match) article = { ...article, url: match[1] };

    // checks for title
    match = text.match(/title:(.*)\n/);
    if (match) article = { ...article, title: match[1] };

    // checks for subtitle
    match = text.match(/subtitle:(.*)\n/);
    if (match) article = { ...article, subtitle: match[1] };

    // gets for body
    let body = text.match(/body:\{(.*)\}/s);
    if (body) {
      // checks for intro
      let introMatch = body[1].match(/intro:(.*)section/s);
      if (introMatch)
        article = {
          ...article,
          body: {
            ...article.body,
            intro: [
              {
                type: "div",
                style: "none",
                text: [...introMatch[1].split("\n").filter(el => el)]
              }
            ]
          }
        };
    }
  };

  const updateInput = event => {
    buildJSON(event.target.value);
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
      {@html output}
    </div>
  </div>
  <div class="input">
    <textarea on:keyup={updateInput}>{blankText}</textarea>
  </div>
</div>
