<script>
  import { push } from "svelte-spa-router";

  const fontColor = "#2d3748";
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f0fff4;
    padding: 20px 0px;
    font-size: 1.2rem;
    color: #2d3748;
  }

  .container {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .title {
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .icons div {
    display: inline-block;
    margin: 0px 3px;
  }
  .icons div a {
    text-decoration: none;
    color: inherit;
  }

  @media only screen and (max-width: 1000px) {
    nav {
      width: 100vw;
    }

    .container {
      width: 95%;
    }
  }
</style>

<nav>
  <div class="container">
    <div class="title" on:click={() => push('/')}>DecentraDev</div>
    <div class="icons">
      <div>
        <a
          href="https://github.com/claudebarde"
          target="_blank"
          rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25px"
            height="25px"
            viewBox="0 0 30 30"
            style={`fill:${fontColor};`}>
            <path
              d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051
              c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526
              c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769
              c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098
              c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9
              c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594
              c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734
              c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
          </svg>
        </a>
      </div>
      <div>
        <a
          href="https://medium.com/@claudebarde"
          target="_blank"
          rel="noopener noreferrer">
          <svg
            style={`fill:${fontColor};`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="25px"
            height="25px">
            <path
              d="M45,4H5C4.448,4,4,4.448,4,5v40c0,0.552,0.448,1,1,1h40c0.552,0,1-0.448,1-1V5C46,4.448,45.552,4,45,4z
              M40,13.5
              l-1.821,2.197C38.064,15.811,38,15.965,38,16.125V32.75c0,0.16,0.064,0.314,0.179,0.428L40,35.546V36H30v-0.454l2.821-2.368
              C32.936,33.064,33,32.91,33,32.75V17.879L24.848,36h-0.001h-1.543l0,0L15,18.375v13.108c0,0.22,0.076,0.433,0.215,0.605L18,35.546
              V36h-8v-0.454l2.783-3.438C12.923,31.936,13,31.721,13,31.5V16.388c0-0.142-0.05-0.279-0.142-0.388L11,13.5V13h7.097l7.624,16.183
              L33.002,13H40V13.5z" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</nav>
