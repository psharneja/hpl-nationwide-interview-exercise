import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: PersonResponse;
  login: PersonResponse;
  createProperty?: Maybe<Property>;
  editProperty?: Maybe<Scalars['Boolean']>;
};


export type MutationRegisterArgs = {
  options: PersonPasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreatePropertyArgs = {
  input: PropertyInput;
};


export type MutationEditPropertyArgs = {
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Float'];
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type PersonPasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PersonResponse = {
  __typename?: 'PersonResponse';
  errors?: Maybe<Array<FieldError>>;
  person?: Maybe<Person>;
};

export type Property = {
  __typename?: 'Property';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  imageUrl: Scalars['String'];
  text: Scalars['String'];
  creator_id: Scalars['Float'];
};

export type PropertyInput = {
  title: Scalars['String'];
  text: Scalars['String'];
  creator_id: Scalars['Float'];
  imageUrl: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  property?: Maybe<Property>;
  properties?: Maybe<Array<Property>>;
};


export type QueryPropertyArgs = {
  id: Scalars['Float'];
};

export type CreatePropertyMutationVariables = Exact<{
  options: PropertyInput;
}>;


export type CreatePropertyMutation = { __typename?: 'Mutation', createProperty?: Maybe<{ __typename?: 'Property', _id: number, text: string, title: string, creator_id: number, imageUrl: string }> };

export type EditPropertyMutationVariables = Exact<{
  imageUrl: Scalars['String'];
  title: Scalars['String'];
  id: Scalars['Float'];
}>;


export type EditPropertyMutation = { __typename?: 'Mutation', editProperty?: Maybe<boolean> };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'PersonResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, person?: Maybe<{ __typename?: 'Person', _id: number, createdAt: string, updatedAt: string, username: string }> } };

export type RegisterMutationVariables = Exact<{
  options: PersonPasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'PersonResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, person?: Maybe<{ __typename?: 'Person', _id: number, username: string, createdAt: string, updatedAt: string }> } };

export type PropertiesQueryVariables = Exact<{ [key: string]: never; }>;


export type PropertiesQuery = { __typename?: 'Query', properties?: Maybe<Array<{ __typename?: 'Property', _id: number, text: string, title: string, createdAt: string, creator_id: number, imageUrl: string }>> };

export type PropertyQueryVariables = Exact<{
  propertyId: Scalars['Float'];
}>;


export type PropertyQuery = { __typename?: 'Query', property?: Maybe<{ __typename?: 'Property', _id: number, createdAt: string, creator_id: number, updatedAt: string, text: string, title: string, imageUrl: string }> };


export const CreatePropertyDocument = gql`
    mutation CreateProperty($options: PropertyInput!) {
  createProperty(input: $options) {
    _id
    text
    title
    creator_id
    imageUrl
  }
}
    `;

export function useCreatePropertyMutation() {
  return Urql.useMutation<CreatePropertyMutation, CreatePropertyMutationVariables>(CreatePropertyDocument);
};
export const EditPropertyDocument = gql`
    mutation EditProperty($imageUrl: String!, $title: String!, $id: Float!) {
  editProperty(imageUrl: $imageUrl, title: $title, id: $id)
}
    `;

export function useEditPropertyMutation() {
  return Urql.useMutation<EditPropertyMutation, EditPropertyMutationVariables>(EditPropertyDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    errors {
      field
      message
    }
    person {
      _id
      createdAt
      updatedAt
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: PersonPasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    person {
      _id
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const PropertiesDocument = gql`
    query Properties {
  properties {
    _id
    text
    title
    createdAt
    creator_id
    imageUrl
  }
}
    `;

export function usePropertiesQuery(options: Omit<Urql.UseQueryArgs<PropertiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PropertiesQuery>({ query: PropertiesDocument, ...options });
};
export const PropertyDocument = gql`
    query Property($propertyId: Float!) {
  property(id: $propertyId) {
    _id
    createdAt
    creator_id
    updatedAt
    text
    title
    imageUrl
  }
}
    `;

export function usePropertyQuery(options: Omit<Urql.UseQueryArgs<PropertyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PropertyQuery>({ query: PropertyDocument, ...options });
};