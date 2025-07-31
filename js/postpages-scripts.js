
//Генерация рандомного имени
const usernames = [
  "Али", "Магомед", "Зелимхан", "Руслан", "Саид", "Шамиль", "Хусейн", "Бекхан",
  "Исмаил", "Мурат", "Рамзан", "Ахмат", "Нурди", "Знаур", "Камил", "Аслан",
  "Зияудин", "Леча", "Муса", "Басаев", "Гамид", "Халид", "Бекхан", "Ваха",
  "Мухаммад", "Горхан", "Аюб", "Рамзан", "Ислам", "Ахмед", "Мурад", "Султан",
  "Эльхан", "Шаурбек", "Абдул", "Леван", "Эльдар", "Зураб", "Джамал", "Магомедали",
  "Хасан", "Рашид", "Махач", "Адам", "Ваха", "Абдулла", "Яхья", "Рамиль",
  "Сулейман", "Тамерлан", "Сергей", "Виталий", "Назар", "Руслан", "Ибрагим", "Ахсар",
  "Махмуд", "Заур", "Шах", "Гамзат", "Абдула", "Шамиль", "Ислам", "Зайнудин",
  "Муса", "Ваха", "Мирза", "Рамзан", "Махач", "Абдулвахаб", "Султан", "Исмаил",
  "Гамид", "Эльхан", "Бекхан", "Магомедрасул", "Мухаммад", "Зелимхан", "Нурдин",
  "Валид", "Ахмед", "Аслан", "Рамзан", "Давуд", "Мурат", "Шамиль", "Зинаудин",
  "Хусейн", "Леча", "Магомед", "Рамзан", "Ваха", "Муса", "Саид", "Ислам",
  "Хасан", "Эльдар", "Горхан", "Ахмат", "Абдулла", "Бекхан", "Шаурбек"
];


const generateBtn = document.getElementById("generateBtn");
const usernameInput = document.getElementById("usernameInput");

generateBtn.addEventListener("click", function() {
    const randomName = usernames[Math.floor(Math.random() * usernames.length)];
    usernameInput.value = randomName;
});

const searchPostsInput = document.querySelector(".search-posts-input");
const clear = document.querySelector(".clear");

clear.addEventListener("click", () =>{
    searchPostsInput.value = "";
});

//Работа с настройками

//Отключение и включение CSS
document.addEventListener('DOMContentLoaded', function () {
  const cssToggle = document.getElementById('css-off');
  const saveButton = document.getElementById('save-settings');

  // При загрузке — применяем CSS отключение, если оно было сохранено
  const cssOffSaved = localStorage.getItem('cssOff') === 'true';
  if (cssOffSaved) {
    cssToggle.checked = true;
    disableCSS();
  }

  // Обработчик кнопки "Сохранить настройки"
  saveButton.addEventListener('click', function () {
    const cssOffNow = cssToggle.checked;

    localStorage.setItem('cssOff', cssOffNow ? 'true' : 'false');

    if (cssOffNow) {
      disableCSS();
    } else {
      enableCSS();
    }
  });

  // Функции отключения/включения CSS
  function disableCSS() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      link.disabled = true;
    });
    document.querySelectorAll('style').forEach(style => {
      style.disabled = true;
    });
  }

  function enableCSS() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      link.disabled = false;
    });
    document.querySelectorAll('style').forEach(style => {
      style.disabled = false;
    });
  }
});









