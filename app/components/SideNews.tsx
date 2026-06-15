import { Suspense } from "react";
import { Box } from "@gluestack-ui/themed";
import CategoryNewsList from "./CategoryNewsList";
import RecentNewsList from "./RecentNewsList";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary"

export default function SideNews() {

    return (
        <Box gap="$12" paddingHorizontal="$12" marginTop="$6">

            <ErrorBoundary>
                <RecentNewsList />
            </ErrorBoundary>

            <ErrorBoundary>
                <CategoryNewsList />
            </ErrorBoundary>

        </Box>
    )
}