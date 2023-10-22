import "../molecules/ModalBase";
import { useState, useRef, useEffect } from "react";
import { sendMe } from "../../apis/kakao";

import ModalBase from "../molecules/ModalBase";
import Toast from "../molecules/Toast";

import file_icon from "../../assets/paper_icon.png";
import upload_cloud from "../../assets/upload_cloud.png";

const KakaoFileUploadModal = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkList, setLinkList] = useState([]);
  const fileInput = useRef(null);

  // 파일 선택 핸들러
  const handleUpload = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    console.log("selected file: ", e.target.files[0]);
    if (e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const removeFile = () => {
    fileInput.current.value = "";
    setSelectedFile(null);
    setLinkList([]);
  };
  const sendMeHandler = () => {
    console.log("file: ", selectedFile);
    sendMe({ file: selectedFile })
      .then((res) => {
        console.log("send me: ", res.data?.response);
        setLinkList(res.data?.response);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (selectedFile) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  }, [selectedFile]);

  const addedFileArea = (
    <div className="mx-20">
      <span className="block text-sm pl-5 mb-4">선택한 파일</span>
      {isFileSelected && (
        <div className="flex flex-row gap-x-4 p-4 border rounded-lg">
          <img src={file_icon} alt="file icon" className="w-6 h-6" />
          <span className="flex-grow text-sm">{selectedFile?.name}</span>
          <button
            className="text-xs text-[rgba(0, 0, 0, 0.70)]"
            onClick={removeFile}
          >
            삭제
          </button>
        </div>
      )}
      {linkList.length > 0 && (
        <ul className="h-[150px] w-[670px] p-2 overflow-y-scroll overflow-x-clip bg-[#0f91d2]">
          {linkList.map((item, index) => {
            return (
              <li
                key={index}
                className="p-2 mb-1 border rounded-xl bg-[#ffffff]"
              >
                {item.link}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
  const fileSelectArea = (
    <>
      <div
        className={`flex items-center my-12 mx-24 border rounded-xl ${
          isFileSelected
            ? "flex-row px-8 py-4 gap-x-8"
            : "flex-col p-14 gap-y-6 "
        }`}
      >
        <img
          src={upload_cloud}
          alt="file upload cloud icon"
          className="w-12 h-12"
        />
        <div className={`flex-grow ${!isFileSelected && "text-center"}`}>
          <span className="block text-sm mb-3">
            Select a file or drag and drop here
          </span>
          <span className="block text-xs text-[#00000066]">
            .txt 또는 .csv 파일
          </span>
        </div>
        <button
          className="px-4 py-3 border border-[#0f91d2] bg-white rounded-md"
          onClick={handleUpload}
        >
          <span className="text-xs text-[#0F91D2] text-transform: uppercase">
            select file
          </span>
        </button>
        <input
          type="file"
          accept=".txt, .csv"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      {isFileSelected && addedFileArea}
      {isFileSelected && (
        <button
          className="border p-4 bg-[#000000] text-[#ffff00] rounded"
          onClick={sendMeHandler}
        >
          API 요청
        </button>
      )}
    </>
  );

  const modalContent = (
    <div>
      <div className="mx-auto text-center">
        <h2 className="text-xl mb-4">카카오톡에서 가져오기</h2>
        <span className="text-sm text-[rgba(0, 0, 0, 0.60)]">
          카카오톡에서 내보내기한 파일을 선택해주세요.
        </span>
      </div>
      {fileSelectArea}
    </div>
  );

  return (
    <ModalBase size="lg" titleName="" prevName="취소">
      {modalContent}
    </ModalBase>
  );
};

export default KakaoFileUploadModal;
