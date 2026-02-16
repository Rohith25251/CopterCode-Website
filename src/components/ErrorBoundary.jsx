import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 p-8 bg-zinc-900 text-white overflow-auto z-50 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4 text-red-500">Something went wrong.</h1>
                    <p className="mb-4 text-lg">We apologize for the inconvenience. Please try refreshing the page.</p>
                    <details className="mt-4 p-4 bg-black/50 rounded-lg max-w-full overflow-x-auto border border-white/10">
                        <summary className="cursor-pointer font-mono text-sm mb-2 text-accent">Error Details (for developers)</summary>
                        <code className="block whitespace-pre text-xs text-red-300 font-mono">
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </code>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