//Темная тема
function applyNightModeStyles() {
  document.body.style.background = "#161616";

  const setStyles = (elements, styles) => {
    elements.forEach(el => {
      for (const [key, value] of Object.entries(styles)) {
        el.style[key] = value;
      }
    });
  };

  // Стили ссылок навигации
  const navLinks = document.querySelectorAll(".commands-header a");
  setStyles(navLinks, { color: "#59ff00ff" });
  navLinks.forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "red");
    link.addEventListener("mouseout", () => link.style.color = "#59ff00ff");
  });

  // Заголовок формы
  const newPostBut = document.getElementById("new-post");
  if (newPostBut) newPostBut.style.color = "#59ff00ff";

  const newPostFormH2 = document.querySelector("#new-post-form h2");
  if (newPostFormH2) newPostFormH2.style.color = "white";

  // Поле textarea формы поста
  const newPostFormTextArea = document.querySelector("#new-post-form textarea");
  if (newPostFormTextArea) {
    newPostFormTextArea.style.background = "#353535ff";
    newPostFormTextArea.style.color = "white";
    newPostFormTextArea.style.border = "0.1vw solid #a8b6b4";
  }

  // Все input
  setStyles(document.querySelectorAll("body input"), {
    background: "#353535ff",
    color: "white",
    border: "0.1vw solid #a8b6b4"
  });

  // Все кнопки
  setStyles(document.querySelectorAll("body button"), {
    background: "#222222ff",
    color: "white",
    borderRadius: "0.2vw",
    border: "0.1vw solid #a8b6b4"
  });

  // Текст "пост(-ы) не найдены"
  const nonePostsWindow = document.querySelector(".none-posts-window");
  if (nonePostsWindow) {
    nonePostsWindow.style.color = "white";
  }

  //Загрузка постов
  const loadingItem = document.querySelector(".loading-item");
  if (loadingItem) {
    loadingItem.style.background = "#161616";
  }

  // Select
  const selectMenu = document.querySelector("body select");
  if (selectMenu) {
    selectMenu.style.background = "#353535ff";
    selectMenu.style.color = "white";
    selectMenu.style.border = "0.1vw solid #a8b6b4";
  }

  // Стили скобок в архиве/поиске
  setStyles(document.querySelectorAll(".search-and-archive p"), {
    color: "rgba(62, 162, 0, 0.555)"
  });

  const bracketLinks = document.querySelectorAll(".search-and-archive a");
  setStyles(bracketLinks, { color: "#59ff00ff" });
  bracketLinks.forEach(link => {
    link.addEventListener("mouseover", () => link.style.color = "red");
    link.addEventListener("mouseout", () => link.style.color = "#59ff00ff");
  });

  // Настройки
  const settingsItem = document.querySelector(".settings-item");
  if (settingsItem) {
    settingsItem.style.background = "#222222ff";
    settingsItem.style.color = "white";
  }

  const closeSettings = document.querySelector(".close-settings");
  if (closeSettings) {
    closeSettings.style.setProperty("border", "none", "important");
  }

  const bigPhotoItem = document.querySelector(".big-photo-item");
  if (bigPhotoItem) bigPhotoItem.style.background = "#222222ff";

  const bigPhotoInfo = document.querySelector(".big-photo-info");
  if (bigPhotoInfo) bigPhotoInfo.style.color = "white";

  // Обработка уже загруженных постов и комментариев
  const processExistingPosts = () => {
    const roots = document.querySelectorAll(".user-post");
    roots.forEach(root => {
      const postData = root.querySelectorAll(".post-data p");
      const commentData = root.querySelectorAll(".comments-data p");
      const commentId = root.querySelectorAll(".comment-id");
      const postText = root.querySelector(".post-text");
      const commentTexts = root.querySelectorAll(".comment-text");
      const postId = root.querySelector(".post-id");
      const replyPosts = root.querySelectorAll(".reply-post");
      const replyComments = root.querySelectorAll(".reply-comment");
      const buttons = root.querySelectorAll(".post-reply-window button");

      setStyles(postData, { color: "rgb(62, 162, 0)" });
      setStyles(commentData, { color: "rgb(62, 162, 0)" });
      setStyles(commentId, { color: "rgb(62, 162, 0)" });
      setStyles(replyPosts, { color: "#59ff00ff" });
      setStyles(replyComments, { color: "#59ff00ff" });
      setStyles(commentTexts, { color: "white" });

      if (postText) postText.style.color = "white";
      if (postId) {
      postId.style.color = "rgb(62, 162, 0)";

      // Создаём именованные функции и сохраняем их на сам элемент
      const hoverIn = () => postId.style.color = "firebrick";
      const hoverOut = () => postId.style.color = "rgb(62, 162, 0)";

      postId.addEventListener("mouseover", hoverIn);
      postId.addEventListener("mouseout", hoverOut);

      postId._hoverInHandler = hoverIn;
      postId._hoverOutHandler = hoverOut;
      }


      setStyles(buttons, {
        background: "#222222ff",
        color: "white",
        border: "0.1vw solid #a8b6b4"
      });
    });
  };

  processExistingPosts();

  // Наблюдатель за новыми постами
  const postsContainer = document.getElementById("user-posts-container");
  if (postsContainer) {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
const isPost = node.classList.contains("user-post") || node.querySelector(".user-post");
const isNonePosts = node.classList.contains("none-posts-window");

if (isPost) {
  processExistingPosts();
}

if (isNonePosts) {
  node.style.color = "white";
}
        }
      }
    });

    observer.observe(postsContainer, { childList: true, subtree: true });
  }

  // Комментарии (форма)
  const observerComments = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        const applyStyles = root => {
          root.style.backgroundColor = "rgba(111, 111, 111, 0.46)";
          const h2 = root.querySelector(".comment-content h2");
          if (h2) h2.style.color = "white";

          const input = root.querySelector("input.comment-username");
          if (input) {
            input.style.backgroundColor = "#353535ff";
            input.style.color = "white";
            input.style.border = "0.1vw solid #a8b6b4";
          }

          const textarea = root.querySelector("textarea.comment-text-area");
          if (textarea) {
            textarea.style.backgroundColor = "#353535ff";
            textarea.style.color = "white";
            textarea.style.border = "0.1vw solid #a8b6b4";
          }

          const buttons = root.querySelectorAll(".comment-content button");
          setStyles(buttons, {
            background: "#222222ff",
            color: "white",
            border: "0.1vw solid #a8b6b4"
          });
        };

        if (node.classList.contains("post-comment-edit-block")) {
          applyStyles(node);
        } else {
          const inner = node.querySelector(".post-comment-edit-block");
          if (inner) applyStyles(inner);
        }
      }
    }
  });

  observerComments.observe(document.body, { childList: true, subtree: true });
}

