import { useLoaderData, Link } from "react-router-dom";
import {
  Heading,
  Text,
  Center,
  Box,
  useColorModeValue,
  Img,
  Input,
  SimpleGrid,
  Tag,
  Select,
  Card,
  Stack,
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";

export const jsonData = async () => {
  const evenementen = await fetch(`http://localhost:3000/events`);
  const categorieen = await fetch("http://localhost:3000/categories");

  return {
    events: await evenementen.json(),
    categories: await categorieen.json(),
  };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [selectCategorie, setSelectedCategorie] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleCategorySelect = (e) => {
    setSelectedCategorie(e.target.value);
  };

  const matchedEvents = events.filter((event) => {
    if (selectCategorie) {
      const category = event.categoryIds;
      return (
        category == selectCategorie &&
        (event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          event.description.toLowerCase().includes(searchInput.toLowerCase()))
      );
    } else {
      return (
        event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        event.description.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
  });

  return (
    <Center py={6}>
      <Box fontFamily={"italic"}>
        <Center>
          {/* <Box
            borderRadius={5}
            padding={"1rem"}
            w={"65%"}
            marginBottom={"2rem"}
            bg="steelblue"
            textShadow={useColorModeValue(
              "  0 0 3px skyblue  , 0 0 15px white"
            )}
          > */}
          <Heading
            marginBottom={"2rem"}
            as="h1"
            size="3xl"
            textAlign={"center"}
            textShadow={useColorModeValue(
              "  0 0 3px skyblue  , 0 0 15px white"
            )}
          >
            Upcoming events
          </Heading>
          <Center>
            <Input
              margin={3}
              onChange={handleSearchInput}
              color="black"
              borderColor="black"
              boxSize={"90%"}
              height="40px"
              placeholder="Search events......."
              bg={"skyblue"}
            />
            <Select
              borderColor="#21130d"
              placeholder="Filter by category"
              onChange={handleCategorySelect}
              value={selectCategorie}
              boxSize={"90%"}
              margin={"0.75rem"}
              fontFamily={"italic"}
              bg={"skyblue"}
            >
              <option value={1}>sports</option>
              <option value={2}>games</option>
              <option value={3}>muziek</option>
              <option value={4}>art</option>
              <option value={5}>other</option>
            </Select>
          </Center>
          {/* </Box> */}
        </Center>
        <SimpleGrid columns={{ sm: 11, md: 2, lg: 4 }} justifyItems="center">
          {matchedEvents.map((event) => (
            <Card
              key={event.id}
              w="xs"
              h={"md"}
              my={2}
              mx={[0, 2]}
              bg="steelblue"
              fontFamily={"italic"}
              textShadow={useColorModeValue(
                "  0 0 3px skyblue  , 0 0 10px white"
              )}
            >
              <Box>
                <Img
                  src={event.image}
                  roundedTop={"sm"}
                  objectFit="cover"
                  h="12.5rem"
                  w="full"
                  alt={"Blog Image"}
                />
              </Box>
              <Box mt={10}>
                <Center>
                  <Link to={`event/${event.id}`}>
                    <Heading
                      marginBottom={"0.3rem"}
                      as="h1"
                      size="lg"
                      noOfLines={1}
                      fontFamily={"italic"}
                    >
                      {event.title}
                    </Heading>
                  </Link>
                </Center>
                <Center>
                  <Text marginBottom={"1rem"}>
                    {new Date(event.startTime).toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {"-"}
                    {new Date(event.endTime).toLocaleString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Center>
                <Center>
                  <Text
                    fontSize="2xl"
                    noOfLines={1}
                  >{`${event.description}`}</Text>
                </Center>
              </Box>
              <Center m={50}>
                <Stack direction="row">
                  <Badge variant="transpirant" colorScheme="green">
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

                  <Badge
                    variant="subtle"
                    bg={
                      "linear-gradient(0deg, steelblue, white 40%, steelblue);"
                    }
                  >
                    <Link to={`event/${event.id}`}>
                      <Text fontSize={"md"} fontWeight={"semibold"} mt={1}>
                        Info
                      </Text>
                    </Link>
                  </Badge>
                </Stack>
              </Center>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Center>
  );
};
