<script>
	import Box from './Box.svelte';
	import AddForm from './AddNameForm.svelte';
	import Tabs from './Tabs.svelte';
	import Stats from './Stats.svelte';
	import Options from './SelectOption.svelte';
	import Items from './Items.svelte';
	import Players from './Player.svelte';
	import PlayerDisplay from './PlayerRender.svelte';
	import Sync from './Sync.svelte';
	import {StatStore,ItemStore,PlayerStore,Connection} from './daddyStore'

	let boxBool = true
	let items = ["Main","Stats","Items","Players","Sync"];
	let itemOn = "Main";
	let flag = false;
	const butt1 = () =>{
		boxBool = !boxBool
	};

/* 	const butt2 = (id) => {
		people = people.filter((x)=>x.id != id)
	}; */

	const butt3 = (e) => {
		itemOn = e.detail
	}

/* 	let people = [
    { name: 'yoshi', beltColour: 'black', age: 25, id: 1 },
    { name: 'mario', beltColour: 'orange', age: 45, id: 2 },
    { name: 'luigi', beltColour: 'brown', age: 35, id: 3 }
	]; */


	StatStore.subscribe((data)=>{
    	console.log($Connection);
    	let strData = JSON.stringify(data)
    	localStorage.setItem("localStats",strData)
    	if ($Connection.isConnected){console.log("stats");$Connection.peer.send(strData)}

	})
	ItemStore.subscribe((data)=>{
    	console.log("items");
    	let strData = JSON.stringify(data)
    	localStorage.setItem("localItems",JSON.stringify(data))
    	if ($Connection.isConnected){console.log("items");$Connection.peer.send(strData)}
	})
	PlayerStore.subscribe((data)=>{
    	console.log("players");
    	let strData = JSON.stringify(data)
    	localStorage.setItem("localPlayers",JSON.stringify(data))
    	if ($Connection.isConnected){console.log("players");$Connection.peer.send(strData)}
	})

</script>

<!-- <Box boxDesc="Wee is weak shit" boxAllowed={boxBool} on:click={butt1}>
	<AddForm/>
	<div slot="title"><h1>YooHoo</h1></div>
</Box> -->

<main>

	<Tabs {items} {itemOn} on:changedTab={butt3}></Tabs>
	{#if itemOn === "Main"}
		<PlayerDisplay/>
	{:else if itemOn === "Stats"}
		<Stats/>
	{:else if itemOn === "Items"}
		<Items/>
	{:else if itemOn === "Players"}
		<Players/>
	{:else if itemOn === "Sync"}
		<Sync/>
	{/if}

	<!-- <button on:click={butt1}>mODaLe</button> -->
<!-- 	{#each people as x (x.id) }
		<div>
			<h1>{x.name}</h1>
			<p>is also {x.beltColour}</p>
			<button on:click={()=>butt2(x.id)}>KILL</button>
		</div>
	{:else}
		<p>Nah</p>
	{/each} -->




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
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>