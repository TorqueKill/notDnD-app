import { writable } from 'svelte/store';



let tempStat1 ={
    name:"Health",
    min:0,
    max:100,
    default:100,
    desc:"health points, when 0 or below, player dies",
    id:1
}

let tempStat2 ={
    name:"Atk",
    min:0,
    max:10,
    default:1,
    desc:"Atk points",
    id:2
}

let tempItem1 ={
    name:"Sword",
    desc:"does damage lol",
    stats:[{name:"Atk",value:1,id:2}],
    id:1
}

let tempItem2 ={
    name:"Shield",
    desc:"idk how to spell sheild",
    stats:[{name:"Health",value:20,id:1}],
    id:2
}



const StatStore = writable([tempStat1,tempStat2]);
const ItemStore = writable([tempItem1,tempItem2]);
const PlayerStore = writable([{
    id:1,
    name:"Ibn e Jalal",
    desc:"REEEEEEEEEEE",
    stats:[{name:"Health",value:100,id:1}],
    items:[]
}]);

export {StatStore,ItemStore,PlayerStore};