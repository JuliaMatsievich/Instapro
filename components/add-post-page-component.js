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
                  <input class="file-upload-input" type="file" style="displa:none">Выберите фото
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

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();
}
