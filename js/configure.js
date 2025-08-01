import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {getFirestore,collection,addDoc,setDoc,doc,getDocs,getDoc,updateDoc,increment} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import {getStorage,ref,uploadBytes,getDownloadURL} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDObglb4gU10Xms1Es6-45UMSeT5vZvBxg",
  authDomain: "varzas.firebaseapp.com",
  projectId: "varzas",
  storageBucket: "varzas.appspot.com",
  messagingSenderId: "256701912950",
  appId: "1:256701912950:web:02c63f4bd8d3e893828c57"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Элементы формы
const usernameInput = document.getElementById("usernameInput");
const postThemeInput = document.getElementById("post-theme-input");
const postTextInput = document.getElementById("post-text-input");
const openImagesBtn = document.getElementById("openImagesBtn");
const fileInput = document.getElementById("fileInput");
const publishBtn = document.getElementById("public-post");
const postsContainer = document.getElementById("user-posts-container");

let selectedImageFile = null;

// Открытие выбора изображения
openImagesBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    selectedImageFile = fileInput.files[0];
    console.log("Выбран файл:", selectedImageFile.name);
    openImagesBtn.textContent = "Выбрать изображение (1)"
  }
});

// 🔁 Функция форматирования времени: "дд.мм.гг (День) чч:мм"
function formatFullDateTime() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const weekdays = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const weekday = weekdays[date.getDay()];

  return `${day}.${month}.${year} (${weekday}) ${hours}:${minutes}`;
}

function generateId() {
  return "17" + Math.floor(Math.random() * 1e10).toString().padStart(10, "0");
}

async function isPostIdUnique(postId, collectionName) {
  const postDocs = await getDocs(collection(db, collectionName));
  for (const docSnap of postDocs.docs) {
    const data = docSnap.data();
    if (data.postId === postId) return false;
  }
  return true;
}

const settings = document.querySelector(".settings");

if (settings) {
  settings.addEventListener("click", () => {
    const settingsBlock = document.querySelector(".settings-block");
    const settingsItem = document.querySelector(".settings-item");


    // Показываем блок
    settingsBlock.style.display = "flex";

    // После отрисовки — центрируем .big-photo-item
    requestAnimationFrame(() => {
      settingsItem.style.position = "absolute";
      settingsItem.style.transform = "none";

      const rect = settingsItem.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;

      settingsItem.style.left = `${centerX}px`;
      settingsItem.style.top = `${centerY}px`;
    });

    // Закрытие
    const closeSettingsBtn = settingsBlock.querySelector(".close-settings");
    closeSettingsBtn.addEventListener("click", () => {
      settingsBlock.style.display = "none";
    });

    // === DRAG LOGIC ===
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const dragStart = (e) => {
      const target = e.target.closest(".settings-item");
      if (!target) return;

      isDragging = true;
      const rect = target.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.body.style.userSelect = "none";
    };

    const dragMove = (e) => {
      if (!isDragging) return;

      settingsItem.style.left = `${e.clientX - offsetX}px`;
      settingsItem.style.top = `${e.clientY - offsetY}px`;
    };

    const dragEnd = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    settingsItem.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
  });
}

const settingsMobile = document.querySelector(".settings-mobile");

if (settingsMobile) {
  settingsMobile.addEventListener("click", () => {
    const settingsBlock = document.querySelector(".settings-block");
    const settingsItem = document.querySelector(".settings-item");


    // Показываем блок
    settingsBlock.style.display = "flex";

    // После отрисовки — центрируем .big-photo-item
    requestAnimationFrame(() => {
      settingsItem.style.position = "absolute";
      settingsItem.style.transform = "none";

      const rect = settingsItem.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;

      settingsItem.style.left = `${centerX}px`;
      settingsItem.style.top = `${centerY}px`;
    });

    // Закрытие
    const closeSettingsBtn = settingsBlock.querySelector(".close-settings");
    closeSettingsBtn.addEventListener("click", () => {
      settingsBlock.style.display = "none";
    });

    // === DRAG LOGIC ===
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const dragStart = (e) => {
      const target = e.target.closest(".settings-item");
      if (!target) return;

      isDragging = true;
      const rect = target.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.body.style.userSelect = "none";
    };

    const dragMove = (e) => {
      if (!isDragging) return;

      settingsItem.style.left = `${e.clientX - offsetX}px`;
      settingsItem.style.top = `${e.clientY - offsetY}px`;
    };

    const dragEnd = () => {
      isDragging = false;
      document.body.style.userSelect = "";
    };

    settingsItem.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);
  });
}

async function isCommentIdUnique(commentId) {
  const collectionsSnap = await getDocs(collection(db, "posts")); // имя коллекции со всеми постами
  for (const docSnap of collectionsSnap.docs) {
    const data = docSnap.data();
    for (const key in data) {
      if (key.startsWith("comment_")) {
        if (data[key].commentId === commentId) return false;
      }
    }
  }
  return true;
}

function downloadPostImage(postElement, postId) {
  const image = postElement.querySelector(".post-image");
  if (!image) {
    alert("Изображение не найдено.");
    return;
  }

  const link = document.createElement("a");
  link.href = image.src;
  link.download = `${postId}.png`; // динамическое имя по ID
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}



const setNewPost = document.getElementById("new-post");
const newPostForm = document.getElementById("new-post-form");
const closeNewPost = document.getElementById("closeNewPost");

//Добавление нового поста
setNewPost.addEventListener("click", () => {
    newPostForm.style.display = "flex";
    setNewPost.style.display = "none";
})
closeNewPost.addEventListener("click", () =>{
    newPostForm.style.display = "none";
    setNewPost.style.display = "flex";
    postThemeInput.value = "";
    postTextInput.value = "";
    fileInput.value = "";
    selectedImageFile = null;
    openImagesBtn.textContent = "Выбрать изображение";
})

const textarea = document.getElementById("post-text-input");

document.querySelector(".bold").addEventListener("click", () => {
  wrapSelectionWith("**", "**"); // Жирный – обернуть в ** **
});

document.querySelector(".italic").addEventListener("click", () => {
  wrapSelectionWith("_", "_"); // Курсив – обернуть в _ _
});

