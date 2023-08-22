export interface TypesContentsType {
  name: string;
  value: string;
  pressed: boolean;
}

export interface RepliesType {
  id: string;
  userOriginId: string;
  nameAuthor: string;
  avatarUserOrigin: string;
  comment: string;
  likesCount: number;
}

export interface CommentType {
  id: string;
  userOriginId: string;
  nameAuthor: string;
  avatarUserOrigin: string;
  comment: string;
  replies: RepliesType[];
  likesCount: number;
}

export interface ContentsType {
  id: string;
  idAuthor: string;
  nameAuthor: string;
  avatarAuthor: string;
  image: string;
  type: string;
  typeMachine: string;
  title: string;
  description: string;
  likesCount: number;
  liked?: boolean;
  comments: CommentType[];
  relevance: number;
}
