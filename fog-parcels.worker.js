importScripts('vendor/parcels.js');
self.onmessage=event=>{
 try{self.postMessage({id:event.data.id,features:PMParcels.blocks(event.data.features,event.data.keys)});}
 catch(error){self.postMessage({id:event.data.id,features:[],failed:true});}
};
