export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(`http://localhost:8080/products`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/categories`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/brands`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({ filter, sort,pagination }) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // TODO : on server we will support multi values in filter

  let queryString = "";
  for (let key in filter) {
    let category = filter[key];
    if (category.length >= 1) {
      let lastFilter = category[category.length - 1];
      queryString += `${key}=${filter[key]}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      `http://localhost:8080/products?${queryString}`
    );
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data : {products:data,totalItems:+totalItems}});
  });
}
