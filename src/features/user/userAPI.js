export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/orders/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/own");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/users/" + userData.id, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}
