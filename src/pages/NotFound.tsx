import { Link } from "react-router";
import { Button } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-lg sm:px-12">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
          <SearchOutlined className="text-4xl text-indigo-600" />
        </div>
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-indigo-600">
          Error 404
        </p>
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mb-8 max-w-sm leading-7 text-slate-500">
          Oops! The page you're looking for doesn't exist or may have been
          moved.
        </p>
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

export default NotFound;
