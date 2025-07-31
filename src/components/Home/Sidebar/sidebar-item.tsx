import { Button, ButtonProps, Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
import nookies from "nookies";

interface SidebarItemProps extends ButtonProps {
  isActive?: boolean;
  icon: any;
  title: string;
  href: string;
}

const MotionFlex = motion(Flex);
const MotionIcon = motion(Icon);

export function SidebarItem({
  icon,
  title,
  href,
  isActive = false,
  ...rest
}: SidebarItemProps) {
  const router = useRouter();

  function handleLogout() {
    nookies.destroy(null, "auth.token", { path: "/" });
    router.push("/");
  }

  return (
    <Button
      {...rest}
      variant="unstyled"
      _focus={{
        boxShadow: "none",
        outline: "none",
      }}
      _active={{
        boxShadow: "none",
        outline: "none",
        transform: "none",
      }}
      _hover={{
        boxShadow: "none",
      }}
      onClick={href === "/" ? handleLogout : () => router.push(href)}
    >
      <MotionFlex
        as="a"
        align="center"
        gap="16px"
        py="11px"
        w="full"
        cursor="pointer"
        position="relative"
        overflow="hidden"
        _hover={{ textDecoration: "none" }}
        initial="rest"
        animate={isActive ? "hover" : "rest"}
        whileHover="hover"
        variants={{
          rest: { paddingLeft: "16px" },
          hover: { paddingLeft: "24px" },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 0,
          }}
        />
        {isActive && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "3px",
              background: "#319795",
              zIndex: 1,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <MotionIcon
          as={icon}
          fontSize={20}
          zIndex={2}
          variants={{
            rest: {
              x: 0,
              color: isActive ? "#319795" : "#F6F6F6",
              rotate: icon === LogOut ? 180 : 0,
              scale: 1,
            },
            hover: {
              x: 4,
              color: "#319795",
              rotate: icon === LogOut ? 180 : 0,
              scale: 1.1,
            },
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
        <Text
          zIndex={2}
          color="gray_800"
          fontWeight={isActive ? "semibold" : "normal"}
          fontSize="md"
          transition="color 0.3s ease"
          _groupHover={{
            fontWeight: "semibold",
          }}
        >
          {title}
        </Text>
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            height: "100%",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            zIndex: 1,
          }}
          variants={{
            rest: { x: "-100%" },
            hover: { x: "200%" },
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />
      </MotionFlex>
    </Button>
  );
}
