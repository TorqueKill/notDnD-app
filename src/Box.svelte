<script>
    export let boxDesc
    export let boxAllowed = false
    const butt1 = () =>{
        boxAllowed = false
    }
</script>

{#if boxAllowed}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="backdrop" on:click|self>
    <div class="modal">
        <slot name="title"></slot>
        <slot></slot>
        <button on:click class="closeButt">X</button>
    </div>
</div>
{/if}

<style>
    h1{
        color: #ffffff;
    }
    .backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.82);
    }
    .modal{
        padding: 10px;
        border-radius: 10px;
        max-width: 400px;
        margin: 10% auto;
        text-align: center;
        background: #ffffff38;
        position: relative;
    }
    .closeButt{
        width: 20px;
        padding: 5px;
        border-radius: 5px;
        color: rgb(0, 0, 0);
        background-color: #fafafaa6;
        margin: 2% auto;
        position:absolute;
        top:0;
        right:5px;
    }

</style>