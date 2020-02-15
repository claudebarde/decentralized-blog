<script>
  import moment from "moment";
  import { push } from "svelte-spa-router";
  import tableOfContents from "../table_of_contents.json";
</script>

<style>
  .description {
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 1.1rem;
    align-items: stretch;
    margin-bottom: 20px;
  }

  .avatar img {
    width: 60px;
    border-radius: 25px;
  }

  .description__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
  }

  .title,
  .timestamp,
  .subtitle {
    margin: 20px 0px;
  }

  .entry {
    padding: 20px 0px;
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
    color: #38b2ac;
    cursor: pointer;
  }

  .timestamp,
  .hash {
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 1000px) {
    main {
      width: 90%;
    }
  }
</style>

<main>
  <div class="description">
    <div class="avatar">
      <img src="claude.png" alt="avatar" />
    </div>
    <div class="description__text">
      <div>Personal blog by Claude Barde</div>
      <div>Development of decentralized applications</div>
    </div>
  </div>
  {#each tableOfContents as article}
    <div class="entry">
      <div class="title" on:click={() => push(`/post/${article.url}`)}>
        {article.title}
      </div>
      <div class="subtitle">{article.subtitle}</div>
      <div class="timestamp">
        {moment(article.timestamp).format('dddd, MMMM Do YYYY')}
      </div>
      <div class="hash">IPFS hash: {article.hash}</div>
    </div>
  {/each}
</main>
