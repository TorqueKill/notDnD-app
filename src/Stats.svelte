<script>
    import { ItemStore, StatStore, PlayerStore } from './daddyStore.js';
    import { createEventDispatcher } from 'svelte';

    
   
    let defaultStat = { name: `Stat 1`, min: 0, max: 100, default: 100, desc: "Stat Desc" ,id:1};
    StatStore.subscribe((data)=>{
      let newID = nextId(data);
      defaultStat = { name: `Stat ${newID}`, min: 0, max: 100, default: 100, desc: "Stat Desc",id:newID };
    })
  
    let previewStat = null;

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

  
    function preview(stat) {
      console.log(stat,"PREVIEW 2")
      previewStat = stat;
    }
  
    function update(stat, value) {
      StatStore.update((stats) => {
        const index = stats.findIndex((s) => s === stat);
        stats[index][value.key] = value.value;
        return stats;
      });
    }
  
    function cancel() {
      previewStat = null;
    }
  
    function save() {
      StatStore.update((stats) => {
        const index = stats.findIndex((s) => s === previewStat);
        stats[index] = previewStat;
        return stats;
      });
      previewStat = null;
    }
  
    function addDefaultStat() {
      StatStore.update((stats) => {
        stats.push(defaultStat);
        return stats;
      });
    }

    const delStat = (id)=>{
      StatStore.update(data=>{
        return data.filter(stat => stat.id != id);
      })
      ItemStore.update(items=>{
        let temp = []
        for (let item in items){
          temp = items[item].stats.filter(s=>s.id != id)
          items[item].stats = temp
        }
        return items;
      })
      PlayerStore.update(players=>{
        let temp = []
        for (let player in players){
          temp = players[player].stats.filter(s=>s.id != id)
          players[player].stats = temp
        }
        return players;
      })
    }
  
  </script>
  
  <button class="AddStat" on:click={addDefaultStat}>Add Stat</button>
  <div class="DisplayStats">
    {#each $StatStore as stat}
      <div class="statBox">
        {#if previewStat === stat}
          <div class="editStat">
            <button class="delStat" on:click|capture={()=>delStat(stat.id)}>X</button>
            <h1>
              <input type="text" value={previewStat.name} on:input={e => update(previewStat, { key: 'name', value: e.target.value })} />
            </h1>
            <p>
              <input type="number" value={previewStat.min} on:input={e => update(previewStat, { key: 'min', value: Number(e.target.value) })} />
            </p>
            <p>
              <input type="number" value={previewStat.max} on:input={e => update(previewStat, { key: 'max', value: Number(e.target.value) })} />
            </p>
            <p>
              <input type="number" value={previewStat.default} on:input={e => update(previewStat, { key: 'default', value: Number(e.target.value) })} />
            </p>
            <p>
              <input type="text" value={previewStat.desc}  maxlength="80" on:input={e => update(previewStat, { key: 'desc', value: e.target.value })} />
            </p>
            <div class="editStatActions">
              <button on:click={cancel}>Cancel</button>
              <button on:click={save}>Save</button>
            </div>
          </div>
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="viewStat" on:click={() => preview(stat)}>
            <h1>{stat.name}</h1>
            <p>Min: {stat.min}</p>
            <p>Max: {stat.max}</p>
            <p>Default: {stat.default}</p>
            <p>Desc: {stat.desc}</p>
          </div>
        {/if}
      </div>
    {:else}
      <p>No stats :(</p>
    {/each}
  </div>


  <style>
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

    .DisplayStats {
      display: flex;
      flex-wrap: wrap;
      padding: 20px;
      box-sizing: border-box;

    }
  
    .AddStat {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      margin-bottom: 20px;
    }
  
    .AddStat:hover {
      background-color: #3e8e41;
    }
  
    .statBox {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
      width: calc(33% - 10px);
      margin-bottom: 20px;
      margin-right: 10px;
    }
  
    .viewStat{
        position: relative;
        text-align:left;
        padding: 20px;
        cursor: pointer;
    }
    .editStat {
      padding: 20px;
      cursor: pointer;
      position: relative;
    }
  
    .viewStat:hover,.editStat:hover {
      background-color: #f5f5f5;
    }
  
    .editStat {
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    }
  
    .editStat h1 {
      margin: 0;
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    .editStat input {
      font-size: 16px;
      padding: 5px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      margin-bottom: 10px;
      box-sizing: border-box;
    }
  
    .editStatActions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  
    .editStatActions button {
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .editStatActions button:hover {
      background-color: #3e8e41;
    }
  
    .viewStat h1 {
      margin: 0 ;
      font-size: 20px;
      margin-bottom: 10px;
    }
  
    .viewStat p {
      margin: 0;
      font-size: 16px;
      margin-bottom: 5px;
    }
  </style>