// TranslationProvider.js
import React, { createContext, useContext, useState } from "react";

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

// Kontekst yaratish
const TranslationContext = createContext();

// TranslationProvider komponenti
export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("uz"); // Default til o'zbekcha

  const value = {
    t: translations[language],
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

// useTranslation hook
export const useTranslation = () => {
  return useContext(TranslationContext);
};
