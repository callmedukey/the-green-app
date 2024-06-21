"use client";

import { useRef } from "react";

async function streamDownload(
  url: string,
  fileName: string,
  progressBar: HTMLDivElement
) {
  const response = await fetch(url);
  if (!response.ok) {
    return alert("Failed to download file");
  }

  const contentLength = response.headers.get("Content-Length");
  const total = contentLength ? parseInt(contentLength, 10) : 0;
  let loaded = 0;

  if (!response.body) {
    return alert("Failed to download file");
  }
  const reader = response.body.getReader();
  const stream = new ReadableStream({
    start(controller) {
      function push() {
        reader
          .read()
          .then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            loaded += value.byteLength;
            controller.enqueue(value);

            const progress = (loaded / total) * 100;

            progressBar.style.width = progress + "%";

            push();
          })
          .catch((error) => {
            controller.error(error);
            alert("손상된 파일 다운로드 오류입니다");
          });
      }
      push();
    },
  });

  const newResponse = new Response(stream);
  const blob = await newResponse.blob();
  const urlBlob = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = urlBlob;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(urlBlob);

  const statusElement = document.getElementById("status");
  if (statusElement) {
    statusElement.textContent = "Download complete";
  } else {
    console.error("Status element not found");
  }
}

const AttachmentDownload = ({ fileName }: { fileName: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const downloadFile = () => {
    streamDownload(
      "/api/admin/get-file?fileName=" + fileName,
      fileName,
      ref.current as HTMLDivElement
    );
  };
  return (
    <div
      className={
        "size-24 border-2 rounded-2 flex cursor-pointer rounded-md flex-col p-0 text-center justify-center items-center"
      }
      onClick={downloadFile}
    >
      <div className="mt-auto">첨부파일</div>

      <div
        className="h-2 bg-red-500 mt-auto mb-0 ml-0 mr-0"
        style={{ width: "0%" }}
        ref={ref}
      />
    </div>
  );
};

export default AttachmentDownload;