// Кнопка сохранения настроек
document.getElementById("save-settings")?.addEventListener("click", () => {
  const nightMode = document.getElementById("night-mode").checked;
  localStorage.setItem("night-mode", nightMode ? "1" : "0");

  if (nightMode) {
    applyNightModeStyles();
  } else {
    location.reload(); // сбросить на светлую тему
  }
});

// При загрузке страницы — применить тёмную тему, если она сохранена
if (localStorage.getItem("night-mode") === "1") {
  document.getElementById("night-mode").checked = true;
  applyNightModeStyles();
}






//Меню шрифта
const fontMenuCheckbox = document.getElementById("font-menu-on-off");
const fontMenu = document.getElementById("font-menu");
const saveSettingsButton = document.getElementById("save-settings");

// Функция применения сохранённого состояния
function applyFontMenuStateFromStorage() {
  const savedState = localStorage.getItem("font-menu-visible");
  const isVisible = savedState === "1";
  if (fontMenu && fontMenuCheckbox) {
    fontMenuCheckbox.checked = isVisible;
    fontMenu.style.display = isVisible ? "flex" : "none";
  }
}

// Функция сохранения и применения при нажатии "Сохранить настройки"
function handleSaveSettings() {
  if (fontMenuCheckbox && fontMenu) {
    const isChecked = fontMenuCheckbox.checked;
    localStorage.setItem("font-menu-visible", isChecked ? "1" : "0");
    fontMenu.style.display = isChecked ? "flex" : "none";
  }
}

// Вешаем обработчик
saveSettingsButton?.addEventListener("click", handleSaveSettings);

// Применяем состояние при загрузке
applyFontMenuStateFromStorage();

// === SETTINGS APPLY LOGIC ===
//Автоматически показывать комментарии

// При нажатии на "Сохранить настройки"
document.getElementById("save-settings").addEventListener("click", () => {
  const commentsAutoVisible = document.getElementById("comments-on").checked;
  localStorage.setItem("commentsAutoVisible", commentsAutoVisible ? "true" : "false");
  location.reload();
});

// === APPLY SETTINGS ON NEW POSTS ===

