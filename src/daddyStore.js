import { writable } from 'svelte/store';


const StatStore = writable([
    {
        name:"Health",
        min:0,
        max:100,
        default:100,
        desc:"health points, when 0 or below, player dies",
        id:1
    }
]);
const ItemStore = writable([
    {
        name:"Basic Sword",
        desc:"Atk +10"
    }
]);

export {StatStore,ItemStore};