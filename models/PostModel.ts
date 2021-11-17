import { CommentModel } from './CommentModel';

export interface PostModel {
  Category?: string;
  Comments?: CommentModel[];
  Contents?: string;
  Description?: string;
  Id?: number;
  CoverImg?: string;
  LastModified?: any;
  Title?: string;
  Tags?: string;
  CreatedTime?: string;
  CreatedUser?: string;
}
