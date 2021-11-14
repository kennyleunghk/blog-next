import { CommentModel } from './CommentModel';

export interface PostModel {
  Category: string | null;
  Comments?: CommentModel[];
  Contents: string | null;
  Description: string | null;
  Id: number | null;
  CoverImg?: string;
  LastModified: any;
  Title: string | null;
  Tags: string | null;
  CreatedTime: string;
  CreatedUser: string | null;
}
