import { Suspense } from "react";
import { Box } from "@gluestack-ui/themed";
import CategoryNewsList from "./CategoryNewsList";
import RecentNewsList from "./RecentNewsList";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary"

export default function SideNews() {

    return (
        <Box gap="$12" paddingHorizontal="$12" marginTop="$6">

            <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                    <RecentNewsList />
                </ErrorBoundary>
            </Suspense>

            <Suspense fallback={<LoadingSpinner />}>
                <ErrorBoundary>
                    <CategoryNewsList />
                </ErrorBoundary>
            </Suspense>

        </Box>
    )
}