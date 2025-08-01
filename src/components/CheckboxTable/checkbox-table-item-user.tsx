import { Box, Checkbox, Td, Text, Tr } from "@chakra-ui/react";
import { useContext } from "react";

import { TableCheckboxContext } from "@/context/checkboxContext";
import { User } from "@/shared/types/users";

type CheckboxTableItemUserProps = {
  user: User;
};

export function CheckboxTableItemUser({ user }: CheckboxTableItemUserProps) {
  const { selectedUsers, toggleSelectUser } = useContext(TableCheckboxContext);

  return (
    <Tr>
      <Td>
        <Checkbox
          colorScheme="teal"
          isChecked={selectedUsers.some((b) => b.id === user.id)}
          onChange={() => toggleSelectUser(user)}
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
