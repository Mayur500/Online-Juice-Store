import axios from "axios";
import Noty from "noty";
import initAdmin from "./admin";
import moment from 'moment';
let cart = document.querySelectorAll(".add-to-cart");
let cartquantity = document.querySelector(".cartquantity");

async function updateCart(juice) {
  try {
   // console.log('yes here')
    const res = await axios.post("/update-cart", juice);
   // console.log(res);
    cartquantity.innerHTML = res.data;
    new Noty({
      type: "success",
      text: "Item Added to Cart",
      timeout: 300,
      progressBar: false,
    }).show();
  } catch (e) {
    res.json({ error: e });
  }
}

cart.forEach((btnarea) => {
  btnarea.addEventListener("click", (e) => {
    const juice = JSON.parse(btnarea.dataset.juices);
    updateCart(juice);
  });
});



// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
  console.log(order);
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}
if(order){
updateStatus(order);
}

let socket = io();
if(window.location.pathname.includes('admin')){
  initAdmin(socket);
} 

if(order){
socket.emit('join',`order_${order._id}`);
}

let adminAreaPath= window.location.pathname;
if(adminAreaPath.includes('admin')){
  socket.emit('join','adminRoom');
} 

socket.on('orderUpdated',(data)=>{
  console.log('ues');
  const updatedOrder = {...order};
  updatedOrder.updatedAt= moment().format();
  updatedOrder.status = data.status
  updateStatus(updatedOrder);
  new Noty({
    type:'success',
    time:1000,
    text:'Order Updated',
    progressBar:false

  }).show();


})