// Функция, применяющая отображение комментариев к одному посту
function applyCommentsVisibilityToPost(post) {
  const autoShow = localStorage.getItem("commentsAutoVisible") === "true";
  const postCommentsContainer = post.querySelector(".post-comments-container");
  const replyPost = post.querySelector(".reply-post");
  const replySlash = post.querySelector(".reply-slash");
  const commentCounter = post.querySelector(".open-comments-container");

  if (!postCommentsContainer || !replyPost || !replySlash || !commentCounter) return;

  // Устанавливаем состояние комментариев
  postCommentsContainer.style.display = autoShow ? "block" : "none";
  replyPost.style.display = autoShow ? "flex" : "none";
  replySlash.style.display = autoShow ? "flex" : "none";

  // Обновляем стрелочку ⤴ / ⤵
  const currentText = commentCounter.textContent;
  const updatedArrow = autoShow ? "⤵" : "⤴";
  commentCounter.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
}

// MutationObserver для отслеживания добавленных постов
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.classList.contains("user-post")) {
        applyCommentsVisibilityToPost(node);
      }
    });
  });
});

// Начать отслеживание контейнера с постами
const postsContainer = document.getElementById("user-posts-container"); // убедитесь, что у вас есть этот ID
if (postsContainer) {
  observer.observe(postsContainer, { childList: true });
}








//Блокировка постов после скрытия
// Сохраняем настройку
document.getElementById("save-settings").addEventListener("click", () => {
  const postBlocked = document.getElementById("post-blocked")?.checked;
  localStorage.setItem("postBlocked", postBlocked ? "true" : "false");
  location.reload(); // Перезагрузка для применения
});

const postBlockedSetting = localStorage.getItem("postBlocked") === "true";

// Универсальная функция установки CSS-стилей
function setStyles(elements, styles) {
  if (!elements) return;
  if (elements instanceof Element) elements = [elements];
  elements.forEach(el => {
    for (const [key, value] of Object.entries(styles)) {
      el.style[key] = value;
    }
  });
}

// Обработка одного поста (только если включена настройка)
function applyHideShowLogic(post) {
  if (!postBlockedSetting) return; // ✅ Не активируем логику, если настройка выключена

  const postMain = post.querySelector(".post-main");
  const hideShowPost = post.querySelector(".hide-show-post");
  const postData = post.querySelector(".post-data");
  const commentCounter = post.querySelector(".open-comments-container");
  const postIdLink = post.querySelector(".post-id");
  const replySlash = post.querySelector(".reply-slash");
  const replyPost = post.querySelector(".reply-post");
  const postCommentsContainer = post.querySelector(".post-comments-container");
  const replyButton = post.querySelector(".post-reply-window-but");

  if (!hideShowPost || !postMain) return;

  // Удаление старых обработчиков
  const newHideShow = hideShowPost.cloneNode(true);
  hideShowPost.replaceWith(newHideShow);

  const lockStyles = {
    pointerEvents: "none",
    opacity: "0.6"
  };

  const unlockStyles = {
    pointerEvents: "auto",
    opacity: "1"
  };

  const toggleHide = () => {
    const isVisible = window.getComputedStyle(postMain).display !== "none";

    if (isVisible) {
      postMain.style.display = "none";
      newHideShow.src = "img/lock.png";

      setStyles([postData, commentCounter, postIdLink, replyButton], lockStyles);
    } else {
      postMain.style.display = "block";
      newHideShow.src = "img/minus.jpg";

      setStyles([postData, commentCounter, postIdLink, replyButton], unlockStyles);

      if (postCommentsContainer?.style.display === "block") {
        if (replySlash) replySlash.style.display = "flex";
        if (replyPost) replyPost.style.display = "flex";
      }
    }
  };

  newHideShow.addEventListener("click", toggleHide);
}

// Наблюдатель за новыми постами
const observer2 = new MutationObserver((mutations) => {
  if (!postBlockedSetting) return; // ✅ Отключаем наблюдение, если чекбокс выключен

  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (!(node instanceof HTMLElement)) return;
      const post = node.classList.contains("user-post") ? node : node.querySelector(".user-post");
      if (post) applyHideShowLogic(post);
    });
  });
});

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const postsContainer2 = document.getElementById("user-posts-container");
  if (!postBlockedSetting || !postsContainer2) return; // ✅ Не продолжаем, если не нужно

  observer2.observe(postsContainer2, { childList: true, subtree: true });
  postsContainer2.querySelectorAll(".user-post").forEach(applyHideShowLogic);
  document.getElementById("post-blocked").checked = true;
});



