import { NavigationContainer } from '@react-navigation/native';
import { Box, useColorModeValue, useToken } from 'native-base';
import React from 'react';

import { RootStack } from '@/routers/router';

export const Root = () => {
  const [lightBg, darkBg] = useToken(
    'colors',
    ['coolGray.50', 'blueGray.900'],
    'blueGray.900',
  );
  const bgColor = useColorModeValue(lightBg, darkBg);

  return (
    <NavigationContainer
      theme={{
        colors: { background: bgColor },
      }}>
      <Box
        safeArea
        flex={1}
        px="4"
        py="4"
        w="100%"
        _light={{
          bg: 'coolGray.50',
        }}
        _dark={{
          bg: 'blueGray.900',
        }}
        _web={{
          overflowX: 'hidden',
        }}>
        <RootStack />
      </Box>
    </NavigationContainer>
  );
};
