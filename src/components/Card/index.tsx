import { Ionicons } from '@expo/vector-icons';
import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from 'native-base';
import React from 'react';

import { CardProps } from './types';

export function Card({ content, onLike }: CardProps) {
  return (
    <Box alignItems="center" key={content.id} pt={4}>
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        bg="gray.50">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: content.image,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _text={{
              color: 'warmGray.50',
              fontWeight: '700',
              fontSize: 'xs',
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5">
            Fotos
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {content.title}
            </Heading>
            <Text
              fontSize="xs"
              color="violet.500"
              fontWeight="500"
              ml="-0.5"
              mt="-1">
              By: {content.nameAuthor}
            </Text>
          </Stack>
          <Text fontWeight="400">{content.description}</Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text>{content.likesCount}</Text>
              <IconButton
                onPress={() => onLike(content.id)}
                disabled={content.liked}
                borderRadius="full"
                icon={
                  <Icon
                    as={Ionicons}
                    name={content.liked ? 'heart' : 'heart-outline'}
                  />
                }
                _icon={{
                  color: 'violet.500',
                  size: 'md',
                }}
                _pressed={{
                  bg: 'violet.400',
                  _icon: {
                    as: Ionicons,
                    name: 'heart',
                  },
                }}
              />
              <IconButton
                borderRadius="full"
                _icon={{
                  as: Ionicons,
                  name: 'chatbox-outline',
                  color: 'violet.500',
                  size: 'md',
                }}
                _pressed={{
                  bg: 'violet.400',
                  _icon: {
                    as: Ionicons,
                    name: 'chatbox',
                  },
                }}
              />
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
}
