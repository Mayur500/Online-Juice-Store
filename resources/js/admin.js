import axios from 'axios';
import Noty from "noty";
import moment from 'moment'
async function initAdmin(socket){
const block= document.querySelector('#ordersbody');

const res=await axios.post('/admin/orders');
 //console.log(res.data);
 let myorders=res.data.orders;

 function getting(items){
    console.log(items);
   let objitems=Object.values(items.items);
   // console.log(objitems);
   let myitems= objitems.map((given)=>{
   //   console.log(given);
   return `
   <p>${given.items.name} - ${given.qty} pcs </p>
   `
   })
   let itemstring=myitems.join('');
   return itemstring;
   
   }
let userorder=[];
function htmldata(orders){
 console.log('champ');
  userorder= orders.map((order)=>{
    //   console.log(order);
 return `
   <tr>

   <td class="border px-4 py-2 text-green-900">
      <p>${order._id}</p>
     <div>${getting(order.items)} </div>
   </td>
   <td class="border px-4 py-2">${order.details[0].name}</td>
   <td class="border px-4 py-2">${order.address}</td>
   <td class="border px-4 py-2">
<div class="inline-block relative w-64">
  <form action='/admin/orders/status' method="POST">
  <input type="hidden" name="orderId" value="${ order._id }">
<select  onchange="this.form.submit()" name="status" class="block w-full bg-white border
border-gray-400 hover:border-gray-400 px-4 py-2 rounded 	transition-property: none">
<option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
Confirmed</option>
<option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
Prepared</option>
<option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
Delivered
</option>
<option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
Completed
</option>

</select>
</form>

   </div>

   </td>
   <td class="border px-4 py-4">
   ${ moment(order.createdAt).format('hh:mm A') }
   </td>

  </tr>
`
});
let userstring=userorder.join('');
//console.log(userorder);
return userstring;

}
let look=htmldata(myorders);
console.log('hellollo',myorders);
block.innerHTML=look;



socket.on('orderPlaced',(result)=>{
 //  console.log('hello' ,result);
   new Noty({
      type:'success',
      time:1000,
      text:'New Order',
      progressBar:false
  
    }).show();
    myorders.unshift(result);
    block.innerHTML="";
  block.innerHTML= htmldata(myorders);
})

}

export default initAdmin;