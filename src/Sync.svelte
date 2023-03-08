<script>
    import {localID,PlayerStore,StatStore,ItemStore} from './daddyStore'
    import CopyToClipboard from "svelte-copy-to-clipboard";
    import Peer from "simple-peer/simplepeer.min.js";
    import { onMount } from 'svelte';
    var peer = new Peer({ initiator: true, trickle: false })
    let _id = ''
    let local_ID = ''
    let connected = false


    onMount(()=>{
        console.log(peer)
        peer.on('signal',data=>{
            console.log(data)
            local_ID = JSON.stringify(data)
        })
        peer.on('connect',()=>{
            console.log("DOCKING COMPLETE")
            connected = true

        })
    })
    function updateID(value){
        _id = value
    }
    function handleSync(){
/*         StatStore.update(()=>{
            let temp = db.get(`${_id}_Stats`)
            console.log(temp)
            return JSON.parse(temp.data)
        })
        ItemStore.update(()=>{
            let temp = db.get(`${_id}_Items`)
            console.log(temp)
            return JSON.parse(temp.data)
        })
        PlayerStore.update(()=>{
            let temp = db.get(`${_id}_Players`)
            console.log(temp)
            return JSON.parse(temp.data)
        }) */

        peer.signal(JSON.parse(_id))
    }

    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text);
    }


</script>

<div class="Sync Comp Body">
    <div class="ID body">
        {#if connected}
            <p>DOCKING COMPLETE WOOO</p>
        {/if}
        <h1>Sync ID:</h1>
        <div class="truncate">{local_ID}
        </div>
        <button on:click={() => copyTextToClipboard(local_ID)}>COPY</button>
        <button on:click={handleSync}>Sync</button>
        <input on:change={e=>updateID(e.target.value)}>
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