import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";

export function renderHeaderComponent({ element }) {
  element.innerHTML = `
  <div class="page-header">
      <h1 class="logo">instapro</h1>
      <button class="header-button add-or-login-button">
      ${
        user
          ? `<div title="Добавить пост" class="add-post-sign"></div>`
          : "Войти"
      }
      </button>
      ${
        user
          ? `<button title="${user.name}" data-user-id="${user._id}" class="header-button user-button">
          <img src="${user.imageUrl}" class="post-header__user-image">
            </button>`
          : ""
      }  
      ${
        user
          ? `<button title="${user.name}" class="header-button logout-button">Выйти</button>`
          : ""
      }  
      </button>
  </div>
  
`;

  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout);

  const userButton = element.querySelector('.user-button');

  if(userButton)  {
    userButton.addEventListener('click', () => {
      console.log('userButton');
      console.log(userButton.dataset.userId);
      goToPage(USER_POSTS_PAGE,  {
        userId: userButton.dataset.userId
      });
    })
  }


  return element;
}
