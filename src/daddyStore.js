import { writable } from 'svelte/store';
import makeid from './helper'
import Peer from "simple-peer/simplepeer.min.js";
let isMaster = location.hash==="#DM"
var peer = new Peer({ initiator: isMaster, 
    trickle: false ,
    objectMode:true,
    config: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },
            /*
            {
                url: 'turn:openrelay.metered.ca:80',
                credential: 'openrelayproject',
                username: 'openrelayproject'
            },
            {
                url: 'turn:relay1.expressturn.com:3478?transport=udp',
                credential: 'NZ6h1IbEvYsyJGWE',
                username: 'efOWHLW4IA4FS1C780'
            },
            {
                url: 'stun:relay1.expressturn.com:3478',
                credential: 'NZ6h1IbEvYsyJGWE',
                username: 'efOWHLW4IA4FS1C780'
            },
          {
            url: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
          },
          {
            url: 'turn:192.158.29.39:3478?transport=udp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
          },
          {
            url: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
          },
          {
            url: 'turn:turn.bistri.com:80',
            credential: 'homeo',
            username: 'homeo'
          },
          {
            url: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
          }*/
        ]
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