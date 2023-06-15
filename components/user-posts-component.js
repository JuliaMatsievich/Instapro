import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderUserPosts({appEl}) {

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
		return `
			  <li class="post">
			  <div class="post-image-container">
				 <img class="post-image" src="${post.imageUrl}">
			  </div>
			  <div class="post-likes">
				 <button data-post-id="${post.id}" class="like-button">
					<img src="./assets/images/like-active.svg">
				 </button>
				 <p class="post-likes-text">
					Нравится: <strong>${post.likes.length}</strong>
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
			userId: userEl.dataset.userId,
		 });
	  });
	}
}
