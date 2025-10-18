import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import router from './router';

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
