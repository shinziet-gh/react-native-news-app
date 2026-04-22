import { Heading, Input, InputField, InputIcon, InputSlot, SearchIcon, VStack } from "@gluestack-ui/themed";

export default function SearchBar({ placeholder, barWidth }: { placeholder: string, barWidth: string }) {
    return (
        <VStack w={barWidth} space="md" alignSelf="center">
            <Input variant="outline" borderRadius="10" py="$1" px="$2">
                <InputSlot className="pl-3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField placeholder={placeholder} />
            </Input>
        </VStack>
    )
}