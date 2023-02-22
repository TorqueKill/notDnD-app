
<script>
    import {StatStore,ItemStore} from './daddyStore.js';


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
        //break;
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
    }


    function checkList(stats){
      let statIDs = getAttributeList(stats,"id")
      let statNames = getAttributeList($StatStore,"id")

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
              <input class="editInput" type="text" value={previewItem.name} on:input={e => update(previewItem, { key: 'name', value: e.target.value })} />
            </h1>
            <p>
              <input class="editInput" type="text" value={previewItem.desc}  maxlength="80" on:input={e => update(previewItem, { key: 'desc', value: e.target.value })} />
            </p>
            <div class="selectDiv">
            {#each item.stats as stat}
              <select id="select-option" >
                  <option value={stat.name}>{stat.name}</option>
              {#each names as option}
                  {#if stat.name != option}
                  <option value={option}>{option}</option>
                  {/if}
              {/each}
              </select>
              <input class="selectInput" type="number" value={stat.value}/>
            {/each}
            </div>

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
                <p>{stat.name} {stat.value}</p>
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