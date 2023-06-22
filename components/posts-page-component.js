import { USER_POSTS_PAGE} from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderPosts, user  } from "../index.js";
import { setLike, removeLike } from "../api.js";
import {ru} from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";


export function renderPostsPageComponent({ appEl, userPosts }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
//Рендер страницы Юзера
  if(userPosts) {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="posts-user-header">
        <img class="posts-user-header__user-image" src="${posts.posts[0].user.imageUrl}">
        <p class="posts-user-header__user-name">${posts.posts[0].user.name}</p>
      </div>
    <ul class="posts">
    
      </ul>
    </div>`;
    const postHtml = posts.posts.map((post) => {
      const createDate = formatDistanceToNow(new Date(post.createdAt), {addSuffix: true, locale: ru})
      return `
          <li class="post">
          <div class="post-image-container">
           <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
          ${
            user._id === post.user.id
              ? `<button title="Удалить пост" data-user-id="${user._id}" class="delete-button"></button>`
              : ""
          }  
          
          <button data-post-id="${post.id}" data-post-isliked="${post.isLiked}" class="like-button">
          <img src="./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.likes.length}</strong>
          ${(post.likes.length >= 1) ?
      `<p class="post-likes-name">${post.likes[post.likes.length - 1].name}                
           </p>`
      : ""}
            ${(post.likes.length > 1) ? `<span>&nbsp;и ещё&nbsp;</span> ${post.likes.length - 1}` : ""}
        </p>
          </div>
          <p class="post-text">
           <span class="user-name">${post.user.name}</span>
           ${post.description}
          </p>
          <p class="post-date">
           ${createDate}
          </p>
          </li>
          `
    })
    appEl.innerHTML = appHtml;
    const postsList = document.querySelector('.posts');
    postsList.innerHTML = postHtml.join('');
  }
//Рендер общей страницы постов

  else {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
   
      </ul>
    </div>`;
  
    const postHtml = posts.map((post) => {
      const createDate = formatDistanceToNow(new Date(post.createdAt), {addSuffix: true, locale: ru})
      return `
            <li class="post">
            <div class="post-header" data-user-id="${post.user.id}">
                <img src="${post.user.imageUrl}" class="post-header__user-image">
                <p class="post-header__user-name">${post.user.name}</p>
            </div>
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" data-post-isliked="${post.isLiked}" class="like-button">
                <img src="./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes.length}</strong>
                ${(post.likes.length >= 1) ?
          `<p class="post-likes-name">${post.likes[post.likes.length - 1].name}                
                  </p>`
          : ""}
                   ${(post.likes.length > 1) ? `<span>&nbsp;и ещё&nbsp;</span> ${post.likes.length - 1}` : ""}
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
              ${createDate}
            </p>
            </li>
            `
    })
    appEl.innerHTML = appHtml;
    const postsList = document.querySelector('.posts');
    postsList.innerHTML = postHtml.join('');

  }

 

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId
      })
    });
  }

  for (let likeBtn of document.querySelectorAll('.like-button')) {
    likeBtn.addEventListener('click', () => {
      if (likeBtn.dataset.postIsliked === 'true') {
        removeLike({
           token: getToken(), 
           id: likeBtn.dataset.postId
           })
          .then((post) => {
            const userId = post.post.user.id;            
            renderPosts(userPosts, userId)
          })
          .catch(error => {
            if(error.message === 'Нет авторизации') {
              alert ('Лайк могут поставить только авторизованные пользователи')
            }
            console.error(error.message);
          })
      } else {
        setLike({
          token: getToken(), 
          id: likeBtn.dataset.postId
          })
          .then((post) => {
            const userId = post.post.user.id;            
            renderPosts(userPosts, userId)
          })
          .catch(error => {
            if(error.message === 'Нет авторизации') {
              alert ('Лайк могут поставить только авторизованные пользователи')
            }
            console.error(error.message);
          })
      }
    })
  }
}
