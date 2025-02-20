<script lang="ts">
  import LoaderIcon from "../public/assets/icons/Loader.svelte";

  let data = "";

  (async () => {
    try {
      const res = await fetch("http://localhost:3000/goals");
      const { goals } = await res.json();
      data = goals;
    } catch (error) {
    }
  })();
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #000;
    color: #fff;
    text-align: center;
  }

  img {
    margin-bottom: 20px;
  }
  
  .number {
    font-size: 24vw;
    font-weight: bold;
  }
</style>

<main>
  <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZjZ3Y3b3FmdnE1bDNrZ3liYXczaXY2bGM0c2huaXY3MXdqcmNkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Gja0BFKtLkW85iXPH/giphy.gif" alt="CR7" />

  {#if data}
    <div class="number">{data}</div>
  {:else}
    <LoaderIcon width="200" height="200" />
  {/if}
</main>
