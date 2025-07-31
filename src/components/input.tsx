import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
  placeholder?: string;
  label?: string;
  error?: FieldError;
  icon?: any;
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { placeholder, error = null, icon, h, label, name, ...props },
  ref
) => {
  return (
    <FormControl display="flex" flexDirection="column" isInvalid={!!error}>
      {label && (
        <FormLabel color="gray_800" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {icon && (
          <InputLeftElement h={h}>
            <Icon as={icon} color="gray_600" fontSize={20} />
          </InputLeftElement>
        )}
        <ChakraInput
          name={name}
          isInvalid={!!error}
          h={h}
          placeholder={placeholder}
          errorBorderColor="failed"
          focusBorderColor="highlight_blue"
          borderColor="gray_500"
          bg="gray_300"
          color="gray_600"
          _placeholder={{ color: "gray_600", fontWeight: "medium" }}
          ref={ref}
          {...props}
        />
      </InputGroup>
      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
