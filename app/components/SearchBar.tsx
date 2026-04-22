import { Heading, Input, InputField, InputIcon, InputSlot, SearchIcon, VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";

export default function SearchBar({ placeholder, barWidth, handleEnter }: Readonly<{ placeholder: string, barWidth: string, handleEnter: (arg0: string) => void; }>) {

    const [searchQuery, setSearchQuery] = useState("");

    //Pass search query to parent via callback prop
    const handleEnterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleEnter(searchQuery);
        }
    }

    return (
        <VStack w={barWidth || "$full"} space="md" alignSelf="center">
            <Input variant="outline" borderRadius="10" py="$1" px="$2">
                <InputSlot className="pl-3">
                    <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField
                    value={searchQuery}
                    placeholder={placeholder || ""}
                    onKeyPress={(event) => handleEnterSearch(event)}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </Input>
        </VStack>
    )
}