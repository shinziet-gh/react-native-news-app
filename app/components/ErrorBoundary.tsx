import type { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

/* React component to catch runtime error in the child component tree that could crash the application */

export function ErrorBoundary({
    children,
}: {
    children: ReactNode
}) {
    return (
        <ReactErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
                <div role="alert">
                    <h3>Oops.. Something went wrong :&#40</h3>
                    <p> {(error as Error)?.message || "Unknown error"} </p>
                    <button onClick={resetErrorBoundary}>Retry</button>
                </div>
            )}
            onError={(error, info) => {
                // Log error information
                console.error('Unexpected error', {
                    error,
                    info
                })
            }}>
            {children}
        </ReactErrorBoundary>
    )
}