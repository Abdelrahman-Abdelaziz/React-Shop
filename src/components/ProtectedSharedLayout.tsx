import { Outlet } from 'react-router';
import Header from './Header';

function ProtectedSharedLayout() {
  return (
    <>
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6">
            <Outlet />
        </main>
    </>
  );
}

export default ProtectedSharedLayout;