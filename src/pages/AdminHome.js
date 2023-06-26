import Navbar from "../features/Navbar/Navbar";
import AdminProductList from "../features/admin/components/AdminProductList";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminProductList />
      </Navbar>
    </div>
  );
}

export default AdminHome;
