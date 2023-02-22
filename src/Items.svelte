
<script>
    import {StatStore,ItemStore,PlayerStore} from './daddyStore.js';


    let previewItem = null;
    function preview(item){
        previewItem = item
    }

    let defaultItem = {}
    let names = getAttributeList($StatStore,"name");
    let statObjs = filterObjectsByAttribute($StatStore,"id");


    ItemStore.subscribe((data)=>{
      let newID = nextId(data);
      let statList = []
      for (let x in statObjs){
        statList.push({name:statObjs[x].name,value:100,id:statObjs[x].id})
        break;
      }

      defaultItem = { name: `Item ${newID}`, desc: "Item Desc",stats:statList,id:newID}
    })

    function getAttributeList(objects, x) {
        return objects.map(obj => obj[x]);
    }

    function filterObjectsByAttribute(objects, attribute) {
      return objects.filter(obj => obj.hasOwnProperty(attribute));
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


    function cancel() {
        previewItem = null;
    }

  
    function save() {
        ItemStore.update((items) => {
        const index = items.findIndex((s) => s === previewItem);
        items[index] = previewItem;
        return items;
      });
      previewItem = null;
    }

    function update(item, value) {
        ItemStore.update((items) => {
        const index = items.findIndex((s) => s === item);
        items[index][value.key] = value.value;
        return items;
      });
    }

    function updatePreview(value,key){
      previewItem[key] = value;
    }



    function addDefaultItem (){
        ItemStore.update((items)=>{
            items.push(defaultItem)
            return items;
        })
    }


    const delItem = (id)=>{
      ItemStore.update(data=>{
        return data.filter(item => item.id != id);
      })
      PlayerStore.update(players=>{
        let temp = []
        for (let player in players){
          temp = players[player].items.filter(i=>i.id != id)
          players[player].items = temp
        }
        return players
      })
    }

    function checkList(stats){
      let statIDs = getAttributeList(stats,"id")
      let statNames = getAttributeList($StatStore,"id")

    }

    //Dynamically adds the stat and renders the edit section
    function handleAddStatClick(id){
      ItemStore.update(items=>{
        let index = items.findIndex(i=>i.id === id)
        let temp2 = items[index].stats.push({name:"Health",value:100,id:1})

        return items
      })
    }

    function updateStatName(value,id){
      value = value.split(",")
      let index = previewItem["stats"].findIndex(s=>s.id === id)
      previewItem["stats"][index].name = value[0]
      previewItem["stats"][index].id = Number(value[1])
    }

    function updateStatValue(value,id){
      let index = previewItem["stats"].findIndex(s=>s.id === id)
      previewItem["stats"][index].value = Number(value)

    }

</script>






<button class="AddStat" on:click={addDefaultItem}>Add Item</button>
  <div class="DisplayStats">
    {#each $ItemStore as item}
      <div class="statBox">
        {#if previewItem === item}
          <div class="editStat">
            <button class="delStat" on:click|capture={()=>delItem(item.id)}>X</button>
            <h1>
              <input class="editInput" type="text" value={previewItem.name} on:input={e => updatePreview(e.target.value,"name") } />
            </h1>
            <p>
              <input class="editInput" type="text" value={previewItem.desc}  maxlength="80" on:input={e => updatePreview(e.target.value,"desc")} />
            </p>


            <div class="selectDiv">
            <!--for each item, for each stat in that item, display all options-->
            {#each item.stats as stat}
              <select id="select-option" on:change={e=>updateStatName(e.target.value,stat.id)}>
                  <option value={[stat.name,stat.id]}>{stat.name}</option>
              {#each statObjs as option}
                  {#if stat.name != option.name}
                  <option value={[option.name,option.id]}>{option.name}</option>
                  {/if}
              {/each}
              </select>
              <input class="selectInput" type="number" value={stat.value} on:input={e=>updateStatValue(e.target.value,stat.id)}/>
            {/each}
            </div>

            <button class ="addStatButt" on:click={()=>handleAddStatClick(item.id)}>Add Stat</button>

            <div class="editStatActions">
              <button on:click={cancel}>Cancel</button>
              <button on:click={save}>Save</button>
            </div>
          </div>
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div class="viewStat" on:click={() => preview(item)}>
            <h1>{item.name}</h1>
            <p>Desc: {item.desc}</p>
            {#each item.stats as stat}
                <p>{stat.name}: {stat.value > 0 ? '+' : ''}{stat.value}</p>
            {/each}
          </div>
        {/if}
      </div>
    {:else}
      <p>No items :(</p>
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
    .selectDiv{
      width: 100%;
    }
  
    .editStatActions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  
    .addStatButt,.editStatActions button {
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
    .addStatButt:hover{
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