<script>
    let name;

    const handleSubmit = ()=>{
        console.log(name)
    }
</script>


<form on:submit|preventDefault={handleSubmit}>
    <p style="color: white;">Name: </p>
	<input type="text" placeholder="name" bind:value={name}>
	<button>giv</button>
</form>


<style>
</style>