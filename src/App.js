import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Edit from "./pages/Edit/Edit";
import Preview from "./pages/Preview/Preview";
import "./App.css";
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import MyAccount from "./components/MyAccount/MyAccount";
import Create from "./components/Create/Create";
import Home from "./pages/Home/Home";
import UserPreview from "./components/UserPage/UserPreview/UserPreview";
import { signup } from "./service/auth";

// Tarjima matnlari uchun ob'ekt
const translations = {
  uz: {
    email: "Elektron pochta",
    password: "Parol",
    login: "Kirish",
    signup: "Ro'yxatdan o'tish",
    home: "Bosh sahifa",
    create: "Yaratish",
    createProfile: "Profil yaratish",
    createProfileError: "Profil mavjud emas!",
    edit: "Tahrirlash",
    myAccount: "Mening Hisobim",
    sidebar: "Yon panel",
    navbar: "Navigatsiya paneli",
    homeH2: "Endi sizga faqat bitta havola kerak.",
    homeP:
      "Bir marta bosish orqali izdoshlaringiz bilan ko'proq baham ko'ring. Taqdim barcha kontentingizga bir joyda ulanishni osonlashtiradi.",
    homeButton: "Taqdim dan bepul foydalaning",
    homeP2: "Odamlar bu hafta ro'yxatdan o'tishdi!",
    signupP: "Hisobingiz bormi?",
    signupError: "Foydalanuvchi mavjud!",
    loginError: "Elektron pochta yoki parol noto'g'ri!",
    loginP: "Hisobingiz yo'qmi?",
    preview: " Ko'rish",
    NoImage: "Rasm mavjud emas!",
    loading: "Yuklanmoqda...",
    qrCode: "QR kodini yuklab oling",
    // EDIT
    username: "Foydalanuvchi Nomi",
    fullname: "To'liq Ism",
    phonenumber: "Telefon Raqami",
    location: "Joylashuvi",
    about: "Men Haqimda",
    links: "Havolalar",
    delete: "O'chirish",
    addlink: "Havola Qo'shish",
    save: "Saqlash",
    createaccount: "Hisob yaratish",
    logout: "Chiqish",
    createerror: "Xato: bunday foydalanuvchi nomi mavjud",
    profileimage: "Profil Rasmi",
    User_not_found: "Foydalanuvchi topilmadi",
    Authentication_credentials_were_not_provided:
      "Autentifikatsiya ma'lumotlari taqdim etilmagan.",
  },
  en: {
    Authentication_credentials_were_not_provided:
      "Authentication credentials were not provided.",
    profileimage: "Profile Image",
    User_not_found: "User not found",
    createerror: "Error: such a username exists",
    logout: "Logout",
    createaccount: "Create Account",
    qrCode: " Download QR Code",
    loading: "Loading...",
    email: "Email",
    password: "Password",
    signupError: "User does exist!",
    loginP: "Don't have an account?",
    preview: "Preview",
    NoImage: "No Image",
    login: "Login",
    signup: "Sign Up",
    home: "Home",
    create: "Create",
    createProfile: "Create a Profile",
    createProfileError: "Profile not available!",
    edit: "Edit",
    myAccount: "My Account",
    sidebar: "Sidebar",
    navbar: "Navbar",
    homeH2: "Now you only need one link.",
    homeP:
      "Share more with your followers in a single click. Taqdim makes it easy to link to all of your content in one place.",
    homeButton: " Use Taqdim for Free",
    homeP2: "People have signed up this week!",
    signupP: "Already have an account?",
    loginError: "Email or Password is wrong!",
    // ETID
    username: "User Name",
    fullname: "Full Name",
    phonenumber: "Phone Number",
    location: "Location",
    about: "About",
    links: "Links",
    delete: "Delete",
    addlink: "Add Link",
    save: "save",
  },
  ru: {
    email: "Электронная почта",
    password: "Пароль",
    login: "Войти",
    signup: "Зарегистрироваться",
    home: "Главная",
    create: "Создать",
    createProfile: "Создать профиль",
    createProfileError: "Профиль недоступен!",
    edit: "Редактировать",
    myAccount: "Мой аккаунт",
    sidebar: "Боковая панель",
    navbar: "Панель навигации",
    homeH2: "Теперь вам нужна только одна ссылка.",
    homeP:
      "Поделитесь большим количеством контента с вашими подписчиками одним кликом. Taqdim упрощает доступ ко всем вашим ресурсам в одном месте.",
    homeButton: "Использовать Taqdim бесплатно",
    homeP2: "Люди зарегистрировались на этой неделе!",
    signupP: "Уже есть аккаунт?",
    signupError: "Пользователь существует!",
    loginError: "Электронная почта или пароль неверны!",
    loginP: "Нет аккаунта?",
    preview: "Просмотр",
    NoImage: "Изображение отсутствует!",
    loading: "Загрузка...",
    qrCode: "Скачать QR-код",
    // EDIT
    username: "Имя пользователя",
    fullname: "Полное имя",
    phonenumber: "Номер телефона",
    location: "Местоположение",
    about: "О себе",
    links: "Ссылки",
    delete: "Удалить",
    addlink: "Добавить ссылку",
    save: "Сохранить",
    createaccount: "Создать аккаунт",
    logout: "Выйти",
    createerror: "Ошибка: такое имя пользователя уже существует",
    profileimage: "Изображение профиля",
    User_not_found: "Пользователь не найден",
    Authentication_credentials_were_not_provided:
      "Данные для авторизации не предоставлены.",
  },
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const savedSidebarOpen = localStorage.getItem("sidebarOpen");
    return savedSidebarOpen !== null ? JSON.parse(savedSidebarOpen) : true;
  });

  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("uz"); // O'zbek tilini default qilib oling

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const handleOpen = () => setSidebarOpen((prevState) => !prevState);

  useEffect(() => {
    document.body.classList.add("light-mode");
  }, []);

  const t = translations[language]; // Foydalanuvchi tanlagan tilni olish
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  return (
    <BrowserRouter>
      <div className="App ">
        <div className="language-switcher flex justify-end mt-1 z-10 h-6">
          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle language menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Language Menu for Mobile */}
          {menuOpen && (
            <div className="absolute right-0 mt-20 flex flex-col shadow-lg rounded-md md:hidden bg-white">
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setLanguage("uz");
                  setMenuOpen(false); // Menyuni yopish
                }}
              >
                Uzb
              </button>
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setLanguage("en");
                  setMenuOpen(false); // Menyuni yopish
                }}
              >
                Eng
              </button>
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => {
                  setLanguage("ru");
                  setMenuOpen(false); // Menyuni yopish
                }}
              >
                Rus
              </button>
            </div>
          )}

          {/* Language Buttons for Desktop */}
          <div className="hidden md:flex space-x-2">
            <button
              className="px-3 text-xs py-0 text-white hover:bg-gray-200"
              onClick={() => setLanguage("uz")}
            >
              Uzb
            </button>
            <button
              className="px-3 text-xs py-0 text-white hover:bg-gray-200"
              onClick={() => setLanguage("en")}
            >
              Eng
            </button>
            <button
              className="px-3 text-xs py-0 text-white hover:bg-gray-200"
              onClick={() => setLanguage("ru")}
            >
              Rus
            </button>
          </div>
        </div>
        <Routes>
          {/* Routes without Sidebar and Navbar */}
          <Route path="/login" element={<Login t={t} />} />
          <Route path="/signup" element={<Signup t={t} />} />
          <Route path="/" element={<Home t={t} />} />
          <Route path="/create" element={<Create t={t} />} />

          {/* Dynamic UserPreview route */}
          <Route path="/:username" element={<UserPreview t={t} />} />

          {/* Routes with Sidebar and Navbar */}
          <Route
            path="*"
            element={
              <div id="main-content">
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setUsername={setUsername}
                  t={t}
                />
                <div id="content">
                  <Navbar handleOpen={handleOpen} username={username} t={t} />
                  <Routes>
                    <Route path="/" element={<Preview t={t} />} />
                    <Route
                      path="/preview/:username"
                      element={<Preview setUsername={setUsername} t={t} />}
                    />
                    <Route
                      path="/edit/:username"
                      element={<Edit setUsername={setUsername} t={t} />}
                    />
                    <Route path="/myaccount" element={<MyAccount t={t} />} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
