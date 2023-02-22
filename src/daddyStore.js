import { writable } from 'svelte/store';



let temp ={
    name:"Health",
    min:0,
    max:100,
    default:100,
    desc:"health points, when 0 or below, player dies",
    id:1
} 
const StatStore = writable([temp]);
const ItemStore = writable([]);
const PlayerStore = writable([{
    id:1,
    name:"Player 1",
    desc:"Player Desc",
    stats:[{name:"Health",value:100,id:1}],
    items:[]
}]);

export {StatStore,ItemStore,PlayerStore};