document.querySelector(".underline").addEventListener("click", () => {
  wrapSelectionWith("<u>", "</u>"); // Подчеркивание – HTML-тег
});

function wrapSelectionWith(startTag, endTag) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.slice(start, end);
  const before = textarea.value.slice(0, start);
  const after = textarea.value.slice(end);

  textarea.value = before + startTag + selected + endTag + after;
  textarea.focus();
  textarea.setSelectionRange(start + startTag.length, end + startTag.length);
}

function convertTextToHTML(text) {
  const safeText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const withFormatting = safeText
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/_(.*?)_/g, "<i>$1</i>")
    .replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, "<u>$1</u>");

  return withFormatting.replace(/\n/g, "<br>");
}




document.getElementById('font-menu').addEventListener('change', function() {
  const selectedFont = this.value;
  const fontFamilies = {
    'calibri': "'Calibri', 'Gill Sans', 'Gill Sans MT', sans-serif",
    'verdana': "'Verdana', sans-serif",
    'arial': "'Arial', 'Helvetica', sans-serif",
    'times-new-roman': "'Times New Roman', serif",
    'cambria': "'Cambria', 'Cochin', serif"
  };
  
  // Применяем шрифт ко всему документу и динамически создаваемым элементам
  document.body.style.fontFamily = fontFamilies[selectedFont] || "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif";
  
  // Сохраняем выбор в localStorage
  localStorage.setItem('selectedFont', selectedFont);
  
  // Также сохраняем полное семейство шрифтов для использования при загрузке новых постов
  localStorage.setItem('selectedFontFamily', fontFamilies[selectedFont]);
});

// При загрузке страницы восстанавливаем выбор
document.addEventListener('DOMContentLoaded', function() {
  const savedFont = localStorage.getItem('selectedFont');
  const savedFontFamily = localStorage.getItem('selectedFontFamily');
  
  if (savedFont) {
    document.getElementById('font-menu').value = savedFont;
    document.body.style.fontFamily = savedFontFamily;
  }
});

document.getElementById('font-menu-mobile').addEventListener('change', function() {
  const selectedFont = this.value;
  const fontFamilies = {
    'calibri': "'Calibri', 'Gill Sans', 'Gill Sans MT', sans-serif",
    'verdana': "'Verdana', sans-serif",
    'arial': "'Arial', 'Helvetica', sans-serif",
    'times-new-roman': "'Times New Roman', serif",
    'cambria': "'Cambria', 'Cochin', serif"
  };
  
  // Применяем шрифт ко всему документу и динамически создаваемым элементам
  document.body.style.fontFamily = fontFamilies[selectedFont] || "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif";
  
  // Сохраняем выбор в localStorage
  localStorage.setItem('selectedFont', selectedFont);
  
  // Также сохраняем полное семейство шрифтов для использования при загрузке новых постов
  localStorage.setItem('selectedFontFamily', fontFamilies[selectedFont]);
});

// При загрузке страницы восстанавливаем выбор
document.addEventListener('DOMContentLoaded', function() {
  const savedFont = localStorage.getItem('selectedFont');
  const savedFontFamily = localStorage.getItem('selectedFontFamily');
  
  if (savedFont) {
    document.getElementById('font-menu').value = savedFont;
    document.body.style.fontFamily = savedFontFamily;
  }
});






publishBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim() || "Анонимус";
  const theme = postThemeInput.value.trim();
  const text = postTextInput.value.trim();
  const time = formatFullDateTime();
  const pageTitle = document.title;


  let postId = generateId();
    while (!(await isPostIdUnique(postId, pageTitle))) {
    postId = generateId();
  }


  if (!theme || !text) {
    alert("Пожалуйста, заполните тему и текст поста.");
    return;
  }

  let imageBase64 = "";
  let imgWeight = "0 КБ";
  let imgSize = "";
  let imageBytes = 0;

  if (selectedImageFile) {
    if (selectedImageFile.size > 1024 * 1024) {
      alert("Изображение слишком большое! Максимальный размер: 1 МБ.");
      return;
    }

    try {
      imgWeight = `${(selectedImageFile.size / 1024).toFixed(1)} КБ`;
      imageBytes = selectedImageFile.size;

      imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(selectedImageFile);
      });

      imgSize = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(`${img.width} × ${img.height}`);
          URL.revokeObjectURL(img.src);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(selectedImageFile);
      });

    } catch (error) {
      console.error("Ошибка при чтении изображения:", error);
      alert("Не удалось обработать изображение. Попробуйте снова.");
      return;
    }
  }

  const postHTML = `
    <div class="user-post">
      <div class="post-data">
        <img class="hide-show-post plus-minus" src="img/minus.jpg">
        <p class="username">${username}</p>
        <p style="font-weight: 400;">/</p>
        <p class="post-theme">${theme}</p>
        <p style="font-weight: 400;">/</p>
        <p class="img-weight">${imgWeight}</p>
        <p style="font-weight: 400;" class="img-slash">/</p>
        <p class="img-size">${imgSize || "0 × 0"}</p>
        <p style="font-weight: 400;" class="img-slash">/</p>
        <p class="post-time">${time}</p>
        <p style="font-weight: 400;">/</p>
        <a href="#" class="post-id">№${postId}</a>
        <p style="font-weight: 400;">/</p>
        <a class="open-comments-container" style="cursor: pointer; color: rgba(0, 162, 138, 1);">[ 0 комментариев ⤴ ]</a>       
        <p class="reply-slash" style="display: none;font-weight: 400;">/</p>
        <a class="reply-post" style="cursor: pointer; color: rgb(62,162,0); display: none;">[Оставить комментарий]</a>
            <p style="font-weight: 400;">/</p>
            <div class="post-reply-window-but-container">
              <a class="post-reply-window-but">▶</a>
              <div class="post-reply-window">
               <button class="reply-this-post">Пожаловаться на пост</button>
               <button class="download-image">Загрузить изображение</button>
              </div>
            </div>        
      </div>
      <div class="post-main">
        <div class="post-content">
          ${imageBase64 ? `<img class="post-image" src="${imageBase64}">` : ""}
          <p class="post-text">— ${convertTextToHTML(text)}</p>
        </div>
        <div class="post-comments-container" style="display: none;"></div>
      </div>
    </div>
  `;

  postsContainer.insertAdjacentHTML("beforeend", postHTML);

  const newPost = postsContainer.lastElementChild;
  const hideShowPost = newPost.querySelector(".hide-show-post");
  const postMain = newPost.querySelector(".post-main");
  const postData = newPost.querySelector(".post-data");
  const replySlash = newPost.querySelector(".reply-slash");
  const replyPost = newPost.querySelector(".reply-post");
  const postCommentsContainer = newPost.querySelector(".post-comments-container");
  const commentsToggleBtn = newPost.querySelector(".open-comments-container");

  const postReplyToggleBtn = newPost.querySelector(".post-reply-window-but");
  const postReplyWindow = newPost.querySelector(".post-reply-window");

