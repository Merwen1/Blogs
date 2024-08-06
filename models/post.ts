import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  subTitle: {
    type: String,
  },
  desc: {
    type: String,
    required: [true, "Please provide a description"],
  },
  img: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  user_id: {
    type: String,
  },
});

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;
