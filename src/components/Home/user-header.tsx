import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function UserHeader({ name }: { name: string }) {
  const names = name.split(" ");

  if (names.length > 1) {
    name = names[0];
  }

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
      <Box display="flex" gap="10px" alignItems="center">
        <Text
          fontFamily="poppins"
          color="gray_800"
          fontSize="sm"
          px="10px"
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
          color="background"
          bg="highlight_blue"
          name={name}
        />
      </Box>
    </Flex>
  );
}
