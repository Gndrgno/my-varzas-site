import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  limit
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-storage.js";

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

const closeCross = document.getElementById("close-cross");
const whatIsThis = document.getElementById("what-is-this");
const agreeDisclaimer = document.getElementById("agree-disclaimer");
const closeDisclaimer = document.getElementById("close-disclaimer");
const closeDisclaimer2 = document.getElementById("close-disclaimer2");
const disclaimerWindow = document.getElementById("disclaimer-background");


//Закрыть окно информации
closeCross.addEventListener("click", () => {
    whatIsThis.style.display = "none";
})

//Отказ от ответственности
agreeDisclaimer.addEventListener("click", () =>{
    disclaimerWindow.style.display = "none";
})
closeDisclaimer.addEventListener("click", () => {
    window.close()
})
closeDisclaimer2.addEventListener("click", () => {
    window.close()
})




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

const popularPostsBlock = document.getElementById("popular-posts-block");
const loadingPopularPosts = document.getElementById("loading-popular-posts");

function getRandomCollections(count) {
  const shuffled = [...collections].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function convertTextToHTML(text) {
  const safeText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const withFormatting = safeText
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")           // **жирный**
    .replace(/_(.*?)_/g, "<i>$1</i>")                 // _курсив_
    .replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/g, "<u>$1</u>"); // <u>подчеркивание</u>

  return withFormatting.replace(/\n/g, "<br>");
}

async function loadPopularPosts() {
  console.log("🚀 Загружаем случайные посты");

  const selectedCollections = getRandomCollections(8);
  console.log("🎯 Выбраны коллекции:", selectedCollections);

  const allPosts = [];

  for (const collectionName of selectedCollections) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName), limit(1));

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();

        let text = data.text || "(нет текста)";
        if (text.length > 100) {
          text = text.substring(0, 100) + "...";
        }
        text = convertTextToHTML(text);

        allPosts.push({
          theme: collectionName,
          text: text,
          image: data.imageBase64 || "",
        });

        console.log(`✅ Получен пост из "${collectionName}"`);
      }
    } catch (error) {
      console.error(`❌ Ошибка при загрузке "${collectionName}":`, error);
    }
  }

  popularPostsBlock.innerHTML = "";

  for (const post of allPosts) {
    const li = document.createElement("ul");
    li.className = "popular-post-item";
    li.innerHTML = `
      <h3 class="board-p-design">${post.theme}</h3>
      <img src="${post.image}" alt="Popular Post Image">
      <p style="text-align:center" class="board-p-design">${post.text}</p>
    `;
    popularPostsBlock.appendChild(li);
  }
  
  loadPopularPosts.style.display = "none";
  console.log("✅ Все посты загружены на страницу.");
}

loadPopularPosts();

async function calculateTotalImageWeight() {
  const ImagesAllWeight = document.getElementById("ImagesAllWeight");

  try {
    // 1️⃣ Получаем документ stats/ImagesWeight
    const statsRef = doc(db, "stats", "ImagesWeight");
    const statsSnap = await getDoc(statsRef);

    if (statsSnap.exists()) {
      const data = statsSnap.data();
      const totalBytes = data.totalBytes || 0;

      // 2️⃣ Форматируем вес
      let totalSizeStr = "";
      if (totalBytes >= 1024 * 1024 * 1024) {
        totalSizeStr = `${(totalBytes / (1024 * 1024 * 1024)).toFixed(2)} ГБ`;
      } else if (totalBytes >= 1024 * 1024) {
        totalSizeStr = `${(totalBytes / (1024 * 1024)).toFixed(2)} МБ`;
      } else {
        totalSizeStr = `${(totalBytes / 1024).toFixed(2)} КБ`;
      }

      ImagesAllWeight.textContent = totalSizeStr;

    } else {
      // Документ ещё не существует
      ImagesAllWeight.textContent = "0 КБ";
    }

  } catch (error) {
    console.error("Ошибка при получении ImagesWeight:", error);
    ImagesAllWeight.textContent = "Ошибка";
  }
}

calculateTotalImageWeight();

async function calculateTotalImageQuanity() {
  const ImagesAllQuanityEl = document.getElementById("ImagesAllQuanity");

  try {
    const quanityRef = doc(db, "stats", "ImagesAllQuanity");
    const quanitySnap = await getDoc(quanityRef);

    if (quanitySnap.exists()) {
      const data = quanitySnap.data();
      const count = data.count || 0;
      ImagesAllQuanityEl.textContent = count.toString();
    } else {
      ImagesAllQuanityEl.textContent = "0";
    }
  } catch (error) {
    console.error("Ошибка при получении ImagesAllQuanity:", error);
    ImagesAllQuanityEl.textContent = "Ошибка";
  }
}

calculateTotalImageQuanity();



