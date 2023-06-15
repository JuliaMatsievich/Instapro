import { renderUploadImageComponent } from "./upload-image-component.js";


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
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
    const imageContainer = document.querySelector('.upload-image-container');

    let imageUrl = "";
    renderUploadImageComponent ({
      element: imageContainer,
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      } 
    })

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: fotoDescription.value,
        imageUrl: imageUrl
      });
    });

  };

  render();
}
