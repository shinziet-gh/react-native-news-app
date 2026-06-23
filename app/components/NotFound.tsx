import { Box, Text } from "@gluestack-ui/themed";


export default function NotFound() {
    return (
        <Box w="$full" alignItems="center" borderWidth={1} padding="$6" marginTop="$4">
            <Text fontSize="$lg">Sorry.</Text>
            <Text fontSize="$lg" fontWeight="$thin">No results found.</Text>
        </Box>
    )
}