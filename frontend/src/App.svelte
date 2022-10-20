<script>
  import Router from 'svelte-spa-router'
  import Home from "./routes/Home.svelte"

  const routes = {
    '/': Home,
  }
</script>

<Router {routes}/>
