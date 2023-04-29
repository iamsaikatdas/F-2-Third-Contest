// Define functions
async function getMenu() {
  const response = await fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  );
  const data = await response.json();
  console.log(data);
  const menu = document.getElementById("menu");
  data.forEach((item) => {
    menu.innerHTML += `
    <div class="card" style="width: 28rem; box-shadow: 0 0 6px 0 gray; border-radius: 5px" >
            <img src=${item.imgSrc} class="card-img-top" alt=${item.imageAlt}>
        <div class="card-body" style="display:flex; justify-content:space-between">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">Price: ${item.price}</p>
        </div>
    </div>
`;
  });
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const burgers = ["Cheeseburger", "Veggie Burger", "Chicken Burger"];
      const order = {
        burgers: [
          burgers[Math.floor(Math.random() * 3)],
          burgers[Math.floor(Math.random() * 3)],
          burgers[Math.floor(Math.random() * 3)],
        ],
      };
      resolve(order);
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

// Attach event listener to order button
const orderBtn = document.getElementById("orderBtn");
orderBtn.addEventListener("click", async () => {
  try {
    const order = await takeOrder();
    console.log("Order placed: ", order);

    const orderStatus = await orderPrep();
    console.log("Order status: ", orderStatus);

    const payment = await payOrder();
    console.log("Payment status: ", payment);

    if (payment.paid) {
      thankyouFnc();
    }
  } catch (error) {
    console.error(error);
  }
});

// Call getMenu function on page load
getMenu()
  .then(() => takeOrder())
  .then((order) => {
    console.log("Order:", order);
    return orderPrep();
  })
  .then((orderStatus) => {
    console.log("Order status:", orderStatus);
    return payOrder();
  })
  .then((paidStatus) => {
    console.log("Paid status:", paidStatus);
    thankyouFnc();
  })
  .catch((error) => {
    console.error("Error processing order:", error);
  });
