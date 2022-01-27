import mongoose from "mongoose";

const schema = new mongoose.Schema({
  content: {
    type: String,
  },
  isMarked: {
    type: Boolean,
    default: false,
  },
});
const ListElement =
  mongoose.models.ListElement || mongoose.model("ListElement", schema);

export default ListElement;
