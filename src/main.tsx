import ReactDOM from 'react-dom/client';
import { Provider as StoreProvider } from 'jotai';
import App from './App';

ReactDOM
    .createRoot(document.getElementById('root') as HTMLElement)
    .render(
        <StoreProvider>
            <App />
        </StoreProvider>
    );
