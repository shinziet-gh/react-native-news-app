import React from 'react'
import { Box, Text, Button, ButtonIcon } from '@gluestack-ui/themed'
import { FacebookIcon, XIcon, WhatsappIcon, InstagramIcon } from './Icons'

export default function SocialMedia() {
    const socialIcons = [FacebookIcon, XIcon, WhatsappIcon, InstagramIcon];

    return (
        <Box bg="white">
            <Box flexDirection='row' py="$1" gap="$2" justifyContent='space-between'>
                {socialIcons.map((icon, index) =>
                    <Button px="$4" size="xl" key={index} bg="black" >
                        <ButtonIcon as={icon} size="md"></ButtonIcon>
                    </Button>
                )}
            </Box>
        </Box>
    )
}
