import { uploadImage } from "../api.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
            <div class="upload-image-container">
              <div class="upload-image">
                <label class="file-upload-label secondary-button">
                  <input class="file-upload-input" type="file" style="display:none">Выберите фото
                </label>
              </div>
            </div>
            <label> Опишите фотографию
              <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button id="add-button" class="button">Добавить</button>
          </div>
        </div>     
    </div>
  `;

    appEl.innerHTML = appHtml;
    const fileInputElement = document.querySelector('.file-upload-input');
    const fotoDescription = document.querySelector('.textarea');
    const imageContainer = document.querySelector('.upload-image');

    fileInputElement.addEventListener('change', () => {
      uploadImage({ file: fileInputElement.files[0] })
        .then(data => {
          const imageMinHtml = `
            <div class="file-upload-image-container">
              <img class="file-upload-image" src="${data.fileUrl}">
              <button class="file-upload-remove-button button">Заменить фото</button>
            </div>
          `;
          imageContainer.innerHTML = imageMinHtml;

          const removeButton = document.querySelector('.file-upload-remove-button');

          removeButton.addEventListener('click', () => {
            render()
          })
        })
        .catch(error => {
          console.log(error);
        })
    })

    
    document.getElementById("add-button").addEventListener("click", () => {

      uploadImage({ file: fileInputElement.files[0] })
        .then(data => {
          onAddPostClick({
            description: fotoDescription.value,
            imageUrl: data.fileUrl
          });
        })
    });

  };

  render();
}
