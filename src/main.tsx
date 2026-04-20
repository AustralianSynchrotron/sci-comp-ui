import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// Only import router-related code when building docs
const isDocs = import.meta.env.MODE === 'docs' || import.meta.env.MODE === 'github-pages';

if (isDocs) {
    // Docs build - include router
    import('./docs-main').then(({ default: DocsApp }) => {
        const rootElement = document.getElementById('root')!;
        if (!rootElement.innerHTML) {
            const root = ReactDOM.createRoot(rootElement);
            root.render(
                <StrictMode>
                    <DocsApp />
                </StrictMode>
            );
        }
    });
} else {
    // Library build - simple entry point
    import('./styles/theme.css');

    // For library builds, we just need to ensure styles are loaded
    // The actual components are exported from src/index.ts
    console.log('SciComp UI Library loaded');
}
