import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputNumberProps extends NumberInputProps {
  label?: string;
  error?: FieldError;
  icon?: any;
}

const InputNumberComponent: ForwardRefRenderFunction<
  HTMLInputElement,
  InputNumberProps
> = (
  { error = null, icon, h, label, name, ...props }: InputNumberProps,
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel color="gray_800">{label}</FormLabel>}
      <NumberInput {...props} ref={ref} min={0.1}>
        <InputLeftElement>
          <Icon as={icon} color="gray_600" fontSize={20} />
        </InputLeftElement>
        <NumberInputField
          borderColor="gray_500"
          bg="gray_300"
          border="2px"
          _focus={{
            borderColor: !!error ? "none" : "highlight_blue",
          }}
          color="gray_600"
          placeholder={label}
          _placeholder={{ color: "gray_600", fontWeight: "medium" }}
          pl="40px"
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {!!error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const InputNumber = forwardRef(InputNumberComponent);
