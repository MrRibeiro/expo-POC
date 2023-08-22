import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Button,
  Center,
  FlatList,
  Flex,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Skeleton,
  Spacer,
  Text,
  VStack,
  useToast,
} from 'native-base';
import React, { useEffect, useState } from 'react';

import { ContentsType, TypesContentsType } from './types';

import { Card } from '@/components/Card';
import { fetchContentsData } from '@/services/contents';

const typesContents: TypesContentsType[] = [
  { name: 'technology', value: 'Tecnologia', pressed: false },
  { name: 'policy', value: 'Politica', pressed: false },
  { name: 'news', value: 'Notícias', pressed: false },
  { name: 'medicine', value: 'Medicina', pressed: false },
  { name: 'frontend', value: 'FrontEnd', pressed: false },
  { name: 'backend', value: 'BackEnd', pressed: false },
];

export function Home() {
  const toast = useToast();
  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');
  const [contents, setContents] = useState<ContentsType[]>([]);
  const [initialContents, setInitialContents] = useState<ContentsType[]>([]);
  const [buttonsType, setButtonsType] = useState(typesContents);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const handleButtonPress = (buttonName: string) => {
    const updatedButtons = typesContents.map(button =>
      button.name === buttonName
        ? { ...button, pressed: true }
        : { ...button, pressed: false },
    );
    setButtonsType(updatedButtons);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const storedData = await AsyncStorage.getItem('storedData');

        if (storedData) {
          setContents(JSON.parse(storedData));
          setInitialContents(JSON.parse(storedData));
        } else {
          const apiData = await fetchContentsData();
          setContents(apiData);
          setInitialContents(apiData);

          await AsyncStorage.setItem('storedData', JSON.stringify(apiData));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        toast.show({
          description: `Error: ${error}`,
        });
      }
    }

    fetchData();
  }, [toast]);

  const sortByRelevance = (a: ContentsType, b: ContentsType) => {
    if (sortBy === 'asc') {
      return a.relevance - b.relevance;
    } else {
      return b.relevance - a.relevance;
    }
  };

  const toggleSort = () => {
    const newSortBy = sortBy === 'asc' ? 'desc' : 'asc';
    setSortBy(newSortBy);

    const sortedItems = contents.slice().sort(sortByRelevance);
    setContents(sortedItems);
  };

  const handleSearch = (query: string) => {
    const filteredItems = initialContents.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setContents(filteredItems);
  };

  const handleClearSearch = () => {
    setContents(initialContents);
    setSearchQuery('');
  };

  const handleLike = (id: string) => {
    const updatedData = contents.map(item => {
      if (item.id === id) {
        console.log(item, item.likesCount + 1);
        return {
          ...item,
          likesCount: item.likesCount + 1,
          liked: true,
        };
      }
      return item;
    });

    setContents(updatedData);
  };

  const renderItem = ({ item }: { item: ContentsType }) => (
    <Card content={item} onLike={handleLike} />
  );

  if (loading) {
    // TODO - Adjusts Skeleton for equal structure
    return (
      <Center w="100%">
        <VStack
          w="90%"
          maxW="400"
          borderWidth="1"
          space={8}
          overflow="hidden"
          rounded="md"
          _light={{
            borderColor: 'coolGray.200',
          }}>
          <Skeleton h="40" />
          <Skeleton.Text px="4" />
          <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
        </VStack>
      </Center>
    );
  }

  return (
    <Box h="100%">
      <Box alignItems="center">
        <Input
          variant="filled"
          value={searchQuery}
          onChangeText={e => {
            setSearchQuery(e);
            handleSearch(e);
          }}
          InputRightElement={
            <Pressable>
              <Icon
                onPress={handleClearSearch}
                as={
                  <Ionicons
                    name={searchQuery === '' ? 'search' : 'backspace-outline'}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          placeholder="Busca"
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
                bgColor={button.pressed ? 'violet.400' : '#F2F2F2'}
                _text={{
                  color: button.pressed ? 'warmGray.50' : 'darkText',
                }}>
                {button.value}
              </Button>
            ))}
          </HStack>
        </ScrollView>
      </HStack>

      <Flex direction="row" mt="4">
        <Text fontSize={'xs'} bold>
          {contents.length} conteúdos
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
          Ordernar por relevância
        </Button>
      </Flex>

      <VStack alignItems="center">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={contents}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </VStack>
    </Box>
  );
}
