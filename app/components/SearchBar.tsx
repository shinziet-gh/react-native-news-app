import { Heading, Input, InputField, InputIcon, InputSlot, SearchIcon, VStack } from "@gluestack-ui/themed";

export default function SearchBar() {
    return (
        <VStack space="md" alignSelf="center">
            <Input variant="outline" width="100%" borderRadius="10" py="$1" px="$2">
                <InputSlot className="pl-3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder="Search news..." />
            </Input>
        </VStack>
    )
}