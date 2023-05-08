import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
  useColorModeValue,
  Card,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";

export const jsonData = async ({ params }) => {
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  return {
    users: await users.json(),
    categories: await categories.json(),
    event: await event.json(),
  };
};

export const EditEvent = () => {
  const toast = useToast();
  const { users, categories, event } = useLoaderData();
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  });

  const handleInputChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3000/events/${updatedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast({
          title: "Edited Succesfully.",
          status: "success",
          position: "top",
          duration: 2500,

          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <Center>
          <Heading m={5} as="h1" size="2xl">
            Edit event
          </Heading>
        </Center>
        <Form method="PUT" id="new-event-form" onSubmit={handleEditSubmit}>
          <FormControl isRequired>
            <FormLabel>Select user</FormLabel>
            <Select
              name="createdBy"
              placeholder="Select User"
              value={updatedEvent.createdBy}
              onChange={handleInputChange}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="An exciting title..."
              aria-label="Title"
              type="text"
              name="title"
              value={updatedEvent.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              aria-label="description"
              placeholder="Description"
              value={updatedEvent.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image (URL)</FormLabel>
            <Input
              placeholder="https://website.com/image.jpg"
              aria-label="image"
              type="text"
              name="image"
              value={updatedEvent.image}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Select category</FormLabel>
            <Select
              name="categoryIds"
              placeholder="Select category"
              value={updatedEvent.categoryIds}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder="Location"
              aria-label="location"
              type="text"
              name="location"
              value={updatedEvent.location}
              onChange={handleInputChange}
            />
          </FormControl>
          <Center>
            {" "}
            <FormControl isRequired>
              <FormLabel>Start time</FormLabel>
              <input
                aria-label="startTime"
                type="datetime-local"
                name="startTime"
                value={updatedEvent.startTime}
                onChange={handleInputChange}
              />
            </FormControl>
          </Center>

          <FormControl isRequired>
            <FormLabel>End time</FormLabel>
            <input
              aria-label="endTime"
              type="datetime-local"
              name="endTime"
              value={updatedEvent.endTime}
              onChange={handleInputChange}
            />
          </FormControl>

          <Center>
            {" "}
            <Button
              type="submit"
              margin={"0.5rem"}
              color="black"
              variant="outline"
              bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
            >
              Save
            </Button>{" "}
          </Center>
        </Form>

        <Link to={"/"}>
          <Button
            margin={"0.5rem"}
            color="black"
            variant="outline"
            bg={"linear-gradient(0deg, steelblue, white 20%, steelblue);"}
          >
            RETURN
          </Button>
        </Link>
      </Card>
    </Center>
  );
};
