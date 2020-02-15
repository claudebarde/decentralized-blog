<script>
  import Router from "svelte-spa-router";
  import Navbar from "./Navbar/Navbar.svelte";
  import Main from "./Routes/Main.svelte";
  import Article from "./Routes/Article.svelte";

  const routes = {
    "/": Main,
    "/post/:name": Article
  };
</script>

<Navbar />
<Router {routes} />
