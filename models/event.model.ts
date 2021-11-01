import { Blog } from "./blog.model";
export type customEvent = {
  info: {
    fieldName: String;
  };
  arguments: {
    id: String;
    input: Blog;
  };
};
