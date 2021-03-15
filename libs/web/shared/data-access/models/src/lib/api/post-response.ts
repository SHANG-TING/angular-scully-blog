export interface PostInfo {
  route: string;
  title: string;
  tags: string[];
  description: string;
  image: string;
  author: string;
  date: string;
  published: boolean;
  sourceFile: string;
}

export type PostsResponse = Array<PostInfo>;
