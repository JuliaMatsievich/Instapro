import { USER_POSTS_PAGE} from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renewPosts  } from "../index.js";
import { getLike, removeLike } from "../api.js";



export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">
 
    </ul>
  </div>`;

  const postHtml = posts.map((post) => {

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
        `<p class="post-likes-name">${post.likes[0].name}                
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
            ${post.createdAt}
          </p>
          </li>
          `
  })

  appEl.innerHTML = appHtml;
  const postsList = document.querySelector('.posts');
  postsList.innerHTML = postHtml.join('');

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
          .then(() => {
            renewPosts()
          })
      } else {
        getLike({
          token: getToken(), 
          id: likeBtn.dataset.postId
          })
          .then(() => { renewPosts() })
      }
    })
  }
}
