export function addToCart(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
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
      "http://localhost:8080/cart/" + updateData.id,
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
    const response = await fetch("http://localhost:8080/cart/" + deleteId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: deleteId } });
  });
}

export function fetchCartItems(userId) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve({ data });
  });
}
