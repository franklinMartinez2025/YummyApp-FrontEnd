import { Outlet } from 'react-router-dom';
import './PublicLayout.css';
import { PublicHeader } from './components/PublicHeader';
import { PublicFooter } from './components/PublicFooter';

const PublicLayout = () => {
  return (
    <div className="layout-wrapper">
      <PublicHeader />
      <main className="page-content">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;

