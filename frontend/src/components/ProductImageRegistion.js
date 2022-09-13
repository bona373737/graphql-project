import React, { useRef, useState } from "react";
import styled from "@emotion/styled/macro";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Base = styled.div`
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Preview = styled.div`
  display: flex;
  justify-content: center;
`;

const PreviewImg = styled.img`
  width: 50vw;
  height: 50vh;
  border: 1px solid #ddd;
  border-radius: 10px;
  object-fit: cover;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LabelContainer = styled.div`
  display: flex;
`;

const Inex = styled.label`
  border-radius: 10px;
  margin: 20px;
  color: white;
  background-color: red;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.33333333;
  text-overflow: ellipsis;
  cursor: pointer;
  overflow: hidden;
  :hover {
    background-color: #ffcc66;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  width: 300px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #ffcc66;
  border: none;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const apiClient = axios.create({
  baseURL: "http://localhost:4000",
});

const uploadFile = async (file) => {
  try {
    const { data } = await apiClient.post("/upload", file);
    return data;
  } catch (e) {
    console.log("1111", e);
  }
};

function ProductImageRegistion() {
  const history = useHistory();
  const location = useLocation();
  const fileName_ref = useRef(null);
  const [fileName, setFileName] = useState("업로드");
  const [imageSrc, setImageSrc] = useState(
    "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
  );

  console.log(location.state);

  // 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  // multer로 서버에 파일 업로드
  const upload = async (e) => {
    e.preventDefault();
    if (
      imageSrc ===
      "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg"
    ) {
      alert("상품 이미지가 필요합니다");
    } else {
      const formData = new FormData();
      formData.append("file", e.target.file.files[0]);
      try {
        let result = await uploadFile(formData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }

      {
        location.state.getAdmin[0].admin === 2
          ? history.push({
              pathname: "/manage",
              state: location.state,
            })
          : history.push({
              pathname: "/",
              state: location.state.getAdmin[0].id,
            });
      }

      window.location.reload();
    }
  };

  return (
    <Base>
      <Preview>
        {imageSrc && <PreviewImg src={imageSrc} alt="preview-img" />}
      </Preview>
      <Container encType="mutipart/form-data" onSubmit={upload}>
        <LabelContainer>
          <Inex htmlFor="file">{fileName}</Inex>
        </LabelContainer>
        <UploadInput
          type="file"
          name="file"
          id="file"
          ref={fileName_ref}
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
            setFileName(e.target.value);
          }}
        />

        <UploadButton type="submit">상품 등록하기 (2/2)</UploadButton>
      </Container>
    </Base>
  );
}

export default ProductImageRegistion;
