import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from '@chakra-ui/react';

import { Logo } from './Logo';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box display="flex" backgroundColor="blue.900" height="100vh">
        <nav>
          <Flex>
            <Logo />
            <Text color="orange.500" fontWeight="bold" fontSize="3xl">
              Trackex
            </Text>
          </Flex>
          <ul>
            <li>Dashboard</li>
            <li>Calendar</li>
            <li>Transactions</li>
          </ul>
        </nav>
        <main> Main</main>
      </Box>
    </ChakraProvider>
  );
}

export default App;
