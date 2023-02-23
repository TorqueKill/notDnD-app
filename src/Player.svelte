<script>
    import {StatStore,ItemStore,PlayerStore} from './daddyStore.js';
    let playerPreview = null;
    let itemCount = {};

    

    function preview(player){
        playerPreview = player;
    }

    function updatePreview(value,attribute){
        playerPreview[attribute] = value;
    }

    function cancel(){
        playerPreview = null;
    }


    function isIdInList(id, list) {
      return list.some(item => item.id === id);
    }

    function nextId(list){
      let id = 1;
      while(isIdInList(id,list)){
        id = id + 1;
      }
      return id;
    }

    function save(){
        PlayerStore.update((players) => {
        const index = players.findIndex((p) => p === playerPreview);
        players[index] = playerPreview;
        return players;
      });
      playerPreview = null;
    }

    function updateStatName(value,id){
      value = value.split(",")
      let index = playerPreview["stats"].findIndex(s=>s.id === id)
      playerPreview["stats"][index].name = value[0]
      playerPreview["stats"][index].id = Number(value[1])
    }

    function updateStatValue(value,id){
      let index = playerPreview["stats"].findIndex(s=>s.id === id)
      playerPreview["stats"][index].value = Number(value)

    }

    function handleAddStatClick(id){
      PlayerStore.update(players=>{
        let index = players.findIndex(i=>i.id === id)
        let temp2 = players[index].stats.push({name:"Health",value:100,id:1})

        return players
      })
    }

    function handleAddItemClick(id){
        PlayerStore.update(players=>{
            let index = players.findIndex(p=>p.id === id)
            let temp = $ItemStore[0]
            players[index].items.push({name:temp.name,id:temp.id})
            return players
        })
    }

    function addPlayerDefault(){
        let newID = nextId($PlayerStore)
        let defaultStat = {}
        let defaultPlayer = {id:newID,name:`Player ${newID}`,desc:"Player Desc",stats:[],items:[]}
        if ($StatStore.length>0){
            defaultStat = $StatStore[0];
            defaultPlayer = {id:newID,name:`Player ${newID}`,desc:"Player Desc",stats:[{name:defaultStat.name,value:defaultStat.default,id:defaultStat.id}],items:[]}
        }
        PlayerStore.update((players)=>{
            players.push(defaultPlayer)
            return players
        })

    }

    function updateItemName(value,id){
        value = value.split(",")
        let index = playerPreview["items"].findIndex(s=>s.id === id)
        playerPreview["items"][index].name = value[0]
        playerPreview["items"][index].id = Number(value[1])

    }

    function itemCounts(player,itemID){
        let res = player["items"].filter(i=>i.id === itemID)
        itemCount[itemID] = 1
        return res.length
    }

    function delPlayer(id){
        PlayerStore.update(players=>{
            return players.filter(p=>p.id != id)
        })
    }

</script>

<button class="addPlayer" on:click={addPlayerDefault}>Add Player</button>
<div class="PlayerDisplay">
    {#each $PlayerStore as player}
        <div class="playerBox">
        {#if playerPreview === player}
            <div class="editPlayer">
                <button class="delStat" on:click|capture={()=>delPlayer(player.id)}>X</button>
                <h1>
                    <input class="editInput" value={player.name} on:input={e=>updatePreview(e.target.value,"name")}>
                </h1>
                <p>
                    <input class="editInput" value={player.desc} maxlength="50" on:input={e=>updatePreview(e.target.value,"desc")}>
                </p>

                <div class="selectDiv">
                    <!--for each item, for each stat in that item, display all options-->
                    {#each player.stats as stat}
                      <select id="select-option" on:change={e=>updateStatName(e.target.value,stat.id)}>
                          <option value={[stat.name,stat.id]}>{stat.name}</option>
                      {#each $StatStore as option}
                          {#if stat.name != option.name}
                          <option value={[option.name,option.id]}>{option.name}</option>
                          {/if}
                      {/each}
                      </select>
                      <input class="selectInput" type="number" value={stat.value} on:input={e=>updateStatValue(e.target.value,stat.id)}/>
                    {/each}
                </div>

                {#if $StatStore.length>0}
                <button class ="addButt" on:click={()=>handleAddStatClick(player.id)}>Add Stat</button>
                {/if}

                <div class="selectDiv2">
                    <!--for each item, for each stat in that item, display all options-->
                    {#each player.items as item}
                      <select id="select-option" on:change={e=>updateItemName(e.target.value,item.id)}>
                          <option value={[item.name,item.id]}>{item.name}</option>
                      {#each $ItemStore as option}
                          {#if item.name != option.name}
                          <option value={[option.name,option.id]}>{option.name}</option>
                          {/if}
                      {/each}
                      </select>
                    {/each}
                </div>

                {#if $ItemStore.length>0}
                <button class ="addButt" on:click={()=>handleAddItemClick(player.id)}>Add Item</button>
                {/if}

                <div class="editStatActions">
                    <button on:click={cancel}>Cancel</button>
                    <button on:click={save}>Save</button>
                </div>

            </div>
        {:else}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="viewPlayer" on:click={()=>preview(player)}>
                <h1>{player.name}</h1>
                <p>{player.desc}</p>
                <h2>stats: </h2>
                
                {#each player.stats as stat}
                    <p>{stat.name} {stat.value}</p>
                {:else}
                    <p>No Stats</p>
                {/each}


                <h3>items: </h3>
                <div class="items">
                    {#each player.items as item}
                        <p>{item.name}</p>
                    {:else}
                        <p>No Items</p>
                    {/each}
                </div>

            </div>
        {/if}
        </div>
    {:else}
        <p>no players lmao</p>
    {/each}

</div>



<style>

    .PlayerDisplay{
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      box-sizing: border-box;

    }

    .playerBox {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
      width: calc(33% - 10px);
      margin-bottom: 20px;
      margin-right: 10px;
    }

    .viewPlayer{
        position: relative;
        text-align:left;
        padding: 20px;
        cursor: pointer;
    }


    .viewPlayer h1 {
      margin: 0 ;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .viewPlayer h2 {
      margin: 0 ;
      font-size: 15px;
    }
    .viewPlayer h3 {
      margin: 0 ;
      font-size: 15px;
    }
  
    .viewPlayer p {
      margin: 0;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .items{
        text-align: justify;
    }
    .items p{
        font-size: 16px;
        margin-right: 5px;
        margin-bottom: 0px;
    }

    .selectDiv{
      width: 100%;
    }

    .addButt,.editStatActions button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }

    .editStatActions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .editStatActions button:hover {
      background-color: #3e8e41;
    }
    .addButt:hover{
      background-color: #3e8e41;
    }


    .editPlayer {
      padding: 20px;
      cursor: pointer;
      position: relative;
    }


    .editPlayer {
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    }
  
    .editPlayer h1 {
      margin: 0;
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    .editInput {
      font-size: 16px;
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
    .selectInput{
      font-size: 16px;
      padding: 5px 10px;
      border: 1px solid #140b0b;
      border-radius: 4px;
      width: 70%;
      margin-bottom: 10px;
      box-sizing: border-box;
    }


    .addPlayer {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  
    .addPlayer:hover {
      background-color: #3e8e41;
    }

    .delStat{
      position: absolute;
      border-radius: 5px;
      top: 0;
      right: 0;
      background-color: #ee9494;
      color: white;
      border: none;
      padding: 5px 5px;
      cursor: pointer;
      font-size: 12px;
    }
    .delStat:hover{
      background-color: #e87575;
    }

</style>