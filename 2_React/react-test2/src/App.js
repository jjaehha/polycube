import React, { useState } from "react";
import * as marked from "marked";

const App = () => {
  const [markdown, setMarkdown] = useState("");

  // Renderer 옵션을 설정하여 Heading에 anchor를 추가하는 예제
  // div 엘리먼트의 dangerouslySetInnerHTML 속성 사용하여 렌더링 된 HTML 삽입
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    return `<h${level}><a name="${escapedText}" class="anchor" href="#${escapedText}">${text}</a></h${level}>`;
  };

  // 클립보드에 텍스트 복사하는 함수
  const copyToClipboard = (text) => {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    alert("인용문이 복사되었습니다!");
  };

  // Markdown을 HTML로 렌더링하는 함수
  const renderMarkdown = () => {
    const parsedMarkdown = marked.parse(markdown, { renderer: renderer });
    return { __html: parsedMarkdown };
  };

  return (
    <div>
      {/* textarea 엘리먼트를 렌더링, Markdown을 onChange 이벤트 핸들러로 상태 업데이트 */}
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Markdown을 입력하세요..."
      ></textarea>
      <div
        dangerouslySetInnerHTML={renderMarkdown()}
        onClick={(e) => {
          // 인용문을 클릭한 경우 복사
          copyToClipboard(e.target.innerText);
        }}
      ></div>
    </div>
  );
};

export default App;
