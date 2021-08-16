import React from "react";
import { Form, Formik } from "formik";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import InputField from "../components/InputField";
import { useCreatePropertyMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { isServer } from "../utils/isServer";
import { NextPage } from "next";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
const CreateProperty: NextPage<{ user: any }> = ({ user }) => {
  const router = useRouter();
  const [, createProperty] = useCreatePropertyMutation();

  const logout = () => {
    if (!isServer()) {
      localStorage.removeItem("user");
      router.push("/login");
    }
  };
  let body;

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
  if (user?._id) {
    return (
      <>
        <Flex zIndex={2} position="sticky" top={0} bg="#3b5998" p={4}>
          <Box ml={"auto"}>{body}</Box>
        </Flex>
        <Layout variant="small">
          <Formik
            initialValues={{
              title: "",
              text: "",
              imageUrl: "",
              creator_id: user._id,
            }}
            onSubmit={async (values) => {
              const { error } = await createProperty({ options: values });
              if (!error) {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <InputField name="title" placeholder="title" label="title" />
                <Box mt={4}>
                  <InputField
                    textarea
                    name="text"
                    placeholder="text..."
                    label="body"
                  />
                </Box>
                <Box mt={4}>
                  <InputField
                    name="imageUrl"
                    placeholder="imageUrl..."
                    label="image url"
                  />
                </Box>
                <Button
                  mt={4}
                  isLoading={isSubmitting}
                  type="submit"
                  color="teal"
                >
                  add property
                </Button>
              </Form>
            )}
          </Formik>
        </Layout>
      </>
    );
  }
  return (
    <Layout variant="small">
      <Stack>
        <Alert status="info">
          <AlertIcon />
          Please login first!
        </Alert>
      </Stack>
    </Layout>
  );
};

CreateProperty.getInitialProps = ({}) => {
  if (!isServer()) {
    return {
      user: JSON.parse(localStorage.getItem("user") || "{}"),
    };
  }
  return {
    user: undefined,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(CreateProperty);
