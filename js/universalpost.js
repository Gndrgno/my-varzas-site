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


async function loadSinglePost() {
  // Получаем параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  const postTheme = urlParams.get('theme');

  const postsContainer = document.getElementById("user-posts-container");
  if (!postId) {
    postsContainer.innerHTML = "<p>Пост не найден</p>";
    return;
  }

  // Массив всех коллекций
  const collections = [
    "Чеченская музыка",
    "Национальная одежда",
    "Танцы и обычаи",
    "Чеченская кухня",
    "Народные сказания",
    "История тейпов",
    "Ремесла и рукоделие",
    "Брак и никах",
    "Женские дела",
    "Воспитание детей",
    "Приданое и махр",
    "Многожёнство",
    "Разводы и права",
    "Вопросы шариата",
    "Сунна и хадисы",
    "Суфизм в Чечне",
    "Мавлиды и зикр",
    "Исламское воспитание",
    "Фетвы и богословие",
    "Женщина в исламе",
    "Музыка",
    "Фильмы",
    "Ютуб и стримеры",
    "Мемы",
    "Фото и видео",
    "Чтение книг",
    "Путешествия",
    "Учёба и вузы",
    "Чеченцы за границей",
    "Молодёжные движения",
    "TikTok и соцсети",
    "Уличная мода",
    "Любовь и отношения",
    "Как найти себя",
    "Нохчалла (кодекс чести)",
    "Свадьбы и обряды",
    "Тейповая система",
    "Роль старейшин",
    "Семейные конфликты",
    "Гостеприимство",
    "Традиции или современность",
    "Предпринимательство",
    "Халяль-бизнес",
    "Женщины в бизнесе",
    "Госпрограммы",
    "Безработица",
    "Сельское хозяйство",
    "Работа за пределами ЧР",
    "ММА и борьба",
    "ГТО и фитнес",
    "Питание",
    "Травмы и восстановление",
    "Спорт в школах",
    "ЗОЖ",
    "Народная медицина",
    "Другое..."
  ];

  try {
    let postFound = false;
    let postCollection = ""; 
    
    // Ищем пост во всех коллекциях
    for (const collectionName of collections) {
      const postsCollection = collection(db, collectionName);
      const querySnapshot = await getDocs(postsCollection);
      
      for (const docSnap of querySnapshot.docs) {
        const postData = docSnap.data();
        if (postData.postId === postId) {
          postCollection = collectionName; // Сохраняем название коллекции
          postFound = true;
          const documentID = docSnap.id;
          const commentCount = Object.keys(postData).filter(key => key.startsWith("comment_")).length;

          // Обновляем title страницы
          document.title = `${postCollection} - ${postId}`;
          
          // Обновляем заголовок h1
          const pageHeader = document.querySelector('h1');
          if (pageHeader) {
            pageHeader.textContent = `${postCollection} - ${postId || 'postTheme'}`;
          }

          // Создаем HTML поста
          const postHTML = `
            <div class="user-post">
              <div class="post-data">
                <img class="hide-show-post plus-minus" src="img/minus.jpg">
                <p class="username">${postData.username}</p>
                <p style="font-weight: 400;">/</p>
                <p class="post-theme">${postData.theme}</p>
                <p style="font-weight: 400;">/</p>
                <p class="img-weight">${postData.imgWeight}</p>
                <p style="font-weight: 400;">/</p>
                <p class="img-size">${postData.imgSize || "0 × 0"}</p>
                <p style="font-weight: 400;">/</p>
                <p class="post-time">${postData.time}</p>
                <p style="font-weight: 400;">/</p>
                <a href="#" class="post-id">№${postData.postId}</a>
                <p style="font-weight: 400;">/</p>
                <a class="open-comments-container" style="cursor: pointer; color: rgba(0, 162, 138, 1);">[ ${commentCount} комментариев ⤵ ]</a>
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

          postsContainer.innerHTML = postHTML;
          const newPost = postsContainer.firstElementChild;

          // Инициализация обработчиков для поста
          initPostHandlers(newPost, postData, documentID, collectionName);

          break;
        }
      }
      if (postFound) break;
    }

    const loadBlock = document.getElementById("loading-block");
    loadBlock.style.display = "none";

    if (!postFound) {
      postsContainer.innerHTML = "<p>Пост не найден</p>";
    }
  } catch (error) {
    console.error("[Firestore] ❌ Ошибка загрузки поста:", error);
    postsContainer.innerHTML = "<p>Ошибка загрузки поста</p>";
  }
}

// Функция для инициализации всех обработчиков поста
function initPostHandlers(postElement, postData, documentID, collectionName) {
  const hideShowPost = postElement.querySelector(".hide-show-post");
  const postMain = postElement.querySelector(".post-main");
  const postDataDiv = postElement.querySelector(".post-data");
  const replySlash = postElement.querySelector(".reply-slash");
  const replyPost = postElement.querySelector(".reply-post");
  const postCommentsContainer = postElement.querySelector(".post-comments-container");
  const commentCounter = postElement.querySelector(".open-comments-container");

  const postReplyToggleBtn = postElement.querySelector(".post-reply-window-but");
  const postReplyWindow = postElement.querySelector(".post-reply-window");
  const downloadImageBtn = postElement.querySelector(".download-image");

  // Обработчик для кнопки загрузки изображения
  if (downloadImageBtn) {
    downloadImageBtn.addEventListener("click", () => {
      downloadPostImage(postElement, postData.postId);
    });
  }

  postReplyWindow.style.display = "none";
  // Обработчик для меню поста
  postReplyToggleBtn.addEventListener("click", () => {
    const isOpen = postReplyWindow.style.display === "flex";
    postReplyWindow.style.display = isOpen ? "none" : "flex";
    postReplyToggleBtn.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
  });

  // Настройка комментариев
  postCommentsContainer.style.display = "block";
  replyPost.style.display = "flex";
  replySlash.style.display = "flex";

  let commentsVisible = true;

  commentCounter.addEventListener("click", () => {
    commentsVisible = !commentsVisible;
    postCommentsContainer.style.display = commentsVisible ? "block" : "none";
    replyPost.style.display = commentsVisible ? "flex" : "none";
    replySlash.style.display = commentsVisible ? "flex" : "none";

    const currentText = commentCounter.textContent;
    const updatedArrow = commentsVisible ? "⤵" : "⤴";
    commentCounter.textContent = currentText.replace(/⤴|⤵/, updatedArrow);
  });

  // Обработчик скрытия/показа поста
  hideShowPost.addEventListener("click", () => {
    const isVisible = window.getComputedStyle(postMain).display !== "none";
    postMain.style.display = isVisible ? "none" : "block";
    hideShowPost.src = isVisible ? "img/plus.jpg" : "img/minus.jpg";
    
    if (!isVisible && postCommentsContainer.style.display === "block") {
      replySlash.style.display = "flex";
      replyPost.style.display = "flex";
    } else {
      replySlash.style.display = "none";
      replyPost.style.display = "none";
    }
  });

  // Обработчик для изображения поста (просмотр в большом размере)
  const postImage = postElement.querySelector(".post-image");
  if (postImage) {
    postImage.addEventListener("click", () => {
      showBigPhoto(postImage, postElement);
    });
  }

  // Загрузка комментариев
  loadComments(postElement, postData, documentID, collectionName);

  // Обработчик для ответа на пост
  addReplyHandler(replyPost, postCommentsContainer, null, documentID, collectionName);
}

// Функция загрузки комментариев
function loadComments(postElement, postData, documentID, collectionName) {
  const postCommentsContainer = postElement.querySelector(".post-comments-container");

  Object.keys(postData)
    .filter(key => key.startsWith("comment_"))
    .sort()
    .forEach(commentKey => {
      const comment = postData[commentKey];
      const commentHTML = `
        <div class="post-comment">
          <div class="comments-data">
            <p class="username">>> ${comment.username}</p>
            <p style="font-weight: 400;">/</p>
            <p class="post-time">${comment.time}</p>
            <p style="font-weight: 400;">/</p>
            <a href="#" class="comment-id">№${comment.commentId}</a>
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
      addReplyHandler(replyCommentBtn, postCommentsContainer, lastComment, documentID, collectionName);
    });
}

// Функция для обработки ответов на комментарии и посты
function addReplyHandler(replyBtn, targetContainer, parentComment, documentID, collectionName) {
  replyBtn.addEventListener("click", () => {
    if (targetContainer.querySelector(".post-comment-edit-block")) return;

    const commentEditHTML = `
      <div class="post-comment-edit-block post-comment">
        <div class="comment-content">
          <h2>${parentComment ? "Ответить на комментарий..." : "Добавить комментарий..."}</h2>
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
      targetContainer.insertAdjacentHTML("afterbegin", commentEditHTML);
    }

    const commentEditBlock = targetContainer.querySelector(".post-comment-edit-block");
    const publishCommentButton = commentEditBlock.querySelector(".publishCommentButton");
    const hidePublishCommentButton = commentEditBlock.querySelector(".hidePublishCommentButton");

    hidePublishCommentButton.addEventListener("click", () => {
      commentEditBlock.remove();
    });

    publishCommentButton.addEventListener("click", async () => {
      const commentUsernameInput = commentEditBlock.querySelector(".comment-username");
      const commentTextArea = commentEditBlock.querySelector(".comment-text-area");
      
      const commentUsername = commentUsernameInput.value.trim();
      let commentText = commentTextArea.value.trim();

      if (!commentText) {
        alert("Комментарий не может быть пустым!");
        return;
      }

      const finalUsername = commentUsername || "Анонимус";
      const commentTime = formatFullDateTime();

      if (parentComment) {
        const repliedUsername = parentComment.querySelector(".username").textContent.replace(">> ", "");
        const repliedCommentId = parentComment.querySelector(".comment-id").textContent.replace("№", "");
        commentText = `>> ${repliedUsername}(${repliedCommentId}), ${commentText}`;
      }

      // Генерация уникального ID для комментария
      let commentId = generateId();
      let isUnique = false;

      while (!isUnique) {
        const docSnap = await getDoc(doc(db, collectionName, documentID));
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

      // Создание HTML комментария
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
              ${parentComment ? `<a href="#" style="color: rgb(62,162,0);">>> ${commentText.split(',')[0].replace('>> ', '')}</a>, ${commentText.split(',').slice(1).join(',').trim()}` : `— ${commentText}`}
            </p>
          </div>
        </div>
      `;

      commentEditBlock.remove();
      const insertPosition = parentComment ? parentComment.nextElementSibling : targetContainer.firstElementChild;
      targetContainer.insertAdjacentHTML("beforeend", commentHTML);

      const newComment = targetContainer.lastElementChild;
      const replyCommentBtn = newComment.querySelector(".reply-comment");
      addReplyHandler(replyCommentBtn, targetContainer, newComment, documentID, collectionName);

      // Сохранение в Firestore
      try {
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
        let commentsCount = 0;
        if (docSnap.exists()) {
          const data = docSnap.data();
          commentsCount = Object.keys(data).filter(key => key.startsWith("comment_")).length;
        }

        const commentKey = `comment_${commentsCount + 1}`;
        await updateDoc(docRef, {
          [commentKey]: {
            username: finalUsername,
            text: commentText,
            time: commentTime,
            status: "comment",
            commentId
          }
        });

    // НОВЫЙ КОД: Обновляем счетчик комментариев сразу
    const commentCounter = document.querySelector(".open-comments-container");
    let commentsVisible = false;
    if (commentCounter) {
      const currentCount = parseInt(commentCounter.textContent.match(/\d+/)[0]);
      const newCount = currentCount + 1;
      commentCounter.textContent = `[ ${newCount} комментариев ${commentsVisible ? '⤵' : '⤴'} ]`;
    }

    // Обновляем список комментариев без перезагрузки
    const newComment = {
      username: finalUsername,
      text: commentText,
      time: commentTime,
      commentId
    };
        

        alert("Комментарий опубликован!");
      } catch (error) {
        console.error("Ошибка сохранения комментария:", error);
        alert("Не удалось сохранить комментарий.");
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', loadSinglePost);

// Функция для отображения большого изображения
function showBigPhoto(postImage, postElement) {
  const bigPhotoBlock = document.querySelector(".big-photo-block");
  const bigPhotoItem = bigPhotoBlock.querySelector(".big-photo-item");
  const bigPhotoImage = bigPhotoBlock.querySelector(".big-photo-image");
  const bigPhotoInfo = bigPhotoBlock.querySelector(".big-photo-info");

  bigPhotoImage.src = postImage.src;

  const sizeText = postElement.querySelector(".img-size").textContent || "Неизвестно";
  const weightText = postElement.querySelector(".img-weight").textContent || "Неизвестно";
  bigPhotoInfo.innerHTML = `
    <span style="margin-right: 1vw;">Размер: ${sizeText}</span>
    <span style="margin-right: 1vw;">Вес: ${weightText}</span>
    <img class="close-big-photo" src="https://raw.githubusercontent.com/Gndrgno/img7/refs/heads/main/cross-checkbox-svgrepo-com.png" style="width: 2vw; cursor: pointer;">
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

  // Drag and drop логика
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const dragStart = (e) => {
    const target = e.target.closest(".big-photo-item");
    if (!target) return;

    isDragging = true;
    const rect = target.getBoundingClientRect();
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
}

// Вспомогательные функции
function generateId() {
  return "17" + Math.floor(Math.random() * 1e10).toString().padStart(10, "0");
}

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