const downloadImageBtn = newPost.querySelector(".download-image");
if (downloadImageBtn) {
  downloadImageBtn.addEventListener("click", () => {
    downloadPostImage(newPost, postId);
  });
}



  postReplyToggleBtn.addEventListener("click", () => {
    const isOpen = postReplyWindow.style.display === "flex";

    if (isOpen) {
      postReplyWindow.style.display = "none";
      postReplyToggleBtn.style.transform = "rotate(0deg)";
    } else {
      postReplyWindow.style.display = "flex";
      postReplyToggleBtn.style.transform = "rotate(90deg)";
    }
  });

  // Изначально скрыть окно и сбросить поворот
  postReplyWindow.style.display = "none";
  postReplyToggleBtn.style.transform = "rotate(0deg)";


  let commentsCount = 0;

  hideShowPost.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(postMain).display !== "none";
    if (isVisible) {
      postMain.style.display = "none";
      hideShowPost.src = "img/plus.jpg";
      replySlash.style.display = "none";
      replyPost.style.display = "none";
    } else {
      postMain.style.display = "block";
      hideShowPost.src = "img/minus.jpg";
      if (postCommentsContainer.style.display === "block") {
        replySlash.style.display = "flex";
        replyPost.style.display = "flex";
      }
    }
  });

  commentsToggleBtn.addEventListener("click", () => {
    const visible = postCommentsContainer.style.display === "block";
    if (visible) {
      postCommentsContainer.style.display = "none";
      commentsToggleBtn.textContent = `[ ${commentsCount} комментариев ⤴ ]`;
      replySlash.style.display = "none";
      replyPost.style.display = "none";
    } else {
      postCommentsContainer.style.display = "block";
      commentsToggleBtn.textContent = `[ ${commentsCount} комментариев ⤵ ]`;
      replySlash.style.display = "flex";
      replyPost.style.display = "flex";
    }
  });

  function addReplyHandler(replyBtn, targetContainer, parentComment = null) {
    replyBtn.addEventListener("click", () => {
      if (targetContainer.querySelector(".post-comment-edit-block")) return;

      const commentEditHTML = `
        <div class="post-comment-edit-block post-comment">
          <div class="comment-content">
            <h2>${parentComment ? "Ответить на комментарий..." : "Оставить комментарий..."}</h2>
            <input placeholder="Имя (необязательно)" class="comment-username">
            <textarea class="comment-text-area" placeholder="Комментарий..."></textarea>
            <div style="display: flex; width: 100%; justify-content: space-between; margin-top: 0.25vw">
              <button class="hidePublishCommentButton">Скрыть форму</button>
              <button class="publishCommentButton">Опубликовать комментарий</button>
            </div>
          </div>
        </div>
      `;

      if (parentComment) {
        parentComment.insertAdjacentHTML("afterend", commentEditHTML);
      } else {
        targetContainer.insertAdjacentHTML("afterbegin", commentEditHTML);
      }

      const commentEditBlock = targetContainer.querySelector(".post-comment-edit-block");
      const commentUsernameInput = commentEditBlock.querySelector(".comment-username");
      const commentTextArea = commentEditBlock.querySelector(".comment-text-area");
      const publishCommentButton = commentEditBlock.querySelector(".publishCommentButton");
      const hidePublishCommentButton = commentEditBlock.querySelector(".hidePublishCommentButton");

      let commentUsername = "";
      let commentText = "";

      commentUsernameInput.addEventListener("input", () => {
        commentUsername = commentUsernameInput.value.trim();
      });

      commentTextArea.addEventListener("input", () => {
        commentText = commentTextArea.value.trim();
      });

      hidePublishCommentButton.addEventListener("click", () => {
        commentEditBlock.remove();
      });

      publishCommentButton.addEventListener("click", async () => {
        if (!commentText) {
          alert("Комментарий не может быть пустым!");
          return;
        }

        const finalUsername = commentUsername || "Анонимус";
        const commentTime = formatFullDateTime();

        let finalText = commentText;
        if (parentComment) {
          const repliedUsername = parentComment.querySelector(".username").textContent.replace(">> ", "");
          const repliedCommentId = parentComment.querySelector(".comment-id").textContent.replace(">> ", "");
          finalText = `>> ${repliedUsername}(${repliedCommentId}), ${commentText}`;
        }

        let commentId = generateId();
          while (!(await isCommentIdUnique(commentId))) {
          commentId = generateId();
        }
  
        const commentHTML = `
          <div class="post-comment">
            <div class="comments-data">
              <p class="username">>> ${finalUsername}</p>
              <p style="font-weight: 400;">/</p>
              <p class="post-time">${commentTime}</p>
              <p style="font-weight: 400;">/</p>
              <a href="#" class="comment-id">№${commentId}</a>
              <p style="font-weight: 400;">/</p>
              <a class="reply-comment" style="cursor: pointer; color: rgb(62,162,0);">[Ответить]</a>
            </div>
            <div class="comment-content">
              <p class="comment-text">${parentComment ? `<a href="#" style="color: rgb(62,162,0);">>> ${finalText.split(',')[0].replace('>> ', '')}</a>, ${commentText}` : `— ${commentText}`}</p>
            </div>
          </div>
        `;

        commentEditBlock.remove();
        if (parentComment) {
          parentComment.insertAdjacentHTML("afterend", commentHTML);
        } else {
          targetContainer.insertAdjacentHTML("afterbegin", commentHTML);
        }

        const newComment = parentComment ? parentComment.nextElementSibling : targetContainer.querySelector(".post-comment");
        const replyCommentBtn = newComment.querySelector(".reply-comment");
        addReplyHandler(replyCommentBtn, targetContainer, newComment);

        commentsCount++;
        commentsToggleBtn.textContent = `[ ${commentsCount} комментариев ${postCommentsContainer.style.display === "block" ? "⤵" : "⤴"}]`;

        const pageTitle = document.title;
        const safeTheme = theme.replace(/[.#$/[\]]/g, "_");
        const safeTime = time.replace(/[: ]/g, "_");
        const safeImgSize = imgSize.replace(/[ ×]/g, "_");
        const documentID = `${safeTheme}_${safeTime}_${safeImgSize}`;
        const docRef = doc(db, pageTitle, documentID);
        const docSnap = await getDoc(docRef);
        let commentsTotal = 0;
        if (docSnap.exists()) {
          const data = docSnap.data();
          commentsTotal = Object.keys(data).filter(key => key.startsWith("comment_")).length;
        }

        const commentID = `comment_${commentsTotal + 1}`;
        await updateDoc(docRef, {
          [commentID]: {
            username: finalUsername,
            text: finalText,
            time: commentTime,
            status: "comment",
            commentId
          },
          commentsQuanity: commentsCount
        });

        alert("Комментарий опубликован!");
      });
    });
  }

  addReplyHandler(replyPost, postCommentsContainer);

  const safeTheme = theme.replace(/[.#$/[\]]/g, "_");
  const safeTime = time.replace(/[: ]/g, "_");
  const safeImgSize = imgSize.replace(/[ ×]/g, "_");
  const documentID = `${safeTheme}_${safeTime}_${safeImgSize}`;

  await setDoc(doc(db, pageTitle, documentID), {
    username,
    theme,
    text,
    time,
    imgWeight,
    imgSize,
    imageBase64,
    commentsQuanity: 0,
    postId
  });

  if (imageBytes > 0) {
    const statsRef = doc(db, "stats", "ImagesWeight");
    await updateDoc(statsRef, {
      totalBytes: increment(imageBytes)
    }).catch(async (error) => {
      if (error.code === "not-found") {
        await setDoc(statsRef, { totalBytes: imageBytes });
      } else {
        console.error("Ошибка обновления stats:", error);
      }
    });
  }

  const quanityRef = doc(db, "stats", "ImagesAllQuanity");
  await updateDoc(quanityRef, {
    count: increment(1)
  }).catch(async (error) => {
    if (error.code === "not-found") {
      await setDoc(quanityRef, { count: 1 });
    } else {
      console.error("Ошибка обновления ImagesAllQuanity:", error);
    }
  });

  postThemeInput.value = "";
  postTextInput.value = "";
  fileInput.value = "";
  selectedImageFile = null;
  openImagesBtn.textContent = "Выбрать изображение";

  newPostForm.style.display = "none";
  setNewPost.style.display = "flex";
  postThemeInput.value = "";
  postTextInput.value = "";
  fileInput.value = "";
  selectedImageFile = null;

  alert("Пост опубликован!");
});





















async function loadPosts() {
    // Получаем сохраненный шрифт
  const savedFontFamily = localStorage.getItem('selectedFontFamily') || "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif";
  
  // Применяем шрифт к body (на случай, если он еще не применен)
  document.body.style.fontFamily = savedFontFamily;
  const pageTitle = document.title;
  const loadBlock = document.getElementById("loading-block");
  postThemeInput.value = "";
  postTextInput.value = "";
  fileInput.value = "";
  selectedImageFile = null;
  openImagesBtn.textContent = "Выбрать изображение";

  try {
    const querySnapshot = await getDocs(collection(db, pageTitle));

    querySnapshot.forEach(async (docSnap) => {
      const postData = docSnap.data();
      const documentID = docSnap.id;
      let postId = postData.postId;

    if (!postId) {
          postId = generateId();
          await updateDoc(doc(db, pageTitle, documentID), {
          postId: postId
      });
    }


      const commentCount = Object.keys(postData).filter(key => key.startsWith("comment_")).length;

      const postHTML = `
        <div class="user-post" data-post-id="${postId}" data-theme="${postData.theme || "default"}">
          <div class="post-data">
            <img class="hide-show-post plus-minus" src="img/minus.jpg">
            <p class="username">${postData.username}</p>
            <p style="font-weight: 400;">/</p>
            <p class="post-theme">${postData.theme}</p>
            <p style="font-weight: 400;">/</p>
            <p class="img-weight">${postData.imgWeight}</p>
            <p style="font-weight: 400;" class="img-slash mobile-slash">/</p>
            <p class="img-size">${postData.imgSize || "0 × 0"}</p>
            <p style="font-weight: 400;" class="img-slash mobile-slash">/</p>
            <p class="post-time">${postData.time}</p>
            <p style="font-weight: 400;" class="img-slash mobile-slash">/</p>
            <a href="#" class="post-id">№${postId}</a>
            <p style="font-weight: 400;">/</p>
            <a class="open-comments-container desktop" style="cursor: pointer; color: rgba(0, 162, 138, 1);">[ ${commentCount} комментариев ⤴ ]</a>
            <p style="font-weight: 400;" class="reply-slash">/</p>
            <a class="reply-post" style="cursor: pointer; color: rgb(62,162,0);">[Оставить комментарий]</a>
            <p style="font-weight: 400;" class="mobile-slash">/</p>
            <div class="post-reply-window-but-container">
              <a class="post-reply-window-but">▶</a>
              <div class="post-reply-window">
               <button class="reply-this-post">Пожаловаться на пост</button>
               <button class="download-image">Загрузить изображение</button>
              </div>
            </div>
          </div>
          <div class="post-main">
            <div class="mobile-post-data">
            <p class="img-weight2">${postData.imgWeight}</p>
              <p style="font-weight: 400;" class="img-slash">/</p>
              <p class="img-size2">${postData.imgSize || "0 × 0"}</p>
              <p style="font-weight: 400;" class="img-slash">/</p>
              <p class="post-time2">${postData.time}</p>
            </div>
            <div class="post-content">
              ${postData.imageBase64 ? `<img class="post-image" src="${postData.imageBase64}">` : ""}
              <p class="post-text">— ${convertTextToHTML(postData.text)}</p>
            </div>
            <div class="mobile-post-data">
                <a class="occ-mobile" style="cursor: pointer; color: rgba(0, 162, 138, 1);">[ ${commentCount} комментариев ⤴ ]</a>
                <p style="font-weight: 400;" class="reply-slash rs-mobile">/</p>
                <a class="reply-post rp-mobile" style="cursor: pointer; color: rgb(62,162,0);">[Оставить комментарий]</a>
            </div>
            <div class="post-comments-container"></div>
          </div>
        </div>
      `;

      postsContainer.insertAdjacentHTML("beforeend", postHTML);


      const newPost = postsContainer.lastElementChild;
      const hideShowPost = newPost.querySelector(".hide-show-post");
      const postMain = newPost.querySelector(".post-main");
      const postDataDiv = newPost.querySelector(".post-data");
      const replySlash = newPost.querySelector(".reply-slash");
      const replyPost = newPost.querySelector(".reply-post");
      const replySlashMobile = newPost.querySelector(".rs-mobile");
      const replyPostMobile = newPost.querySelector(".rp-mobile");
      const postCommentsContainer = newPost.querySelector(".post-comments-container");
      const commentCounter = newPost.querySelector(".open-comments-container");
      const commentCounterMobile = newPost.querySelector(".occ-mobile");

      const postReplyToggleBtn = newPost.querySelector(".post-reply-window-but");
      const postReplyWindow = newPost.querySelector(".post-reply-window");

const downloadImageBtn = newPost.querySelector(".download-image");
if (downloadImageBtn) {
  downloadImageBtn.addEventListener("click", () => {
    downloadPostImage(newPost, postId);
  });
}


      // Установка начального состояния
      postReplyWindow.style.display = "none";
      postReplyToggleBtn.style.transform = "rotate(0deg)";

      // Обработчик клика
      postReplyToggleBtn.addEventListener("click", () => {
      const isOpen = postReplyWindow.style.display === "flex";

      if (isOpen) {
      postReplyWindow.style.display = "none";
      postReplyToggleBtn.style.transform = "rotate(0deg)";
      } else {
      postReplyWindow.style.display = "flex";
      postReplyToggleBtn.style.transform = "rotate(90deg)";
     }
    });

// Скрыть всё по умолчанию
postCommentsContainer.style.display = "none";
replyPost.style.display = "none";
replyPostMobile.style.display = "none";
replySlash.style.display = "none";
replySlashMobile.style.display = "none";

let commentsVisible = false;

commentCounter.addEventListener("click", () => {
  commentsVisible = !commentsVisible;

  postCommentsContainer.style.display = commentsVisible ? "block" : "none";
  replyPost.style.display = commentsVisible ? "flex" : "none";
  replyPostMobile.style.display = commentsVisible ? "flex" : "none";
  replySlash.style.display = commentsVisible ? "flex" : "none";
  replySlashMobile.style.display = commentsVisible ? "flex" : "none";

  const currentText = commentCounter.textContent;
  const updatedArrow = commentsVisible ? "⤵" : "⤴";
  commentCounter.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
  commentCounterMobile.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
});

commentCounterMobile.addEventListener("click", () => {
  commentsVisible = !commentsVisible;

  postCommentsContainer.style.display = commentsVisible ? "block" : "none";
  replyPostMobile.style.display = commentsVisible ? "flex" : "none";
  replySlashMobile.style.display = commentsVisible ? "flex" : "none";

  const currentText = commentCounter.textContent;
  const updatedArrow = commentsVisible ? "⤵" : "⤴";
  commentCounter.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
  commentCounterMobile.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
});


      
  hideShowPost.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(postMain).display !== "none";
    if (isVisible) {
      postMain.style.display = "none";
      hideShowPost.src = "img/plus.jpg";
      replySlash.style.display = "none";
      replyPost.style.display = "none";
    } else {
      postMain.style.display = "block";
      hideShowPost.src = "img/minus.jpg";
      if (postCommentsContainer.style.display === "block") {
        replySlash.style.display = "flex";
        replyPost.style.display = "flex";
      }
    }
  });

      function addReplyHandler(replyBtn, targetContainer, parentComment = null) {
        replyBtn.addEventListener("click", () => {
          if (postCommentsContainer.querySelector(".post-comment-edit-block")) return;

          const commentEditHTML = `
            <div class="post-comment-edit-block post-comment">
              <div class="comment-content">
                <h2>${parentComment ? "Ответить на комментарий..." : "Оставить комментарий..."}</h2>
                <input placeholder="Имя (необязательно)" class="comment-username">
                <textarea class="comment-text-area" placeholder="Комментарий..."></textarea>
                <div style="display: flex;width: 100%;justify-content: space-between;margin-top: 0.25vw">
                  <button class="hidePublishCommentButton">Скрыть форму</button>
                  <button class="publishCommentButton">Опубликовать комментарий</button>
                </div>
              </div>
            </div>
          `;

          if (parentComment) {
            parentComment.insertAdjacentHTML("afterend", commentEditHTML);
          } else {
            postCommentsContainer.insertAdjacentHTML("afterbegin", commentEditHTML);
          }

          const commentEditBlock = postCommentsContainer.querySelector(".post-comment-edit-block");
          const commentUsernameInput = commentEditBlock.querySelector(".comment-username");
          const commentTextArea = commentEditBlock.querySelector(".comment-text-area");
          const publishCommentButton = commentEditBlock.querySelector(".publishCommentButton");
          const hidePublishCommentButton = commentEditBlock.querySelector(".hidePublishCommentButton");

          let commentUsername = "";
          let commentText = "";

          commentUsernameInput.addEventListener("input", () => {
            commentUsername = commentUsernameInput.value.trim();
          });
          commentTextArea.addEventListener("input", () => {
            commentText = commentTextArea.value.trim();
          });

          hidePublishCommentButton.addEventListener("click", () => {
            commentEditBlock.remove();
          });

          publishCommentButton.addEventListener("click", async () => {
            if (!commentText) {
              alert("Комментарий не может быть пустым!");
              return;
            }

            const finalUsername = commentUsername || "Анонимус";
            const commentTime = formatFullDateTime();

            let finalText = commentText;
            if (parentComment) {
              const repliedUsername = parentComment.querySelector(".username").textContent.replace(">> ", "");
              const repliedCommentId = parentComment.querySelector(".comment-id").textContent.replace(">> ", "");
              finalText = `>> ${repliedUsername}(${repliedCommentId}), ${commentText}`;
            }


            let commentId = generateId();
let isUnique = false;

while (!isUnique) {
  const docSnap = await getDoc(doc(db, pageTitle, documentID));
  if (docSnap.exists()) {
    const data = docSnap.data();
    const existingIds = Object.keys(data)
      .filter(k => k.startsWith("comment_"))
      .map(k => data[k].commentId);
    isUnique = !existingIds.includes(commentId);
    if (!isUnique) commentId = generateId();
  } else {
    isUnique = true;
  }
}

            const commentHTML = `
              <div class="post-comment">
                <div class="comments-data">
                  <p class="username">>> ${finalUsername}</p>
                  <p style="font-weight: 400;">/</p>
                  <p class="post-time">${commentTime}</p>
                  <p style="font-weight: 400;">/</p>
                  <a href="#" class="comment-id">№${commentId}</a>
                  <p style="font-weight: 400;">/</p>
                  <a class="reply-comment" style="cursor: pointer; color: rgb(62,162,0);">[Ответить]</a>
                </div>
                <div class="comment-content">
                  <p class="comment-text">
                    ${parentComment ? `<a href="#" style="color: rgb(62,162,0);">>> ${finalText.split(',')[0].replace('>> ', '')}</a>, ${commentText}` : `— ${commentText}`}
                  </p>
                </div>
              </div>
            `;

            commentEditBlock.remove();
            if (parentComment) {
              parentComment.insertAdjacentHTML("afterend", commentHTML);
            } else {
              postCommentsContainer.insertAdjacentHTML("afterbegin", commentHTML);
            }

            const newComment = parentComment ? parentComment.nextElementSibling : postCommentsContainer.querySelector(".post-comment");
            const replyCommentBtn = newComment.querySelector(".reply-comment");
            addReplyHandler(replyCommentBtn, postCommentsContainer, newComment);

            try {
              const docRef = doc(db, pageTitle, documentID);
              const docSnap = await getDoc(docRef);
              let commentsCount = 0;
              if (docSnap.exists()) {
                const data = docSnap.data();
                commentsCount = Object.keys(data).filter(key => key.startsWith("comment_")).length;
              }

              const commentID = `comment_${commentsCount + 1}`;
              await updateDoc(docRef, {
                [commentID]: {
                  username: finalUsername,
                  text: finalText,
                  time: commentTime,
                  status: "comment",
                  commentId
                }
              });

              // Обновление счётчика комментариев
              const newCount = commentsCount + 1;
              commentCounter.textContent = `[ ${newCount} комментариев ⤵ ]`;
              commentCounterMobile.textContent = `[ ${newCount} комментариев ⤵ ]`;

              alert("Комментарий опубликован!");
            } catch (error) {
              console.error("Ошибка сохранения комментария:", error);
              alert("Не удалось сохранить комментарий.");
            }
          });
        });
      }

      Object.keys(postData)
        .filter(key => key.startsWith("comment_"))
        .sort()
        .forEach(async commentKey => {
          const comment = postData[commentKey];
          let commentId = postData[commentKey].commentId;

if (!commentId) {
  commentId = generateId();
  await updateDoc(doc(db, pageTitle, documentID), {
    [`${commentKey}.commentId`]: commentId
  });
}

          const commentHTML = `
            <div class="post-comment">
              <div class="comments-data">
                <p class="username">>> ${comment.username}</p>
                <p style="font-weight: 400;">/</p>
                <p class="post-time">${comment.time}</p>
                <p style="font-weight: 400;">/</p>
                <a href="#" class="comment-id">№${commentId}</a>
                <p style="font-weight: 400;">/</p>
                <a class="reply-comment" style="cursor: pointer; color: rgb(62,162,0);">[Ответить]</a>
              </div>
              <div class="comment-content">
                ${
                  comment.text.startsWith(">> ")
                    ? `<p class="comment-text"><a href="#" style="color: rgb(62,162,0);">${comment.text.split(",")[0]}</a>, ${comment.text.split(",").slice(1).join(",").trim()}</p>`
                    : `<p class="comment-text">— ${comment.text}</p>`
                }
              </div>
            </div>
          `;
          postCommentsContainer.insertAdjacentHTML("beforeend", commentHTML);

          const lastComment = postCommentsContainer.lastElementChild;
          const replyCommentBtn = lastComment.querySelector(".reply-comment");
          addReplyHandler(replyCommentBtn, postCommentsContainer, lastComment);
        });

      addReplyHandler(replyPost, postCommentsContainer);
      addReplyHandler(replyPostMobile, postCommentsContainer);


  });

    loadBlock.style.display = "none";
    removeDuplicatePosts();
    console.log(`[Firestore] ✅ Загружено ${querySnapshot.size} пост(ов) из коллекции «${pageTitle}»`);
  } catch (error) {
    console.error("[Firestore] ❌ Ошибка загрузки постов:", error);
  }
}



