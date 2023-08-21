import { Ionicons } from '@expo/vector-icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  useColorMode,
} from 'native-base';
import React, { useState } from 'react';

interface typesContentsProps {
  name: string;
  value: string;
  pressed: boolean;
}

const typesContents: typesContentsProps[] = [
  { name: 'technology', value: 'Tecnologia', pressed: false },
  { name: 'policy', value: 'Politica', pressed: false },
  { name: 'news', value: 'Notícias', pressed: false },
  { name: 'medicine', value: 'Medicina', pressed: false },
  { name: 'frontend', value: 'FrontEnd', pressed: false },
  { name: 'backend', value: 'BackEnd', pressed: false },
];

const COUNT_CONTENTS: number = 20;

export function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [buttonsType, setButtonsType] = useState(typesContents);

  const toggleSort = () => {
    const newSortBy = sortBy === 'asc' ? 'desc' : 'asc';
    console.log(newSortBy);
    setSortBy(newSortBy);
  };

  const handleButtonPress = (buttonName: string) => {
    const updatedButtons = typesContents.map(button =>
      button.name === buttonName
        ? { ...button, pressed: true }
        : { ...button, pressed: false },
    );
    setButtonsType(updatedButtons);
  };

  return (
    <Box bg={colorMode === 'dark' ? 'black' : 'white'} height="100%">
      <Box alignItems="center">
        <Input
          variant="filled"
          InputRightElement={
            <Pressable>
              <Icon
                as={<Ionicons name="search" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Search"
        />
      </Box>

      <HStack mt="4">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space={4}>
            {buttonsType.map(button => (
              <Button
                key={button.name}
                size="xs"
                onPress={() => handleButtonPress(button.name)}
                bgColor={button.pressed ? 'primary.100' : '#F2F2F2'}
                _text={{
                  color: 'darkText',
                }}>
                {button.value}
              </Button>
            ))}
          </HStack>
        </ScrollView>
      </HStack>

      <Flex direction="row" mt="4">
        <Text fontSize={'xs'} bold>
          {COUNT_CONTENTS} conteúdos
        </Text>
        <Spacer />

        <Button
          variant="unstyled"
          size={'xs'}
          rightIcon={
            sortBy === 'asc' ? (
              <Ionicons name="arrow-down" />
            ) : (
              <Ionicons name="arrow-up" />
            )
          }
          paddingTop={'none'}
          onPress={toggleSort}>
          Sort by relevant
        </Button>
      </Flex>

      <ScrollView contentContainerStyle={{ width: '100%' }}>
        {/* TODO - FLATLIST COM COMPONENTE DOS CARDS */}
      </ScrollView>
    </Box>
  );
}
