import { writable } from 'svelte/store';
import makeid from './helper'

let localID = JSON.parse(localStorage.getItem("localID"))
if (!localID){
    localID = makeid(10)
    localStorage.setItem("localID",JSON.stringify(localID))
}

let localStats = JSON.parse(localStorage.getItem("localStats"))
let localItems = JSON.parse(localStorage.getItem("localItems"))
let localPlayers = JSON.parse(localStorage.getItem("localPlayers"))

console.log(localPlayers)
console.log(localStats)
console.log(localItems)

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

let tempPlayer1 = {
    id:1,
    name:"Ibn e Jalal",
    desc:"Generic Starter Character Description",
    stats:[{name:"Health",value:100,id:1},{name:"Atk",value:1,id:2}],
    items:[{name:"Shield",id:2}]
}



const StatStore = writable(localStats || [tempStat1,tempStat2]);
const ItemStore = writable(localItems || [tempItem1,tempItem2]);
const PlayerStore = writable(localPlayers || [tempPlayer1]);

StatStore.subscribe((data)=>{
    localStorage.setItem("localStats",JSON.stringify(data))
})
ItemStore.subscribe((data)=>{
    localStorage.setItem("localItems",JSON.stringify(data))
})
PlayerStore.subscribe((data)=>{
    localStorage.setItem("localPlayers",JSON.stringify(data))
})


export {StatStore,ItemStore,PlayerStore,localID};