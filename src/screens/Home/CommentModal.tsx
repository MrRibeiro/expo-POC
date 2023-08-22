import { Flex, List, Modal } from 'native-base';
import React from 'react';
import { Text } from 'react-native';

import { Comment, CommentModalProps } from './types';

export const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  onClose,
  comments,
}) => {
  console.log(comments);
  const renderReplies = (replies: Comment[]) => {
    return replies.map(reply => (
      <Flex key={reply.id} style={{ paddingLeft: 20 }}>
        <Text>{reply.text}</Text>
        {reply.replies && renderReplies(reply.replies)}
      </Flex>
    ));
  };

  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      avoidKeyboard
      justifyContent="flex-end"
      bottom="4"
      size="lg">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Comentários</Modal.Header>
        <Modal.Body>
          {comments.map(comment => (
            <Flex key={comment.id}>
              <Text>{comment.text}</Text>
              <List>{renderReplies(comment.replies)}</List>
            </Flex>
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
