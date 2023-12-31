export function addToCart(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(updateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "/cart/" + updateData.id,
      {
        method: "PATCH",
        body: JSON.stringify(updateData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteCart(deleteId) {
  return new Promise(async (resolve) => {
    await fetch("/cart/" + deleteId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    resolve({ data: { id: deleteId } });
  });
}

export function fetchCartItems() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("/cart");
    const data = await response.json();
    resolve({ data });
  });
}

export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchCartItems();
    const items = response.data;
    for (let item of items) {
      await deleteCart(item.id);
    }
    resolve({ status: "success" });
  });
}
