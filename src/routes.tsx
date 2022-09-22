import { BrowserRouter , Routes, Route } from 'react-router-dom';

import App from './App';
import ViewAds from './pages/ViewAds';

function AllRoutes() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/viewads/:id" element={<ViewAds />} />
      </Routes>
    </BrowserRouter>
    );
}

export default AllRoutes;