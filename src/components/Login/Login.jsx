import {Field, Formik} from "formik";
import {Box, Input, Text, Flex, Heading, Button} from "@chakra-ui/react";

import {LoginSchema, loginInit} from "../../utils/schema/login";

const Login = () => {
  const CustomInputComponent = (props) => <Input className="form__input" type={props.type && "text"} {...props} />;

  return (
    <Flex align="center" bg="gray.100" h="100vh" justify="center">
      <Box bg="white" p={6} rounded="md" w={"lg"}>
        <Heading as="h1">Iniciar sesión</Heading>
        <Formik initialValues={loginInit} validationSchema={LoginSchema} onSubmit={(values) => console.info(values)}>
          {({errors, touched, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Field as={CustomInputComponent} name="username" placeholder="Username" type="text" />
              <Box className="error">
                {errors.username && touched.username ? <Text color="tomato">{errors.username}</Text> : null}
              </Box>
              <Field as={CustomInputComponent} name="password" placeholder="Password" type="password" />
              <Box className="error">
                {errors.password && touched.password ? <Text color="tomato">{errors.password}</Text> : null}
              </Box>
              <Flex align="center" justify="center">
                <Button colorScheme="purple" type="submit" variant="outline" width="full">
                  Ingresar
                </Button>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default Login;
