import { Suspense } from "react";
import { Box } from "@gluestack-ui/themed";
import CategoryNewsList from "./CategoryNewsList";
import LatestNewsList from "./LatestNewsList";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary"
import { useResponsive } from '../hooks/UseResponsive';

export default function SideNews() {
    const { width, height, isMobile, isTablet, isDesktop } = useResponsive();

    return (
        <Box gap="$2" paddingHorizontal={width > 1024 && width < 1400 ? "$6" : "$12"} marginTop="$6">
            <ErrorBoundary>
                <LatestNewsList />
            </ErrorBoundary>

            <ErrorBoundary>
                <CategoryNewsList />
            </ErrorBoundary>
        </Box>
    )
}