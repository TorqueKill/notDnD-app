import { writable } from 'svelte/store';
import makeid from './helper'
import Peer from "simple-peer/simplepeer.min.js";
let isMaster = location.hash==="#DM"
var peer = new Peer({ initiator: isMaster, 
    trickle: false ,
    objectMode:true,
    config: {
        iceServers: [{
            urls: [ "stun:bn-turn1.xirsys.com" ]
         }, {
            username: "Tu2m3RoQ7hVf8OHXdOQxpEjZkK5lfShxS9SR57VMP0EVFgz_OTIPoEwn_38krH5ZAAAAAGQMvO9mcmVlTG9vdDg=",
            credential: "bea852c2-c033-11ed-8f62-0242ac140004",
            urls: [
                "turn:bn-turn1.xirsys.com:80?transport=udp",
                "turn:bn-turn1.xirsys.com:3478?transport=udp",
                "turn:bn-turn1.xirsys.com:80?transport=tcp",
                "turn:bn-turn1.xirsys.com:3478?transport=tcp",
                "turns:bn-turn1.xirsys.com:443?transport=tcp",
                "turns:bn-turn1.xirsys.com:5349?transport=tcp"
            ]
         }]
      }

})

//import Gun from 'gun'

//const db = Gun();
var connected = false
var localID = 'loading...'
let clearLocal = location.hash === "#clr"


if (clearLocal){
    localStorage.clear()
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
    name:"Abdul Muiz",
    desc:"The guy who made this thing",
    stats:[{name:"Health",value:200,id:1},{name:"Atk",value:5,id:2}],
    items:[{name:"Shield",id:2},{name:"Sword",id:1}]
}

let tempPlayer2 = {
    id:1,
    name:"Player 2",
    desc:"Generic Starter Character Description",
    stats:[{name:"Health",value:100,id:1},{name:"Atk",value:1,id:2}],
    items:[{name:"Shield",id:2}]
}


let tempPlayer3 = {
    id:1,
    name:"Player 3",
    desc:"Generic Starter Character Description",
    stats:[{name:"Health",value:100,id:1},{name:"Atk",value:1,id:2}],
    items:[{name:"Shield",id:2}]
}




const StatStore = writable(localStats || [tempStat1,tempStat2]);
const ItemStore = writable(localItems || [tempItem1,tempItem2]);
const PlayerStore = writable(localPlayers || [tempPlayer1,tempPlayer2,tempPlayer3]);
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
    console.log(peer);
    Connection.update((item)=>{
        item.isConnected = true
        connected = true
        return item
    })

})
peer.on('data',data=>{
    console.log(data)
    let temp = JSON.parse(data)

    if (temp.stats){
        StatStore.set(JSON.parse(temp.stats))
    }
    else if (temp.items){
        ItemStore.set(JSON.parse(temp.items))
    }
    else if (temp.players){
        PlayerStore.set(JSON.parse(temp.players))
    }
})


export {StatStore,ItemStore,PlayerStore,Connection};