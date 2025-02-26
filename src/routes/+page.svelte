<script lang="ts">
  import LoaderIcon from "$lib/icons/Loader.svelte";

  const gif = "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZjZ3Y3b3FmdnE1bDNrZ3liYXczaXY2bGM0c2huaXY3MXdqcmNkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9Gja0BFKtLkW85iXPH/giphy.gif";
  let data = "";

  (async () => {
    try {
      const url = "https://goals-api.diogoqueiros.workers.dev/goals";
      const res = await fetch(url);
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
    width: 20vw;
    margin-top: 30px;
  }

  .header {
    font-size: 4vw;
    font-weight: bold;
  }
  
  .number {
    font-size: 16vw;
    font-weight: bold;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(359deg); }
  }

  :global(.icon) {
    animation: spin 2s linear infinite;
  }
</style>

<main>
  <p data-testid="header" class="header">Cristiano Ronaldo road to 1000 goals</p>
  <img data-testid="gif" src={gif} alt="CR7" />

  {#if data}
    <p data-testid="number" class="number">{data}</p>
  {:else}
    <LoaderIcon testId="loading" className="icon" width={200} height={200} />
  {/if}
</main>
