import { ContentsType } from '@/screens/Home/types';

export interface CardProps {
  content: ContentsType;
  onLike: (id: string) => void;
  openModal: () => void;
}
