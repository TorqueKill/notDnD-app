<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let items;
    export let itemOn;

</script>


<div class="tabs">
    <ul>
        {#each items as item}
            <li on:click={()=>dispatch("changedTab",item)}>
                <div class:active={item === itemOn}>{item}</div>
            </li>
        {/each}

    </ul>

</div>


<style>
    .tabs{
        margin-bottom: 40px;
    }
    ul{
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    li{
        margin: 0 20px;
        cursor: pointer;
    }
    .active{
        border-bottom: 2px solid lightblue;
        padding-bottom: 8px;
    }

</style>