import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={1} mt={4}>
      <GridItem
        w="100%"
        h="110"
        bg={"linear-gradient(0deg, steelblue, white 40%, steelblue);"}
        borderRadius={5}
      >
        <Avatar
          ml="3"
          mt={3}
          bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
        />
        <Box>
          <Center>
            {" "}
            <Text fontWeight="bold">
              <Badge ml="1" colorScheme="blue">
                Gerrit de Snoo <br></br>frontend-developer
              </Badge>
            </Text>
          </Center>
          <Text fontSize="sm"></Text>
        </Box>
      </GridItem>
      <GridItem
        w="100%"
        h="110"
        bg={"linear-gradient(0deg, steelblue, white 40%, steelblue);"}
        borderRadius={5}
      >
        <Center mt={4}>
          {/* <Heading size="xl">Events App</Heading> */}
          <FormControl ml={3} as="fieldset">
            <FormLabel as="legend" htmlFor={null}>
              Wie bedoel je
            </FormLabel>
            <RadioGroup defaultValue="Itachi">
              <HStack spacing="24px">
                <Radio value="Sasuke">me</Radio>
                <Radio value="Nagato">you</Radio>
                <Radio value="Itachi">he</Radio>
                <Radio value="Sage of the six Paths">she</Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>Omdat het kan (dummy)</FormHelperText>
          </FormControl>
        </Center>
      </GridItem>
      <GridItem
        w="100%"
        h="110"
        bg={"linear-gradient(0deg, steelblue, white 40%, steelblue);"}
        borderRadius={5}
      >
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="This is a DummyFooterrrr" />
          <FormHelperText> We will never share your email.</FormHelperText>
        </FormControl>
      </GridItem>
      <GridItem
        w="100%"
        h="110"
        bg={"linear-gradient(0deg, steelblue, white 40%, steelblue);"}
        borderRadius={5}
      >
        <Center mt={10}>
          <Button color={"black"} onClick={onOpen} mr={4}>
            <Link> https://www.wincacademy.nl/</Link>
          </Button>
        </Center>
      </GridItem>
      <Modal size={["full", "md"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hello Welcome on this little modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            height={["full", "fit-content"]}
            display="flex"
            justifyContent="center"
            alignItems={["center", "flex-start"]}
            flexDir="column"
          >
            <Text>This is a DummyFooterrrr</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              RETURN
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      ;
    </Grid>
  );
};
