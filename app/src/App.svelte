<script>

	let name = "MAN";
	let fname = "Firstname"
	let lname = "Lastname"
	let num = 0
	let var1 = {location:["spawn","townhall","armory"],items:[{name:"ironSword",desc:"atk: +10"},{name:"swiftBoots",desc:"agi: +10"}]}

	$:fullName = `${fname}-${lname}`;

	$:{console.log(name);console.log(fullName)};

	let flag = false;
	const butt1 = () =>{
		if (flag){name = "MAN";flag=false}
		else{name = "WOMAN";flag=true}
	};

	const butt3 = () =>{
		num = num + 1;
	};

	const butt2 = (id) => {
		people = people.filter((x)=>x.id != id)
	};

	let people = [
    { name: 'yoshi', beltColour: 'black', age: 25, id: 1 },
    { name: 'mario', beltColour: 'orange', age: 45, id: 2 },
    { name: 'luigi', beltColour: 'brown', age: 35, id: 3 }
	];

</script>

<main>

	{#if num > 10}
		<p>POG</p>
	{/if}
	<h1>Hello {name}</h1>
	<h2>Num : {num}</h2>
	<p>{fullName}</p>
	<button on:click={butt1}>CLICK ME</button>
	<input type="text" bind:value={name}>
	<input type="text" bind:value={fname}>
	<input type="text" bind:value={lname}>
	<button on:click={butt3}>HIT ME</button>

	{#each people as x (x.id) }
		<div>
			<h2>{x.name}</h2>
			<p>is also {x.beltColour}</p>
			{#if x.name==="yoshi"}
				{#each var1.items as item}
					<p>Item: {item.name} desc: {item.desc}</p>
				{/each}
			{/if}
			<button on:click={()=>butt2(x.id)}>KILL</button>
		</div>
	{:else}
		<p>Nah</p>
	{/each}




</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>