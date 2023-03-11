import { writable } from 'svelte/store';
import makeid from './helper'
import Peer from "simple-peer/simplepeer.min.js";
let isMaster = location.hash==="#DM"
var peer = new Peer({ initiator: isMaster, 
    trickle: false ,
    objectMode:true,
    config: {
        iceServers: [
            {url:"23.21.150.121:3478"},{url:"iphone-stun.strato-iphone.de:3478"},{url:"numb.viagenie.ca:3478"},{url:"s1.taraba.net:3478"},{url:"s2.taraba.net:3478"},{url:"stun.12connect.com:3478"},{url:"stun.12voip.com:3478"},{url:"stun.1und1.de:3478"},{url:"stun.2talk.co.nz:3478"},{url:"stun.2talk.com:3478"},{url:"stun.3clogic.com:3478"},{url:"stun.3cx.com:3478"},{url:"stun.a-mm.tv:3478"},{url:"stun.aa.net.uk:3478"},{url:"stun.acrobits.cz:3478"},{url:"stun.actionvoip.com:3478"},{url:"stun.advfn.com:3478"},{url:"stun.aeta-audio.com:3478"},{url:"stun.aeta.com:3478"},{url:"stun.alltel.com.au:3478"},{url:"stun.altar.com.pl:3478"},{url:"stun.annatel.net:3478"},{url:"stun.antisip.com:3478"},{url:"stun.arbuz.ru:3478"},{url:"stun.avigora.com:3478"},{url:"stun.avigora.fr:3478"},{url:"stun.awa-shima.com:3478"},{url:"stun.awt.be:3478"},{url:"stun.b2b2c.ca:3478"},{url:"stun.bahnhof.net:3478"},{url:"stun.barracuda.com:3478"},{url:"stun.bluesip.net:3478"},{url:"stun.bmwgs.cz:3478"},{url:"stun.botonakis.com:3478"},{url:"stun.budgetphone.nl:3478"},{url:"stun.budgetsip.com:3478"},{url:"stun.cablenet-as.net:3478"},{url:"stun.callromania.ro:3478"},{url:"stun.callwithus.com:3478"},{url:"stun.cbsys.net:3478"},{url:"stun.chathelp.ru:3478"},{url:"stun.cheapvoip.com:3478"},{url:"stun.ciktel.com:3478"},{url:"stun.cloopen.com:3478"},{url:"stun.colouredlines.com.au:3478"},{url:"stun.comfi.com:3478"},{url:"stun.commpeak.com:3478"},{url:"stun.comtube.com:3478"},{url:"stun.comtube.ru:3478"},{url:"stun.cope.es:3478"},{url:"stun.counterpath.com:3478"},{url:"stun.counterpath.net:3478"},{url:"stun.cryptonit.net:3478"},{url:"stun.darioflaccovio.it:3478"},{url:"stun.datamanagement.it:3478"},{url:"stun.dcalling.de:3478"},{url:"stun.decanet.fr:3478"},{url:"stun.demos.ru:3478"},{url:"stun.develz.org:3478"},{url:"stun.dingaling.ca:3478"},{url:"stun.doublerobotics.com:3478"},{url:"stun.drogon.net:3478"},{url:"stun.duocom.es:3478"},{url:"stun.dus.net:3478"},{url:"stun.e-fon.ch:3478"},{url:"stun.easybell.de:3478"},{url:"stun.easycall.pl:3478"},{url:"stun.easyvoip.com:3478"},{url:"stun.efficace-factory.com:3478"},{url:"stun.einsundeins.com:3478"},{url:"stun.einsundeins.de:3478"},{url:"stun.ekiga.net:3478"},{url:"stun.epygi.com:3478"},{url:"stun.etoilediese.fr:3478"},{url:"stun.eyeball.com:3478"},{url:"stun.faktortel.com.au:3478"},{url:"stun.freecall.com:3478"},{url:"stun.freeswitch.org:3478"},{url:"stun.freevoipdeal.com:3478"},{url:"stun.fuzemeeting.com:3478"},{url:"stun.gmx.de:3478"},{url:"stun.gmx.net:3478"},{url:"stun.gradwell.com:3478"},{url:"stun.halonet.pl:3478"},{url:"stun.hellonanu.com:3478"},{url:"stun.hoiio.com:3478"},{url:"stun.hosteurope.de:3478"},{url:"stun.ideasip.com:3478"},{url:"stun.imesh.com:3478"},{url:"stun.infra.net:3478"},{url:"stun.internetcalls.com:3478"},{url:"stun.intervoip.com:3478"},{url:"stun.ipcomms.net:3478"},{url:"stun.ipfire.org:3478"},{url:"stun.ippi.fr:3478"},{url:"stun.ipshka.com:3478"},{url:"stun.iptel.org:3478"},{url:"stun.irian.at:3478"},{url:"stun.it1.hr:3478"},{url:"stun.ivao.aero:3478"},{url:"stun.jappix.com:3478"},{url:"stun.jumblo.com:3478"},{url:"stun.justvoip.com:3478"},{url:"stun.kanet.ru:3478"},{url:"stun.kiwilink.co.nz:3478"},{url:"stun.kundenserver.de:3478"},{url:"stun.l.google.com:19302"},{url:"stun.linea7.net:3478"},{url:"stun.linphone.org:3478"},{url:"stun.liveo.fr:3478"},{url:"stun.lowratevoip.com:3478"},{url:"stun.lugosoft.com:3478"},{url:"stun.lundimatin.fr:3478"},{url:"stun.magnet.ie:3478"},{url:"stun.manle.com:3478"},{url:"stun.mgn.ru:3478"},{url:"stun.mit.de:3478"},{url:"stun.mitake.com.tw:3478"},{url:"stun.miwifi.com:3478"},{url:"stun.modulus.gr:3478"},{url:"stun.mozcom.com:3478"},{url:"stun.myvoiptraffic.com:3478"},{url:"stun.mywatson.it:3478"},{url:"stun.nas.net:3478"},{url:"stun.neotel.co.za:3478"},{url:"stun.netappel.com:3478"},{url:"stun.netappel.fr:3478"},{url:"stun.netgsm.com.tr:3478"},{url:"stun.nfon.net:3478"},{url:"stun.noblogs.org:3478"},{url:"stun.noc.ams-ix.net:3478"},{url:"stun.node4.co.uk:3478"},{url:"stun.nonoh.net:3478"},{url:"stun.nottingham.ac.uk:3478"},{url:"stun.nova.is:3478"},{url:"stun.nventure.com:3478"},{url:"stun.on.net.mk:3478"},{url:"stun.ooma.com:3478"},{url:"stun.ooonet.ru:3478"},{url:"stun.oriontelekom.rs:3478"},{url:"stun.outland-net.de:3478"},{url:"stun.ozekiphone.com:3478"},{url:"stun.patlive.com:3478"},{url:"stun.personal-voip.de:3478"},{url:"stun.petcube.com:3478"},{url:"stun.phone.com:3478"},{url:"stun.phoneserve.com:3478"},{url:"stun.pjsip.org:3478"},{url:"stun.poivy.com:3478"},{url:"stun.powerpbx.org:3478"},{url:"stun.powervoip.com:3478"},{url:"stun.ppdi.com:3478"},{url:"stun.prizee.com:3478"},{url:"stun.qq.com:3478"},{url:"stun.qvod.com:3478"},{url:"stun.rackco.com:3478"},{url:"stun.rapidnet.de:3478"},{url:"stun.rb-net.com:3478"},{url:"stun.refint.net:3478"},{url:"stun.remote-learner.net:3478"},{url:"stun.rixtelecom.se:3478"},{url:"stun.rockenstein.de:3478"},{url:"stun.rolmail.net:3478"},{url:"stun.rounds.com:3478"},{url:"stun.rynga.com:3478"},{url:"stun.samsungsmartcam.com:3478"},{url:"stun.schlund.de:3478"},{url:"stun.services.mozilla.com:3478"},{url:"stun.sigmavoip.com:3478"},{url:"stun.sip.us:3478"},{url:"stun.sipdiscount.com:3478"},{url:"stun.sipgate.net:10000"},{url:"stun.sipgate.net:3478"},{url:"stun.siplogin.de:3478"},{url:"stun.sipnet.net:3478"},{url:"stun.sipnet.ru:3478"},{url:"stun.siportal.it:3478"},{url:"stun.sippeer.dk:3478"},{url:"stun.siptraffic.com:3478"},{url:"stun.skylink.ru:3478"},{url:"stun.sma.de:3478"},{url:"stun.smartvoip.com:3478"},{url:"stun.smsdiscount.com:3478"},{url:"stun.snafu.de:3478"},{url:"stun.softjoys.com:3478"},{url:"stun.solcon.nl:3478"},{url:"stun.solnet.ch:3478"},{url:"stun.sonetel.com:3478"},{url:"stun.sonetel.net:3478"},{url:"stun.sovtest.ru:3478"},{url:"stun.speedy.com.ar:3478"},{url:"stun.spokn.com:3478"},{url:"stun.srce.hr:3478"},{url:"stun.ssl7.net:3478"},{url:"stun.stunprotocol.org:3478"},{url:"stun.symform.com:3478"},{url:"stun.symplicity.com:3478"},{url:"stun.sysadminman.net:3478"},{url:"stun.t-online.de:3478"},{url:"stun.tagan.ru:3478"},{url:"stun.tatneft.ru:3478"},{url:"stun.teachercreated.com:3478"},{url:"stun.tel.lu:3478"},{url:"stun.telbo.com:3478"},{url:"stun.telefacil.com:3478"},{url:"stun.tis-dialog.ru:3478"},{url:"stun.tng.de:3478"},{url:"stun.twt.it:3478"},{url:"stun.u-blox.com:3478"},{url:"stun.ucallweconn.net:3478"},{url:"stun.ucsb.edu:3478"},{url:"stun.ucw.cz:3478"},{url:"stun.uls.co.za:3478"},{url:"stun.unseen.is:3478"},{url:"stun.usfamily.net:3478"},{url:"stun.veoh.com:3478"},{url:"stun.vidyo.com:3478"},{url:"stun.vipgroup.net:3478"},{url:"stun.virtual-call.com:3478"},{url:"stun.viva.gr:3478"},{url:"stun.vivox.com:3478"},{url:"stun.vline.com:3478"},{url:"stun.vo.lu:3478"},{url:"stun.vodafone.ro:3478"},{url:"stun.voicetrading.com:3478"},{url:"stun.voip.aebc.com:3478"},{url:"stun.voip.blackberry.com:3478"},{url:"stun.voip.eutelia.it:3478"},{url:"stun.voiparound.com:3478"},{url:"stun.voipblast.com:3478"},{url:"stun.voipbuster.com:3478"},{url:"stun.voipbusterpro.com:3478"},{url:"stun.voipcheap.co.uk:3478"},{url:"stun.voipcheap.com:3478"},{url:"stun.voipfibre.com:3478"},{url:"stun.voipgain.com:3478"},{url:"stun.voipgate.com:3478"},{url:"stun.voipinfocenter.com:3478"},{url:"stun.voipplanet.nl:3478"},{url:"stun.voippro.com:3478"},{url:"stun.voipraider.com:3478"},{url:"stun.voipstunt.com:3478"},{url:"stun.voipwise.com:3478"},{url:"stun.voipzoom.com:3478"},{url:"stun.vopium.com:3478"},{url:"stun.voxgratia.org:3478"},{url:"stun.voxox.com:3478"},{url:"stun.voys.nl:3478"},{url:"stun.voztele.com:3478"},{url:"stun.vyke.com:3478"},{url:"stun.webcalldirect.com:3478"},{url:"stun.whoi.edu:3478"},{url:"stun.wifirst.net:3478"},{url:"stun.wwdl.net:3478"},{url:"stun.xs4all.nl:3478"},{url:"stun.xtratelecom.es:3478"},{url:"stun.yesss.at:3478"},{url:"stun.zadarma.com:3478"},{url:"stun.zadv.com:3478"},{url:"stun.zoiper.com:3478"},{url:"stun1.faktortel.com.au:3478"},{url:"stun1.l.google.com:19302"},{url:"stun1.voiceeclipse.net:3478"},{url:"stun2.l.google.com:19302"},{url:"stun3.l.google.com:19302"},{url:"stun4.l.google.com:19302"},{url:"stunserver.org:3478"},
            {
                url: "stun:global.stun.twilio.com:3478"
              },
              {
                username: "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                credential: "tE2DajzSJwnsSbc123",
                url: "turn:global.turn.twilio.com:3478?transport=udp"
              },
              {
                username: "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                credential: "tE2DajzSJwnsSbc123",
                url: "turn:global.turn.twilio.com:3478?transport=tcp"
              },
              {
                username: "dc2d2894d5a9023620c467b0e71cfa6a35457e6679785ed6ae9856fe5bdfa269",
                credential: "tE2DajzSJwnsSbc123",
                urls: "turn:global.turn.twilio.com:443?transport=tcp"
              }
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