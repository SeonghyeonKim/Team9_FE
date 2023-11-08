import WorkspaceSeleceBox from "./WorkspaceSelectBox";
import CategorySelectBox from "./CategorySelectBox";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

const BookmarkSelectItem = ({
  id,
  checked = false,
  handleCheckedChange,
  title,
  url = "",
  imageUrl = "",
  changeHandler = () => {},
}) => {
  const [bookmarkName, setBookmarkName] = useState(title);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [data, setData] = useState({
    bookmarkName: bookmarkName,
    categoryId: categoryId,
    link: url,
  });

  useEffect(() => {
    changeHandler(data);
  }, [data]);

  useEffect(() => {
    setData({
      bookmarkName: bookmarkName,
      categoryId: categoryId,
      link: url,
      imageUrl: imageUrl,
    });
  }, [bookmarkName, categoryId]);

  return (
    <div
      className={`grow flex flex-row items-center gap-x-3 px-3 py-3 mr-3 mb-1 border rounded-xl ${
        checked ? "bg-[#ecf8fc]" : "bg-[#ffffff]"
      }`}
    >
      <div className="h-24 w-32 flex items-center justify-center rounded-xl border bg-white hover:translate-x-14 hover:scale-[2]">
        <img
          src={imageUrl}
          alt={`thumbnail of ${bookmarkName}`}
          className="block h-full"
        />
      </div>
      <div className="grow">
        <input
          className="block w-full border"
          value={bookmarkName}
          disabled={`${!checked ? "disabled" : ""}`}
          onChange={(e) => setBookmarkName(e.target.value)}
        />
        <input readOnly defaultValue={url} className="w-full border-b" />
      </div>
      <div className="w-[200px]">
        <WorkspaceSeleceBox
          value={workspaceId}
          changeHandler={setWorkspaceId}
          isSlimType={true}
          disabled={!checked}
        />
        <CategorySelectBox
          workspaceId={workspaceId}
          value={categoryId}
          changeHandler={setCategoryId}
          isSlimType={true}
          disabled={!checked}
        />
      </div>
      <Checkbox id={id} checked={checked} onChange={handleCheckedChange} />
    </div>
  );
};

export default BookmarkSelectItem;
