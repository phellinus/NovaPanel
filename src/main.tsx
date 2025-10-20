import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import './index.css';
import '@/styles/theme.css';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