//Информация об изображении
// === [ IMG-DATA ПОДДЕРЖКА ] ===
const imgDataCheckbox = document.getElementById("img-data");
const saveSettingsButton3 = document.getElementById("save-settings");

// По умолчанию — true, если в localStorage ещё не сохранено
const savedImgDataState = localStorage.getItem("img-data");
if (savedImgDataState === null) {
  localStorage.setItem("img-data", "true");
  imgDataCheckbox.checked = true;
} else {
  imgDataCheckbox.checked = savedImgDataState === "true";
}

// Функция применения видимости данных об изображении
function applyImgDataVisibility(show) {
  const posts = document.querySelectorAll(".user-post");

  posts.forEach(post => {
    const imgWeight = post.querySelector(".img-weight");
    const imgSize = post.querySelector(".img-size");
    const slashes = post.querySelectorAll(".img-slash");

    if (imgWeight) imgWeight.style.display = show ? "inline" : "none";
    if (imgSize) imgSize.style.display = show ? "inline" : "none";
    slashes.forEach(slash => {
      if (slash) slash.style.display = show ? "inline" : "none";
    });
  });
}

// Применение настроек при нажатии "Сохранить настройки"
saveSettingsButton3.addEventListener("click", () => {
  const show = imgDataCheckbox.checked;
  localStorage.setItem("img-data", show.toString());
  applyImgDataVisibility(show);
});

// MutationObserver: применяет настройки к новым постам после loadPosts
const postsContainer3 = document.getElementById("user-posts-container"); // проверь ID

const observer3 = new MutationObserver(() => {
  const imgDataState = localStorage.getItem("img-data") === "true";
  applyImgDataVisibility(imgDataState);
});

if (postsContainer3) {
  observer3.observe(postsContainer3, {
    childList: true,
    subtree: true
  });
}

// Первоначальное применение настроек при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  const initialState = localStorage.getItem("img-data") === "true";
  applyImgDataVisibility(initialState);
});













//Обработка увеличения изображения
const imgBigCheckbox = document.getElementById("img-big");
const saveSettingsButton4 = document.getElementById("save-settings");

// Устанавливаем значение по умолчанию
const savedImgBigState = localStorage.getItem("imgBig");
if (savedImgBigState === null) {
  localStorage.setItem("imgBig", "true");
  imgBigCheckbox.checked = true;
} else {
  imgBigCheckbox.checked = savedImgBigState === "true";
}

// === ФУНКЦИЯ ===
function applyImageClickHandlers() {
  const enable = localStorage.getItem("imgBig") === "true";

  const postImages = document.querySelectorAll(".post-image");

  postImages.forEach(postImage => {
    // Удаляем предыдущий обработчик, если был
    if (postImage._bigClickHandler) {
      postImage.removeEventListener("click", postImage._bigClickHandler);
    }

    postImage.style.cursor = "pointer";

    if (enable) {
      const handler = () => {
        const post = postImage.closest(".user-post");

        const bigPhotoBlock = document.querySelector(".big-photo-block");
        const bigPhotoItem = bigPhotoBlock.querySelector(".big-photo-item");
        const bigPhotoImage = bigPhotoBlock.querySelector(".big-photo-image");
        const bigPhotoInfo = bigPhotoBlock.querySelector(".big-photo-info");

        bigPhotoImage.src = postImage.src;

        const sizeText = post.querySelector(".img-size")?.textContent || "Неизвестно";
        const weightText = post.querySelector(".img-weight")?.textContent || "Неизвестно";

        bigPhotoInfo.innerHTML = `
          <span style="margin-right: 1vw;">Размер: ${sizeText}</span>
          <span style="margin-right: 1vw;">Вес: ${weightText}</span>
          <p class="close-big-photo">×</p>
        `;

        bigPhotoBlock.style.display = "flex";

        requestAnimationFrame(() => {
          bigPhotoItem.style.position = "absolute";
          bigPhotoItem.style.transform = "none";

          const rect = bigPhotoItem.getBoundingClientRect();
          const centerX = (window.innerWidth - rect.width) / 2;
          const centerY = (window.innerHeight - rect.height) / 2;

          bigPhotoItem.style.left = `${centerX}px`;
          bigPhotoItem.style.top = `${centerY}px`;
        });

        const closeBtn = bigPhotoBlock.querySelector(".close-big-photo");
        closeBtn.addEventListener("click", () => {
          bigPhotoBlock.style.display = "none";
        });

        // Перетаскивание
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const dragStart = (e) => {
          if (!e.target.closest(".big-photo-item")) return;

          isDragging = true;
          const rect = bigPhotoItem.getBoundingClientRect();
          offsetX = e.clientX - rect.left;
          offsetY = e.clientY - rect.top;
          document.body.style.userSelect = "none";
        };

        const dragMove = (e) => {
          if (!isDragging) return;
          bigPhotoItem.style.left = `${e.clientX - offsetX}px`;
          bigPhotoItem.style.top = `${e.clientY - offsetY}px`;
        };

        const dragEnd = () => {
          isDragging = false;
          document.body.style.userSelect = "";
        };

        bigPhotoItem.addEventListener("mousedown", dragStart);
        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);
      };

      // Сохраняем обработчик для удаления при следующем обновлении
      postImage._bigClickHandler = handler;
      postImage.addEventListener("click", handler);
    } else {
      postImage.style.cursor = "default";
    }
  });
}

