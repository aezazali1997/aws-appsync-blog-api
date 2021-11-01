import { Blog } from "../models/blog.model";
import { customEvent } from "../models/event.model";
import { addBlog } from "./addBlog";
import { deleteBlog } from "./deleteBlog";
import { getAllBlogs } from "./listBlog";
import { getById } from "./blogById";
import { updateBlog } from "./updateBlog";
exports.handler = async (event: customEvent) => {
  switch (event.info.fieldName) {
    case "addBlog":
      return await addBlog(event.arguments.input);
      break;
    case "deleteBlog":
      return await deleteBlog(event.arguments.id);
      break;
    case "updateBlog":
      return await updateBlog(event.arguments.id, event.arguments.input);
      break;
    case "UI__getAllBlogs":
      return await getAllBlogs();
      break;
    case "UI__getBlog":
      return await getById(event.arguments.id);
      break;
    default:
      return "Nothing matched";
      break;
  }
};
