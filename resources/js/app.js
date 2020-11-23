import axios from "axios";
import Noty from "noty";

let cart = document.querySelectorAll(".add-to-cart");
let cartquantity = document.querySelector(".cartquantity");

async function updateCart(juice) {
  try {
    const res = await axios.post("/update-cart", juice);
    console.log(res);
    cartquantity.innerHTML = res.data;
    new Noty({
      type: "success",
      text: "Item Added to Cart",
      timeout: 300,
      progressBar: false,
    }).show();
  } catch (e) {
   res.json({error:e});
  }
}

cart.forEach((btnarea) => {
  btnarea.addEventListener("click", (e) => {
    const juice = JSON.parse(btnarea.dataset.juices);
    updateCart(juice);
  });
});
