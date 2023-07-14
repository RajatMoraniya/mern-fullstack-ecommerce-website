import Navbar from "../features/Navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <UserOrders />
      </Navbar>
    </div>
  );
}

export default UserOrdersPage;
