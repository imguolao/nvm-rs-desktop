import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'jotai';
import { store } from '@/atoms/store';
import App from './App';

ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    );
