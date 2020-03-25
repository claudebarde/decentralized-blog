<script>
  import { onMount } from "svelte";
  import moment from "moment";
  import bodyParser from "../body-parser.js";
  import tableOfContents from "../table_of_contents.json";
  //import example from "../example/example.json";

  export let params = {};
  let article = undefined;
  let errorMessage = undefined;

  onMount(async () => {
    // fetches article from IPFS
    if (params.name) {
      errorMessage = undefined;
      // retrieves IPFS hash
      const entry = tableOfContents.filter(el => el.url === params.name);
      if (entry.length === 1) {
        errorMessage = undefined;
        try {
          const json = await fetch(
            `https://gateway.pinata.cloud/ipfs/${entry[0].hash}`
          );
          article = await json.json();
        } catch (error) {
          //article = example;
          article = undefined;
          errorMessage = "Article could not be fetched, please try again.";
        }
      } else {
        article = undefined;
        errorMessage = "IPFS hash not found";
      }
    } else {
      article = undefined;
      errorMessage = "No post reference provided!";
    }
  });
</script>

<svelte:head>
  <title>{article ? article.title + ' - DecentraDev' : 'Loading...'}</title>
</svelte:head>

<main class="article">
  {#if article}
    {#each Object.keys(article) as item}
      {#if item === 'title'}
        <h2>{article.title}</h2>
      {:else if item === 'subtitle'}
        <h3>{article.subtitle}</h3>
      {:else if item === 'banner'}
        <div class="banner">
          <img
            src="https://gateway.pinata.cloud/ipfs/{article.banner}"
            alt="banner" />
        </div>
      {:else if item === 'body'}
        {@html bodyParser(article.body)}
      {:else if item === 'signature'}
        <div class="signature">
          {moment(article.timestamp).format('dddd, MMMM Do YYYY')}
          <br />
          <br />
          {article.signature}
        </div>
      {/if}
    {/each}
  {:else if errorMessage}
    <div>{errorMessage}</div>
  {:else}
    <div>Loading...</div>
    <div>
      Retrieving data from the IPFS can take a minute or two, please be patient.
    </div>
  {/if}
</main>
