import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Ellipsis } from "lucide-react";

import { Establishment } from "@/shared/types/establishment";

interface EstablishmentAddressPopoverProps {
  establishment: Establishment;
}

export function EstablishmentAddressPopover({
  establishment,
}: EstablishmentAddressPopoverProps) {
  return (
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
  );
}