// Сохранение настроек
saveSettingsButton4.addEventListener("click", () => {
  const enabled = imgBigCheckbox.checked;
  localStorage.setItem("imgBig", enabled.toString());
  applyImageClickHandlers(); // применить после сохранения
});

// MutationObserver — отслеживает появление новых изображений
const postsContainer4 = document.getElementById("user-posts-container");
const observer4 = new MutationObserver(() => {
  applyImageClickHandlers(); // здесь важно: не передавать флаг, а читать из localStorage
});

if (postsContainer4) {
  observer4.observe(postsContainer4, {
    childList: true,
    subtree: true
  });
}

// Применить при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  applyImageClickHandlers();
});






//Скрыть изображения постов
const imgHideCheckbox = document.getElementById("img-hide");
const saveSettingsButton5 = document.getElementById("save-settings");

// Устанавливаем значение по умолчанию (true)
const savedImgHideState = localStorage.getItem("imgHide");
if (savedImgHideState === null) {
  localStorage.setItem("imgHide", "false");
  imgHideCheckbox.checked = false;
} else {
  imgHideCheckbox.checked = savedImgHideState === "true";
}

// === ФУНКЦИЯ ===
function applyImageVisibility() {
  const hide = localStorage.getItem("imgHide") === "true";
  const postImages = document.querySelectorAll(".post-image");

  postImages.forEach(img => {
    img.style.display = hide ? "none" : "";
  });
}

// Сохранение и применение при клике по "Сохранить настройки"
saveSettingsButton5.addEventListener("click", () => {
  const hide = imgHideCheckbox.checked;
  localStorage.setItem("imgHide", hide.toString());
  applyImageVisibility();
});

// MutationObserver — следит за новыми постами (и их изображениями)
const postsContainer5 = document.getElementById("user-posts-container");

const observer5 = new MutationObserver(() => {
  applyImageVisibility();
});

if (postsContainer5) {
  observer5.observe(postsContainer5, {
    childList: true,
    subtree: true
  });
}

// Первоначальное применение при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  applyImageVisibility();
});






//Открывать пост в отдельной странице
const goToPostCheckbox = document.getElementById("go-to-post");
const saveSettingsButton6 = document.getElementById("save-settings");

// Инициализация состояния по умолчанию
const savedGoToPostState = localStorage.getItem("goToPost");
if (savedGoToPostState === null) {
  localStorage.setItem("goToPost", "true");
  goToPostCheckbox.checked = true;
} else {
  goToPostCheckbox.checked = savedGoToPostState === "true";
}

