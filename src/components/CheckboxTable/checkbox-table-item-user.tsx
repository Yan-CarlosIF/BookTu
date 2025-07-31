import { Box, Checkbox, Td, Text,Tr } from "@chakra-ui/react";

import { User } from "@/shared/types/users";

type CheckboxTableItemUserProps = {
  user: User;
  isChecked: boolean;
  toggleSelect: (id: string) => void;
};

export function CheckboxTableItemUser({
  user,
  isChecked,
  toggleSelect,
}: CheckboxTableItemUserProps) {
  return (
    <Tr>
      <Td>
        <Checkbox
          colorScheme="teal"
          isChecked={isChecked}
          onChange={() => toggleSelect(user.id)}
        />
      </Td>
      <Td maxH="40px" p="0px" borderRight="1px" borderRightColor="gray.200">
        <Box maxH="40px">
          <Text>{user.name}</Text>
          <Text fontSize="xs" fontWeight="medium" color="gray_600">
            {user?.role}
          </Text>
        </Box>
      </Td>
      <Td borderRight="1px" borderRightColor="gray.200">
        {user.registration}
      </Td>
      <Td isNumeric borderRight="1px" borderRightColor="gray.200">
        {user.permission}
      </Td>
    </Tr>
  );
}
