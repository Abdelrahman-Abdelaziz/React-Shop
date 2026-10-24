import { Link } from "react-router";
import { Button } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface compProps {
    titleName : 'cart' | 'wishlist';
}

function EmptyState({titleName} : compProps) {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-lg sm:px-12">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Your {titleName} is empty
        </h1>
        <Button
          type="primary"
          size="large"
          icon={<HomeOutlined />}
          className="h-12 rounded-lg bg-indigo-600 px-7 font-semibold shadow-md shadow-indigo-100"
        >
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    </main>
  );
}

export default EmptyState;
