import React, { Component, createRef } from "react";
import "./Editor.css";
import BaseTextArea from "./BaseTextArea";
// 애너그램
// 두개의 문자열이 서로 같은 문자를 포함하고 있고, 같은길이를 가지고 있어야함
// function Anagram(str1, str2) {
//   const sortedStr1 = str1.split("").sort().join("");
//   const sortedStr2 = str2.split("").sort().join("");
//   return sortedStr1 === sortedStr2;
// }

function Anagram(str1, str2) {
  const charCount = {};

  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!charCount[char]) {
      return false;
    }
    charCount[char]--;
  }

  return true;
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.textAreaRef = createRef();
    this.state = { anagramCount: 0 };
  }

  textClear = () => {
    if (this.textAreaRef.current) {
      this.textAreaRef.current.value = "";
    }
  };

  //   countAnagrams = () => {
  //     if (this.textAreaRef.current) {
  //       const words = this.textAreaRef.current.value.split(" ");
  //       const baseWord = words[0];
  //       const anagramCount = this.countAnagrams(
  //         baseWord,
  //         words.slice(1).join(" ")
  //       );
  //       console.log(`Number of anagrams: ${anagramCount}`);
  //     }
  //   };

  //   countAnagrams(baseWord, text) {
  //     const words = text.split(" ");
  //     let anagramCount = 0;

  //     // 첫 번째 단어를 기준으로 다른 단어들과 애너그램 여부를 확인합니다.
  //     for (let i = 0; i < words.length; i++) {
  //       if (Anagram(baseWord, words[i])) {
  //         anagramCount++;
  //       }
  //     }

  //     return anagramCount;
  //   }
  countAnagrams = () => {
    if (this.textAreaRef.current) {
      const words = this.textAreaRef.current.value.split(" ");
      const baseWord = words[0];
      let anagramCount = 0;

      for (let i = 1; i < words.length; i++) {
        if (Anagram(baseWord, words[i])) {
          anagramCount++;
          return anagramCount;
        }
      }

      console.log(`애너그램 갯수: ${anagramCount}`);
      this.setState({ anagramCount });
    }
  };

  render() {
    return (
      <div className="editorWrap">
        <BaseTextArea ref={this.textAreaRef} className="text" />
        <h3>애너그램 갯수: {this.state.anagramCount}</h3>
        <div className="buttonWrap">
          <button className="button" onClick={this.textClear}>
            텍스트 지우기
          </button>
          <button className="button" onClick={this.countAnagrams}>
            애너그램 갯수 세기
          </button>
        </div>
      </div>
    );
  }
}

export default Editor;
