import {
  Checkbox,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { Ellipsis } from "lucide-react";
import { useContext } from "react";

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
        <Popover>
          <PopoverTrigger>
            <IconButton
              _focus={{ ringColor: "transparent" }}
              ml="4px"
              aria-label="Mais detalhes"
              size="xs"
              variant="ghost"
              icon={<Ellipsis size={16} />}
            />
          </PopoverTrigger>
          <PopoverContent _focus={{ ringColor: "transparent" }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Endereço</PopoverHeader>
            <PopoverBody>
              <Text>CEP: {establishment.cep}</Text>
              <Text>Estado: {establishment.state}</Text>
              <Text>Cidade: {establishment.city}</Text>
              <Text>Bairro: {establishment.district}</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Td>
    </Tr>
  );
}
