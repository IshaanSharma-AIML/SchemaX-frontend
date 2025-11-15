// Layout component for public-facing site pages
// Wraps public pages with the frontend header component
import Header from '@/components/frontend/Header';

export const metadata = {
    title: 'SchemaX - AI Database Assistant',
    description: 'The best AI for databases. No SQL knowledge needed, connect your database and chat with your data using natural language. Query, visualize, manage, analyze your data by asking questions.',
};

export default function FrontendPagesLayout({ children }) {
    return (
        <main className='h-screen bg-white dark:bg-gray-900 overflow-hidden'>
            <Header />
            <div className="h-full pt-16 lg:pt-20 overflow-y-auto">
                {children}
            </div>
        </main>
    );
}
