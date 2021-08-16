import { Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../../components/InputField';
import Wrapper from '../../components/Wrapper';
import { useEditPropertyMutation } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const EditProperty: NextPage<{token: string}>= ({token}) => {
  const router = useRouter(); 
  const [,editProperty] = useEditPropertyMutation()

   return  <Wrapper variant="small">
    <Formik
      initialValues={{ title: "", imageUrl: "", id: token }}
      onSubmit={async (values,) => {
        const response = await editProperty(
          {
            title: values.title,
            imageUrl: values.imageUrl,
            id: parseInt(token)
          }
        );
        if(!response.data?.editProperty) {
            alert('error updating')
        }
        router.push('/');
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="title"
            placeholder="title"
            label="New title"
          />
          <InputField
            name="imageUrl"
            placeholder="Image URL"
            label="New URL"
          />
          <Button mt={4} isLoading={isSubmitting} type="submit" color="teal">
            update property
          </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>;
};

EditProperty.getInitialProps = ({query}) => {
    return {
        token: query.token as string
    }

}

export default withUrqlClient(createUrqlClient)(EditProperty);