// Функция: отключить переходы по .post-id
function disablePostIdLinks() {
  const isNightMode = localStorage.getItem("night-mode") === "1"; // проверка темы
  const links = document.querySelectorAll(".post-id");

  links.forEach(link => {
    // Удаление обработчика перехода (если был)
    if (link._goToHandler) {
      link.removeEventListener("click", link._goToHandler);
      link._goToHandler = null;
    }

    link.style.cursor = "default";
    link.style.color = isNightMode ? "rgb(62, 162, 0)" : "rgb(0,78,0)";

    // Удаление hover-обработчиков, если тёмная тема
    if (isNightMode) {
      if (link._hoverInHandler) {
        link.removeEventListener("mouseover", link._hoverInHandler);
        link._hoverInHandler = null;
      }
      if (link._hoverOutHandler) {
        link.removeEventListener("mouseout", link._hoverOutHandler);
        link._hoverOutHandler = null;
      }
    }
  });
}



// Функция: включить переходы по .post-id
function enablePostIdLinks() {
  const links = document.querySelectorAll(".post-id");
  links.forEach(link => {
    if (link._goToHandler) {
      link.removeEventListener("click", link._goToHandler);
    }

    const handler = (e) => {
      e.preventDefault();
      const post = link.closest(".user-post");
      const postId = post?.dataset?.postId;
      const theme = post?.dataset?.theme || "default";
      if (postId) {
        window.open(`post.html?postId=${postId}&theme=${encodeURIComponent(theme)}`, "_blank");
      }
    };

    link._goToHandler = handler;
    link.addEventListener("click", handler);
    link.style.cursor = "pointer";
  });
}

// Основная функция: применяет нужное поведение
function applyGoToPostBehavior() {
  const enabled = localStorage.getItem("goToPost") === "true";
  if (enabled) {
    enablePostIdLinks();
  } else {
    disablePostIdLinks();
  }
}

// Сохраняем при клике на "Сохранить настройки"
saveSettingsButton6.addEventListener("click", () => {
  const enabled = goToPostCheckbox.checked;
  localStorage.setItem("goToPost", enabled.toString());
  applyGoToPostBehavior();
});

// Обработка новых постов после loadPosts()
const postsContainer6 = document.getElementById("user-posts-container");
const observer6 = new MutationObserver(() => {
  applyGoToPostBehavior();
});

if (postsContainer6) {
  observer6.observe(postsContainer6, {
    childList: true,
    subtree: true
  });
}

// Применяем при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  applyGoToPostBehavior();
});






//Навигация
// === 1. Применение состояния чекбокса при загрузке страницы ===
window.addEventListener("DOMContentLoaded", () => {
  const navCheckbox = document.getElementById("navigation-hide");
  const savedNavState = localStorage.getItem("navigationHide");

  if (navCheckbox) {
    if (savedNavState === null) {
      // По умолчанию чекбокс неактивен
      localStorage.setItem("navigationHide", "false");
      navCheckbox.checked = false;
    } else {
      navCheckbox.checked = savedNavState === "true";
    }
  }

  applyNavigationPanelVisibility(); // Применить отображение панели
});

// === 2. Функция скрытия/показа панели в зависимости от состояния чекбокса ===
function applyNavigationPanelVisibility() {
  const navCheckbox = document.getElementById("navigation-hide");
  const navPanel = document.querySelector(".commands-header");

  if (!navCheckbox || !navPanel) return;

  if (navCheckbox.checked) {
    navPanel.style.display = "none"; // Скрываем панель
  } else {
    navPanel.style.display = "flex"; // Показываем панель
  }
}

// === 3. Сохраняем состояние и применяем при клике на save-settings ===
const saveSettingsBtn = document.getElementById("save-settings");

if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", () => {
    const navCheckbox = document.getElementById("navigation-hide");

    if (navCheckbox) {
      localStorage.setItem("navigationHide", navCheckbox.checked.toString());
    }

    applyNavigationPanelVisibility();
  });
}


document.getElementById('reset-settings').addEventListener('click', () => {
  document.getElementById('css-off').checked = false;
  document.getElementById('night-mode').checked = false;
  document.getElementById('font-menu-on-off').checked = true;
  document.getElementById('comments-on').checked = false;
  document.getElementById('post-blocked').checked = false;
  document.getElementById('img-data').checked = true;
  document.getElementById('img-big').checked = true;
  document.getElementById('img-hide').checked = false;
  document.getElementById('go-to-post').checked = true;
  document.getElementById('navigation-hide').checked = false;
});

