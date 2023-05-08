import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2} fontFamily={"cursive"}>
      <GridItem w="100%" h="110">
        <Center mt={25}>
          <Link to={"/"}>
            <Button
              marginBottom={"0.5rem"}
              variant="outline"
              color="black"
              bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
              textShadow={useColorModeValue(
                "  0 0 3px skyblue  , 0 0 10px white"
              )}
            >
              All events
            </Button>
          </Link>
        </Center>
      </GridItem>

      <GridItem
        w="100%"
        h="110"
        bg={"linear-gradient(0deg, steelblue, white 40%, steelblue);"}
        borderRadius={5}
      >
        <Center>
          <Heading
            mt={4}
            size="xl"
            textShadow={useColorModeValue(
              "  0 0 3px skyblue  , 0 0 10px white"
            )}
            fontFamily={"cursive"}
          >
            Events
          </Heading>
        </Center>
      </GridItem>

      <GridItem w="100%" h="110">
        <Center mt={25}>
          <Link to={"/event/addevent"}>
            <Button
              marginBottom={"0.5rem"}
              variant="outline"
              textShadow={useColorModeValue(
                "  0 0 3px skyblue  , 0 0 10px white"
              )}
              color="black"
              bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
            >
              Add event
            </Button>
          </Link>
        </Center>
      </GridItem>
    </Grid>
  );
};
