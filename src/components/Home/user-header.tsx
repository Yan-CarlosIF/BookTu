import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function UserHeader({ name }: { name: string }) {
  return (
    <Flex
      position="relative"
      maxW="160px"
      w="full"
      h="48px"
      align="center"
      borderRadius="full"
      bg="gray_300"
      justify="flex-end"
    >
      <Box display="flex" alignItems="center" gap="10px">
        <Text
          fontFamily="poppins"
          color="gray_800"
          fontSize="sm"
          fontWeight="semibold"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          maxW="100px"
        >
          {name}
        </Text>
        <Avatar
          justifySelf="flex-end"
          size="md"
          bg="highlight_blue"
          name={name}
        />
      </Box>
    </Flex>
  );
}
