"use client"
import { Box, CssBaseline, Toolbar } from "@mui/material";
import CategoryDrawer from "@/components/Main/CategoryDrawer";
import { useState } from "react";

export default function Write() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const url = "http://localhost:8080/v1/question";

    const data = {
      title: title,
      category: category,
      nickname: nickname,
      password: password,
      content: content,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("POST 요청 성공:", result);

        setTitle("");
        setCategory("");
        setNickname("");
        setPassword("");
        setContent("");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">게시판 타입 선택</option>
        <option value="minishell">minishell</option>
        <option value="minirt">minirt</option>
        <option value="ft_irc">ft_irc</option>
      </select>
      <input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">게시물 작성</button>
    </form>
  );
};