import {
  Box,
  Center,
  Heading,
  Img,
  Text,
  Tag,
  Image,
  useToast,
  Flex,
  Spacer,
  Badge,
  Stack,
  Card,
  useColorModeValue,
} from "@chakra-ui/react";

import { useLoaderData, Link } from "react-router-dom";

export const jsonData = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const users = await fetch("http://localhost:3000/users");
  const categories = await fetch("http://localhost:3000/categories");

  return {
    event: await event.json(),
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  const toast = useToast();

  const showToast = JSON.parse(localStorage.getItem("showToast"));

  if (showToast) {
    toast({
      title: "Event added succesfully",
      status: "success",
      duration: 5000,
      position: "top-right",
      isClosable: true,
    });
    localStorage.setItem("showToast", false);
  }

  const handleDeleteClick = () => {
    if (window.confirm("Are you 100% sure you want to delete this event?")) {
      fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast({
            title: "Event deleted successfully.",
            status: "success",
            duration: 5000,
            position: "top-right",
            isClosable: true,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <Center>
      <Card
        key={event.id}
        my={2}
        bg="steelblue"
        fontFamily={"italic"}
        textShadow={useColorModeValue("  0 0 3px skyblue  , 0 0 10px white")}
        margin={"2rem"}
        w={{ base: "95%", md: "90%", lg: "80%" }}
        mx="auto"
      >
        <Img
          src={event.image}
          roundedTop={"sm"}
          objectFit="cover"
          h={{ base: "15rem", md: "20rem", lg: "25rem" }}
          w="full"
          alt={"Event Image"}
        />

        <Box p={6}>
          <Center>
            <Heading size="2xl" fontFamily={"italic"} noOfLines={1}>
              {event.title}
            </Heading>
          </Center>

          <Center>
            <Text>
              Date-Time :{" "}
              {new Date(event.startTime).toLocaleString([], {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {new Date(event.endTime).toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </Center>

          <Center>
            <Text fontSize="4xl" noOfLines={2}>{`${event.description}`}</Text>
          </Center>
          <Center>
            <Text>location: {event.location}</Text>
          </Center>
          <Flex alignItems={"center"}>
            <Badge variant="transpirant">
              {categories.map((category) =>
                event.categoryIds?.includes(category.id) ? (
                  <Tag
                    key={category.id}
                    fontWeight="medium"
                    fontSize={"sm"}
                    color="black"
                    variant="outline"
                    bg={
                      "linear-gradient(0deg, steelblue, white 20%, steelblue);"
                    }
                    p={2}
                    marginRight={1}
                  >
                    {category.name}
                  </Tag>
                ) : null
              )}
            </Badge>

            <Spacer />
            {users.map((user) =>
              user.id == event.createdBy ? (
                <Badge
                  key={user.id}
                  bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
                  borderRightRadius={"0"}
                >
                  <Image borderRadius={5} boxSize="33px" src={user.image} />
                </Badge>
              ) : null
            )}
            {users.map((user) =>
              user.id == event.createdBy ? (
                <Badge
                  color="black"
                  bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
                  key={user.id}
                  borderLeftRadius={"0"}
                >
                  <Tag
                    color="black"
                    bg={
                      "linear-gradient(0deg, steelblue, white 20%, steelblue);"
                    }
                    p={2}
                  >
                    <Text>{user.name}</Text>
                  </Tag>
                </Badge>
              ) : null
            )}
          </Flex>

          <Box marginTop={"1rem"}>
            <Stack direction="row">
              <Link to={`/editevent/${event.id}`}>
                <Badge w={150} h={25} variant="outline" colorScheme="green">
                  <Center mt={1}> Edit event</Center>
                </Badge>
              </Link>

              <Badge
                w={150}
                h={25}
                variant="outline"
                colorScheme="red"
                onClick={handleDeleteClick}
              >
                <Center mt={1}>
                  <Link to={"/"}>Delete</Link>
                </Center>
              </Badge>
              <Badge w={150} h={25} variant="outline" colorScheme="black">
                <Center mt={1}>
                  <Link to={"/"}>RETURN</Link>
                </Center>
              </Badge>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Center>
  );
};
