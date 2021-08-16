import { AddIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Image,
  Flex,
  Alert,
  AlertIcon,
  Stack,
  Link,
  Tag,
  TagLabel,
  TagRightIcon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { usePropertiesQuery } from "../generated/graphql";

export const Gallery: React.FC<{}> = ({}) => {
  const [{ data }] = usePropertiesQuery({});
  const properties = data?.properties;

  const displayProperties = () => {
    return properties?.map((res) => {
      return (
        <WrapItem key={res._id}>
          <Box
            
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={res?.imageUrl} />

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  New
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                ></Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {res?.title}
              </Box>

              <Box>
                {res?.text}
                <Box as="span" color="gray.600" fontSize="sm"></Box>
              </Box>
            </Box>
          </Box>
        </WrapItem>
      );
    });
  };

  return (
    <>
      <Tag
        mt="10"
        mr="auto"
        ml="10"
        size="lg"
        key="lg"
        variant="subtle"
        colorScheme="maroon"
      >
        <TagLabel>HPL</TagLabel>
      </Tag>
      <Flex>
        <NextLink href="/create-property">
          <Link>
            <Tag size="lg" key="lg" variant="subtle" colorScheme="cyan">
              <TagRightIcon boxSize="12px" as={AddIcon} />
              <TagLabel>Add Property</TagLabel>
            </Tag>
          </Link>
        </NextLink>
      </Flex>
      <Wrap margin="10px" spacing="30px" justify="center">
        {properties?.length ? (
          displayProperties()
        ) : (
          <Stack>
            <Alert status="info">
              <AlertIcon />
              No Properties Available!
            </Alert>
          </Stack>
        )}
      </Wrap>
    </>
  );
};

export default Gallery;