// Запускаем загрузку при открытии страницы
loadPosts();























async function searchAndRenderPosts(query) {
  const pageTitle = document.title;
  const postsContainer = document.getElementById("user-posts-container");
  postsContainer.innerHTML = "";

  // Показываем все посты при пустом запросе
  if (!query.trim()) {
    return;
  }

  try {
    const querySnapshot = await getDocs(collection(db, pageTitle));
    const loadedPostIds = new Set();
    let matchFound = false;

    for (const docSnap of querySnapshot.docs) {
      const postData = docSnap.data();
      const documentID = docSnap.id;
      let postId = postData.postId;

      if (!postId) {
        postId = generateId();
        await updateDoc(doc(db, pageTitle, documentID), { postId });
      }

      const normalizedQuery = query.trim().toLowerCase();
      const isMatch = postId.toLowerCase().includes(normalizedQuery) || (postData.theme || "").toLowerCase().includes(normalizedQuery);

      if (!isMatch || loadedPostIds.has(postId)) continue;

      matchFound = true;
      loadedPostIds.add(postId);

      const commentCount = Object.keys(postData).filter(key => key.startsWith("comment_")).length;

      const postHTML = `
        <div class="user-post" data-post-id="${postId}" data-theme="${postData.theme || "default"}">
          <div class="post-data">
            <img class="hide-show-post plus-minus" src="img/minus.jpg">
            <p class="username">${postData.username}</p>
            <p style="font-weight: 400;">/</p>
            <p class="post-theme">${postData.theme}</p>
            <p style="font-weight: 400;">/</p>
            <p class="img-weight">${postData.imgWeight}</p>
            <p style="font-weight: 400;" class="img-slash">/</p>
            <p class="img-size">${postData.imgSize || "0 × 0"}</p>
            <p style="font-weight: 400;" class="img-slash">/</p>
            <p class="post-time">${postData.time}</p>
            <p style="font-weight: 400;">/</p>
            <a href="#" class="post-id">№${postId}</a>
            <p style="font-weight: 400;">/</p>
            <a class="open-comments-container" style="cursor: pointer; color: rgba(0, 162, 138, 1);">[ ${commentCount} комментариев ⤴ ]</a>
            <p style="font-weight: 400;" class="reply-slash">/</p>
            <a class="reply-post" style="cursor: pointer; color: rgb(62,162,0);">[Оставить комментарий]</a>
            <p style="font-weight: 400;">/</p>
            <div class="post-reply-window-but-container">
              <a class="post-reply-window-but">▶</a>
              <div class="post-reply-window">
               <button class="reply-this-post">Пожаловаться на пост</button>
               <button class="download-image">Загрузить изображение</button>
              </div>
            </div>
          </div>
          <div class="post-main">
            <div class="post-content">
              ${postData.imageBase64 ? `<img class="post-image" src="${postData.imageBase64}">` : ""}
              <p class="post-text">— ${convertTextToHTML(postData.text)}</p>
            </div>
            <div class="post-comments-container"></div>
          </div>
        </div>
      `;

      postsContainer.insertAdjacentHTML("beforeend", postHTML);

      const newPost = postsContainer.lastElementChild;
      const hideShowPost = newPost.querySelector(".hide-show-post");
      const postMain = newPost.querySelector(".post-main");
      const replyPost = newPost.querySelector(".reply-post");
      const replySlash = newPost.querySelector(".reply-slash");
      const commentCounter = newPost.querySelector(".open-comments-container");

      const postReplyToggleBtn = newPost.querySelector(".post-reply-window-but");
      const postReplyWindow = newPost.querySelector(".post-reply-window");

const downloadImageBtn = newPost.querySelector(".download-image");
if (downloadImageBtn) {
  downloadImageBtn.addEventListener("click", () => {
    downloadPostImage(newPost, postId);
  });
}


      // Установка начального состояния
      postReplyWindow.style.display = "none";
      postReplyToggleBtn.style.transform = "rotate(0deg)";

      // Обработчик клика
      postReplyToggleBtn.addEventListener("click", () => {
      const isOpen = postReplyWindow.style.display === "flex";

      if (isOpen) {
      postReplyWindow.style.display = "none";
      postReplyToggleBtn.style.transform = "rotate(0deg)";
      } else {
      postReplyWindow.style.display = "flex";
      postReplyToggleBtn.style.transform = "rotate(90deg)";
     }
    });

      const postCommentsContainer = newPost.querySelector(".post-comments-container");

      postCommentsContainer.style.display = "none";
      replyPost.style.display = "none";
      replySlash.style.display = "none";

      let commentsVisible = false;

      commentCounter.addEventListener("click", () => {
        commentsVisible = !commentsVisible;
        postCommentsContainer.style.display = commentsVisible ? "block" : "none";
        replyPost.style.display = commentsVisible ? "flex" : "none";
        replySlash.style.display = commentsVisible ? "flex" : "none";
        const updatedArrow = commentsVisible ? "⤵" : "⤴";
        commentCounter.textContent = `[ ${commentCount} комментариев ${updatedArrow} ]`;
      });

  hideShowPost.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(postMain).display !== "none";
    if (isVisible) {
      postMain.style.display = "none";
      hideShowPost.src = "img/plus.jpg";
      replySlash.style.display = "none";
      replyPost.style.display = "none";
    } else {
      postMain.style.display = "block";
      hideShowPost.src = "img/minus.jpg";
      if (postCommentsContainer.style.display === "block") {
        replySlash.style.display = "flex";
        replyPost.style.display = "flex";
      }
    }
  });

      function addReplyHandler(replyBtn, targetContainer, parentComment = null) {
        replyBtn.addEventListener("click", () => {
          if (postCommentsContainer.querySelector(".post-comment-edit-block")) return;

          const commentEditHTML = `
            <div class="post-comment-edit-block post-comment">
              <div class="comment-content">
                <h2>${parentComment ? "Ответить на комментарий..." : "Оставить комментарий..."}</h2>
                <input placeholder="Имя (необязательно)" class="comment-username">
                <textarea class="comment-text-area" placeholder="Комментарий..."></textarea>
                <div style="display: flex;width: 100%;justify-content: space-between;margin-top: 0.25vw">
                  <button class="hidePublishCommentButton">Скрыть форму</button>
                  <button class="publishCommentButton">Опубликовать комментарий</button>
                </div>
              </div>
            </div>
          `;

          if (parentComment) {
            parentComment.insertAdjacentHTML("afterend", commentEditHTML);
          } else {
            postCommentsContainer.insertAdjacentHTML("afterbegin", commentEditHTML);
          }

          const commentEditBlock = postCommentsContainer.querySelector(".post-comment-edit-block");
          const commentUsernameInput = commentEditBlock.querySelector(".comment-username");
          const commentTextArea = commentEditBlock.querySelector(".comment-text-area");
          const publishCommentButton = commentEditBlock.querySelector(".publishCommentButton");
          const hidePublishCommentButton = commentEditBlock.querySelector(".hidePublishCommentButton");

          let commentUsername = "";
          let commentText = "";

          commentUsernameInput.addEventListener("input", () => {
            commentUsername = commentUsernameInput.value.trim();
          });
          commentTextArea.addEventListener("input", () => {
            commentText = commentTextArea.value.trim();
          });

          hidePublishCommentButton.addEventListener("click", () => {
            commentEditBlock.remove();
          });

          publishCommentButton.addEventListener("click", async () => {
            if (!commentText) {
              alert("Комментарий не может быть пустым!");
              return;
            }

            const finalUsername = commentUsername || "Анонимус";
            const commentTime = formatFullDateTime();

            let finalText = commentText;
            if (parentComment) {
              const repliedUsername = parentComment.querySelector(".username").textContent.replace(">> ", "");
              const repliedCommentId = parentComment.querySelector(".comment-id").textContent.replace("No.", "");
              finalText = `>> ${repliedUsername}(No.${repliedCommentId}), ${commentText}`;
            }

            let commentId = generateId();
            let isUnique = false;

            while (!isUnique) {
              const docSnap = await getDoc(doc(db, pageTitle, documentID));
              if (docSnap.exists()) {
                const data = docSnap.data();
                const existingIds = Object.keys(data)
                  .filter(k => k.startsWith("comment_"))
                  .map(k => data[k].commentId);
                isUnique = !existingIds.includes(commentId);
                if (!isUnique) commentId = generateId();
              } else {
                isUnique = true;
              }
            }

            const commentHTML = `
              <div class="post-comment">
                <div class="comments-data">
                  <p class="username">>> ${finalUsername}</p>
                  <p style="font-weight: 400;">/</p>
                  <p class="post-time">${commentTime}</p>
                  <p style="font-weight: 400;">/</p>
                  <a href="#" class="comment-id">№${commentId}</a>
                  <p style="font-weight: 400;">/</p>
                  <a class="reply-comment" style="cursor: pointer; color: rgb(62,162,0);">[Ответить]</a>
                </div>
                <div class="comment-content">
                  <p class="comment-text">
                    ${parentComment ? `<a href="#" style="color: rgb(62,162,0);">>> ${finalText.split(',')[0].replace('>> ', '')}</a>, ${commentText}` : `— ${commentText}`}
                  </p>
                </div>
              </div>
            `;

            commentEditBlock.remove();
            if (parentComment) {
              parentComment.insertAdjacentHTML("afterend", commentHTML);
            } else {
              postCommentsContainer.insertAdjacentHTML("afterbegin", commentHTML);
            }

            const newComment = parentComment ? parentComment.nextElementSibling : postCommentsContainer.querySelector(".post-comment");
            const replyCommentBtn = newComment.querySelector(".reply-comment");
            addReplyHandler(replyCommentBtn, postCommentsContainer, newComment);

            try {
              const docRef = doc(db, pageTitle, documentID);
              const docSnap = await getDoc(docRef);
              let commentsCount = 0;
              if (docSnap.exists()) {
                const data = docSnap.data();
                commentsCount = Object.keys(data).filter(key => key.startsWith("comment_")).length;
              }

              const commentID = `comment_${commentsCount + 1}`;
              await updateDoc(docRef, {
                [commentID]: {
                  username: finalUsername,
                  text: finalText,
                  time: commentTime,
                  status: "comment",
                  commentId
                }
              });

              commentCounter.textContent = `[ ${commentsCount + 1} комментариев ⤵ ]`;
              alert("Комментарий опубликован!");
            } catch (error) {
              console.error("Ошибка сохранения комментария:", error);
              alert("Не удалось сохранить комментарий.");
            }
          });
        });
      }

      Object.keys(postData)
        .filter(key => key.startsWith("comment_"))
        .sort()
        .forEach(async commentKey => {
          const comment = postData[commentKey];
          let commentId = comment.commentId;

          if (!commentId) {
            commentId = generateId();
            await updateDoc(doc(db, pageTitle, documentID), {
              [`${commentKey}.commentId`]: commentId
            });
          }

          const commentHTML = `
            <div class="post-comment">
              <div class="comments-data">
                <p class="username">>> ${comment.username}</p>
                <p style="font-weight: 400;">/</p>
                <p class="post-time">${comment.time}</p>
                <p style="font-weight: 400;">/</p>
                <a href="#" class="comment-id">№${commentId}</a>
                <p style="font-weight: 400;">/</p>
                <a class="reply-comment" style="cursor: pointer; color: rgb(62,162,0);">[Ответить]</a>
              </div>
              <div class="comment-content">
                ${
                  comment.text.startsWith(">> ")
                    ? `<p class="comment-text"><a href="#" style="color: rgb(62,162,0);">${comment.text.split(",")[0]}</a>, ${comment.text.split(",").slice(1).join(",").trim()}</p>`
                    : `<p class="comment-text">— ${comment.text}</p>`
                }
              </div>
            </div>
          `;
          postCommentsContainer.insertAdjacentHTML("beforeend", commentHTML);
          const lastComment = postCommentsContainer.lastElementChild;
          const replyCommentBtn = lastComment.querySelector(".reply-comment");
          addReplyHandler(replyCommentBtn, postCommentsContainer, lastComment);
        });

      addReplyHandler(replyPost, postCommentsContainer);



    }

    removeDuplicatePosts();

    if (!matchFound) {
      postsContainer.innerHTML = `<div class="none-posts-window" style="display: flex;justify-content: center;font-size: calc(0.5vw + 0.5em);padding: 5vw 0;">Пост(-ы) не найдены.</div>`;
    }
  } catch (err) {
    console.error("Ошибка поиска постов:", err);
  }
}

function removeDuplicatePosts() {
  const postsContainer = document.getElementById("user-posts-container");
  const posts = postsContainer.querySelectorAll(".user-post");

  const seenPostIds = new Set();

  posts.forEach(post => {
    const postIdLink = post.querySelector(".post-id");
    if (!postIdLink) return;

    const postIdText = postIdLink.textContent.trim(); // например: "No.12345"

    if (seenPostIds.has(postIdText)) {
      post.remove(); // дубликат — удаляем
    } else {
      seenPostIds.add(postIdText);
    }
  });
}



const searchPostsInput = document.querySelector(".search-posts-input");
searchPostsInput.addEventListener("input", () => {
  const value = searchPostsInput.value.trim();
  if (value === "") {
    loadPosts(); // только loadPosts
  } else {
    searchAndRenderPosts(value); // только поиск
  }
});


const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
  searchPostsInput.value = "";
  loadPosts();
});
























