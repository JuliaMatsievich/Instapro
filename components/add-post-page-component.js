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
    
    const fotoDescription = document.querySelector('.textarea');
    const imageContainer = document.querySelector('.upload-image-container');

    let imageUrl = "";
    renderUploadImageComponent ({
      element: imageContainer,
      onImageUrlChange(newImageUrl) {
        imageUrl = newImageUrl;
      } 
    })

    const addBtn = document.getElementById("add-button");

    addBtn.addEventListener("click", () => {

      if(!fotoDescription.value) {
        alert("Добавьте описание к фотографии");
        return
      }

      
      if (!imageUrl) {
        alert("Не выбрана фотография");
        return;
      }

      addBtn.setAttribute("disabled", true);
      addBtn.textContent = "Добавляю пост...";

      onAddPostClick({
        description: fotoDescription.value.
                    replaceAll("<", "&lt;").
                    replaceAll(">", "&gt;").
                    replaceAll("/**", "<div class='quote'>").
                    replaceAll("**/", "</div>"),
        imageUrl: imageUrl
      });
    });

  };

  render();
}
