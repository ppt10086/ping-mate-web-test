importScripts('vendor/parcels.js'+self.location.search);
self.onmessage=event=>{
 try{const d=event.data;self.postMessage(d.kind==='coverage'?{id:d.id,result:PMParcels.coverage(d.cells,d.parts,d.district)}:{id:d.id,features:PMParcels.blocks(d.features,d.keys)});}
 catch(error){self.postMessage({id:event.data.id,features:[],failed:true});}
};
