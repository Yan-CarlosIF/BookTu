import { Checkbox, Td, Tr } from "@chakra-ui/react";
import { useContext } from "react";

import { EstablishmentAddressPopover } from "@/components/establishment-address-popover";
import { TableCheckboxContext } from "@/context/checkboxContext";
import { userContext } from "@/context/userContext";
import { Establishment } from "@/shared/types/establishment";

interface EstablishmentsTableItemProps {
  establishment: Establishment;
}

export function EstablishmentsTableItem({
  establishment,
}: EstablishmentsTableItemProps) {
  const { selectedData, toggleSelectData } = useContext(TableCheckboxContext);
  const { user, isLoading } = useContext(userContext);
  const isAdmin = !isLoading && user?.permission === "admin";

  return (
    <Tr key={establishment.id}>
      {isAdmin && (
        <Td w="5%">
          <Checkbox
            colorScheme="teal"
            isChecked={selectedData?.some(
              (item) => item.id === establishment.id
            )}
            onChange={() => toggleSelectData(establishment)}
          />
        </Td>
      )}
      <Td>{establishment.name}</Td>
      <Td>{establishment.cnpj}</Td>
      <Td>
        {establishment.city}
        <EstablishmentAddressPopover establishment={establishment} />
      </Td>
    </Tr>
  );
}
