import { writable } from 'svelte/store';
import makeid from './helper'
import Peer from "simple-peer/simplepeer.min.js";
var peer = new Peer({ initiator: true, trickle: false })

//import Gun from 'gun'

//const db = Gun();
var connected = false
var localID = 'loading...'


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
const Connection = writable({id:localID,isConnected:connected,peer:peer});



peer.on('signal',data=>{
    console.log(data)
    Connection.update((item)=>{
        item.id = JSON.stringify(data)
        return item
    })
})
peer.on('connect',()=>{
    console.log("DOCKING COMPLETE")
    Connection.update((item)=>{
        item.isConnected = true
        connected = true
        return item
    })

})
peer.on('data',data=>{
    let temp = JSON.parse(data)
    console.log(temp)
})


export {StatStore,ItemStore,PlayerStore,Connection};