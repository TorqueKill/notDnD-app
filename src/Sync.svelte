<script>
    import { onMount } from 'svelte';
    import {PlayerStore,StatStore,ItemStore,Connection} from './daddyStore'

    onMount(()=>{
        console.log($Connection)
    })
    let _id = ''

    function updateID(value){
        _id = value
    }
    function handleSync(){
        $Connection.peer.signal(JSON.parse(_id))
    }

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text);
    }


</script>

<div class="Sync Comp Body">
    <div class="ID body">
        {#if $Connection.isConnected}
            <p>SYNCED UP</p>
        {:else}
            <h1>Sync ID:</h1>
            <div class="truncate">{$Connection.id}</div>
            <button on:click={() => copyTextToClipboard($Connection.id)}>COPY</button>
            <button on:click={handleSync}>Sync</button>
            <input on:change={e=>updateID(e.target.value)}>
        {/if}
    </div>

</div>

<style>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20%;
  display: inline-block;
  vertical-align: middle;
}
</style>