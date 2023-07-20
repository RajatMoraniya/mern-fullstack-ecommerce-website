import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constaints";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  return (
    <div className="overflow-x-auto">
      <h1 className="p-2 text-2xl sm:text-3xl md:text-4xl mx-2 text-left font-bold tracking-tight text-gray-900">
        Admin Panel ~ Manage Orders
      </h1>
      <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                  <th
                    className="py-3 px-1 sm:px-2 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Order#{" "}
                    {sort._sort === "id" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="hidden w-4 h-4 sm:inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="hidden w-4 h-4 inline:inline"></ArrowDownIcon>
                      ))}
                  </th>
                  <th className="py-3 px-2 text-center">Items</th>
                  <th
                    className="py-3 px-2 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "totalAmount",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Total Amount{" "}
                    {sort._sort === "totalAmount" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>

                  <th className="py-3 px-2 text-center">Shipping Address</th>

                  <th
                    className="py-3 px-2 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "createdAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Created At{" "}
                    {sort._sort === "createdAt " &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>

                  <th
                    className="py-3 px-2 text-center cursor-pointer"
                    onClick={(e) =>
                      handleSort({
                        sort: "updatedAt",
                        order: sort?._order === "asc" ? "desc" : "asc",
                      })
                    }
                  >
                    Updated At{" "}
                    {sort._sort === "updatedAt" &&
                      (sort._order === "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                  </th>

                  <th className="py-3 px-2 text-center">Payment Mode</th>
                  <th className="py-3 px-2 text-center">Payment Status</th>
                  <th className="py-3 px-2 text-center">Order Status</th>
                  <th className="py-3 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs font-light">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-300"
                  >
                    <td className="py-3 px-1 sm:px-2 text-center whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="sm:mr-2"></div>
                        <span className="font-medium text-xs">{order.id}</span>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="mr-2"></div>
                          <span>
                            --{" "}
                            <span className="font-medium">
                              {item.product.title}
                            </span>{" "}
                            | Qty-{item.quantity} | $
                            {item.product.discountPrice}
                          </span>
                        </div>
                      ))}
                    </td>

                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center font-medium justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center">
                      <div className="text-center">
                        <div className="text-center">
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div className="text-center">
                          {order.selectedAddress.street},
                        </div>
                        <div className="text-center">
                          {order.selectedAddress.city},{" "}
                        </div>
                        <div className="text-center">
                          {order.selectedAddress.state},{" "}
                        </div>
                        <div className="text-center">
                          {order.selectedAddress.pinCode},{" "}
                        </div>
                        <div className="text-center">
                          {order.selectedAddress.phone},{" "}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center">
                      <div className="flex text-xs items-center justify-center">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : ""}
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center">
                      <div className="flex text-xs items-center justify-center">
                        {order.updatedAt
                          ? new Date(order.updatedAt).toLocaleString()
                          : null}
                      </div>
                    </td>

                    <td className="py-3 px-2 text-center">
                      <div className="flex font-medium items-center justify-center">
                        {order.paymentMethod}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handlePaymentStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="received">received</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.paymentStatus
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      {order.id === editableOrderId ? (
                        <select onChange={(e) => handleOrderStatus(e, order)}>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span
                          className={`${chooseColor(
                            order.status
                          )} py-1 px-3 rounded-full text-xs`}
                        >
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                          <PencilIcon
                            className="w-8 h-8"
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        handlePage={handlePage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
