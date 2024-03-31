import React, { useState } from "react";
import PostsCreationModal from "./PostsCreationModal";

import "./Posts.css";

const mapPosts = (postsArray, launchPostCreationModalWith) => {
  if (postsArray.length == 0)
    return (
      <tr>
        <td>NO POSTS</td>
        <td>-/-</td>
        <td>-/-</td>
      </tr>
    );

  return postsArray.map((data, index) => {
    const getLocaleDate = () =>
      new Date(data.date).toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }).toUpperCase
    const getLocaleTime = () => new Date(data.date).toLocaleTimeString().slice(0, 5);
    const getTags = () => (data.tagsArray.length == 0 ? "Sin etiquetas" : data.tagsArray.join(", "));

    return (
      <tr key={index} onClick={() => launchPostCreationModalWith(data)} className="post">
        <td>{data.title}</td>
        <td>
          {getLocaleDate()} ({getLocaleTime()})
        </td>
        <td>{getTags()}</td>
      </tr>
    );
  });
};

export default function Posts() {
  const [createNewPost, setCreateNewPost] = useState(false);
  const [postsArray, setPostsArray] = useState([]);
  const [editPostData, setEditPostData] = useState(null)

  const addPostHandler = (postData = { UID: "", title: "", date: "", tagsArray: "", body: "" }) => {

    setPostsArray((prevState) => {

      let edited = false

      prevState.find((post) => {
        if(post.UID == postData.UID){
          edited = true
          post.title = postData.title
          post.date = postData.date
          post.tagsArray = postData.tagsArray
          post.body = postData.body
        }
      })
      
      if(edited) return [...prevState]
      else return [...prevState, postData]
    });
    setEditPostData(null) // Clearing in case of post edition
  };

  const launchPostCreationModalWith = data => {
    setEditPostData(data)
    setCreateNewPost(true)
  }

  const closeModalHandler = () => {
    setCreateNewPost(false)
    setEditPostData(null)
  }

  return (
    <div>
      <h1>Posts</h1>
      <hr />
      <button onClick={() => setCreateNewPost(true)}>Create new post +</button>
      <table id="posts-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>{mapPosts(postsArray, launchPostCreationModalWith)}</tbody>
      </table>
      {createNewPost && <PostsCreationModal postData={editPostData} closeModalHandler={closeModalHandler} addNewPost={addPostHandler} />}
    </div>
  );
}
