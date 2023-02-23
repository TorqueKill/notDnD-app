<script>
    import {StatStore,ItemStore,PlayerStore} from './daddyStore.js';
</script>

<div class="displayPlayers">
    {#each $PlayerStore as player}
      <div class="playerBox">
        <div class="playerInfo">
          <h1>{player.name}</h1>
          <p>{player.desc}</p>
        </div>
  
        <div class="statsAndItems">
          <div class="playerStats">
            <h2>Stats:</h2>
            <div class="statsList">
              {#each player.stats as stat}
                <div class="statBox">
                  <p>{stat.name}: <span>{stat.value}</span></p>
                </div>
              {:else}
                <p class="noStats">No stats :(</p>
              {/each}
            </div>
          </div>
  
          <div class="playerItems">
            <h2>Items:</h2>
            <div class="itemsList">
              {#each player.items as item}
                <div class="itemBox">
                  <p>{item.name}</p>
                </div>
              {:else}
                <p class="noItems">No items :(</p>
              {/each}
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  
    .displayPlayers {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      padding: 20px;
      font-family: sans-serif;
    }
  
    .playerBox {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
      margin: 20px;
      width: 80%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
    }
  
    .playerInfo {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
  
    .playerInfo h1 {
      font-size: 28px;
      margin-bottom: 5px;
    }
  
    .playerInfo p {
      color: #666;
      font-size: 16px;
      line-height: 1.5;
    }
  
    .statsAndItems {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 20px;
    }
  
    .playerStats,
    .playerItems {
      width: 45%;
    }
  
    .statsList,
    .itemsList {
      margin-top: 10px;
    }
  
    .statBox,
    .itemBox {
      background-color: #eee;
      border-radius: 4px;
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .statBox p,
    .itemBox p {
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      margin: 0;
    }
  
    .statBox p span {
      font-weight: bold;
    }
  
    .noStats,
    .noItems {
      color: #666;
      font-size: 16px;
      margin-top: 10px;
    }
  
    h2 {
      color: #333;
      font-size: 18px;
      font-weight: bold;
      margin-right: 10px;
    }
</style>

<!-- <div class="displayPlayers">

    {#each $PlayerStore as player}
      <div class="playerBox">
        <div class="playerInfo">
          <h1>{player.name}</h1>
          <p>{player.desc}</p>
        </div>
        <div class="playerStats">
          <h2>Stats:</h2>
          {#each player.stats as stat}
            <div class="statBox">
              <p>[{stat.name}: {stat.value}]</p>
            </div>
          {:else}
            <p>No stats :(</p>
          {/each}
        </div>
        <div class="playerItems">
          <h2>Items:</h2>
          {#each player.items as item}
            <div class="itemBox">
              <p>{item.name}</p>
            </div>
          {:else}
            <p>No items :(</p>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  
  <style>
    .displayPlayers {
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
      width: calc(80% - 10px);
      margin: 0 auto 20px;
      max-width: 1200px;
      display: flex;
    }
  
    .playerInfo {
      text-align: left;
      width: 30%;
    }
  
    .playerStats, .playerItems {
      display: flex;
      flex-wrap: wrap;
      width: 70%;
    }
  
    .statBox, .itemBox {
      margin-right: 10px;
    }
  
    h2 {
      margin-right: 10px;
    }
  </style> -->