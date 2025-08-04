import { Avatar, Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useContext } from "react";

import { userContext } from "@/context/userContext";

export function UserHeader() {
  const { user, isLoading } = useContext(userContext);

  const names = user?.name.split(" ");

  const displayedName = names?.length > 1 ? names[0] : user?.name;

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
          {isLoading ? <Spinner /> : displayedName}
        </Text>
        <Avatar
          justifySelf="flex-end"
          size="md"
          color="background"
          bg="highlight_blue"
          name={displayedName}
        />
      </Box>
    </Flex>
  );
}
