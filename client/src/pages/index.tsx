import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Gallery } from "../components/Gallery";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";
import React from "react";

const Index: NextPage<{ user: any }> = ({ user }) => {
  const router = useRouter();

  let body;

  const logout = () => {
    if (!isServer()) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };

  if (!user) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box color="white" mr={2}>
          {user?.username}
        </Box>
        <Button
          onClick={() => {
            logout();
          }}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <>
      <Flex zIndex={2} position="sticky" top={0} bg="#3b5998" p={4}>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
      <Container height="100vh">
        <DarkModeSwitch />
        <Gallery />
      </Container>
    </>
  );
};

Index.getInitialProps = ({}) => {
  if (!isServer()) {
    return {
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    };
  }
  return {
    user: undefined,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Index);
