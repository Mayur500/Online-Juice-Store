import axios from 'axios';

async function initAdmin(){
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
  <form action='/admin/order/status' method="POST">

<select  onchange="this.form.submit()" name="status" class="block w-full bg-white border
border-gray-400 hover:border-gray-400 px-4 py-2 rounded 	transition-property: none">
<option value="placed">Placed</option>
<option value="confirmed">Confirmed</option>
<option value="prepared">Prepared</option>
<option value="delivered">Delivered</option>

</select>
</form>

   </div>

   </td>
   <td class="border px-4 py-4">
      time
   </td>

  </tr>
`
});
let userstring=userorder.join('');
console.log(userorder);
return userstring;

}
let look=htmldata(myorders);
//console.log(look)
block.innerHTML=look;

}

export default initAdmin;