<script>
  import Router from "svelte-spa-router";
  import Navbar from "./Navbar/Navbar.svelte";
  import Main from "./Routes/Main.svelte";
  import Article from "./Routes/Article.svelte";
  import Admin from "./Routes/Admin.svelte";

  const routes = {
    "/": Main,
    "/post/:name": Article,
    "/admin": Admin
  };
</script>

<Navbar />
<Router {routes} />
