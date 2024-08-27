// TranslationProvider.js
import React, { createContext, useContext, useState } from "react";

// Tarjima matnlari uchun ob'ekt
const translations = {
  uz: {
    deleteP: "Hisobingizni rostanam o'chirmoqchimisiz?",
    deleteacc: "Profilni ochirish",
    passwordResetSuccess: "Parol o'zgartirildi!",
    verificationCode1: "Emailingizga yuborildi",
    verificationCode: "Tasdiqlash kodi",
    newPassword: "Yangi parol ",
    resetPassword: "Parolni tiklash",
    sendResetLink: "Qayta tiklash havolasini yuboring",
    passwordResetSent:
      "Parolni tiklash havolasi elektron pochtangizga yuborildi.",
    sending: "Yuborilmoqda...",
    toasterror: "Nimadir xato ketdi. Iltimos, qayta urinib koʻring.",

    Passwordd: "Parolingiz esdan chiqdimi?",
    forgotPassword: "Parolni tiklash",
    Profile: "Profil",
    userpreviewcopy: "URL vaqtinchalik xotiraga nusxalandi!",
    toastcomplate: "Ro'yxatdan muvaffaqiyatli o'tdingiz!",
    toastcomplate1: "Tizimga muvaffaqiyatli  kirdingiz.",
    toasterror: "Ro'yxatdan o'tishda xatolik yuz berdi.",
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
      "Bir marta bosish orqali do'stlaringiz bilan ko'proq baham ko'ring. Taqdim barcha hisoblaringizga bir joyda ulanishni osonlashtiradi.",
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
    createaccount: "Profil yaratish",
    logout: "Chiqish",
    createerror: "Xato: bunday foydalanuvchi nomi mavjud",
    profileimage: "Profil Rasmi",
    User_not_found: "Foydalanuvchi topilmadi",
    Authentication_credentials_were_not_provided:
      "Autentifikatsiya ma'lumotlari taqdim etilmagan.",
  },
  en: {
    deleteacc: "Delete profile",
    deleteP: "Hisobingizni rostanam o'chirmoqchimisiz?",
    passwordResetSuccess: "Password changed!",
    verificationCode1: "Sent to your email",
    verificationCode: "Confirmation code",
    newPassword: "New password ",
    resetPassword: "Reset Password",
    sendResetLink: "Send Reset Link",
    passwordResetSent: "Password reset link has been sent to your email.",
    sending: "Sending...",
    toasterror: "Something went wrong. Please try again.",

    forgotPassword: "Reset Password",
    Passwordd: "Forgot your password?",
    userpreviewcopy: "URL copied to clipboard!",
    Profile: "Profile",
    toasterror: "An error occurred during registration.",
    toastcomplate: "You have successfully registered!",
    toastcomplate1: "You have successfully logged in.",
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
    deleteacc: "Удалить профиль",
    deleteP: "Вы действительно хотите удалить свою учетную запись?",
    passwordResetSuccess: "Пароль изменен!",

    verificationCode1: "Отправлено на вашу электронную почту",
    verificationCode: "Код подтверждения",
    newPassword: "Новый пароль ",
    resetPassword: "Сбросить пароль",
    sendResetLink: "Отправить ссылку для сброса",
    passwordResetSent:
      "Ссылка для сброса пароля была отправлена ​​на вашу электронную почту.",
    sending: "Отправка...",
    toasterror: "Что-то пошло не так. Пожалуйста, попробуйте еще раз.",

    forgotPassword: "Сбросить пароль",
    Passwordd: "Забыли пароль?",
    Profile: "Профиль",
    userpreviewcopy: "URL-адрес скопирован в буфер обмена!",
    toastcomplate1: "Вы успешно вошли в систему.",
    toasterror: "Во время регистрации произошла ошибка.",
    toastcomplate: "Вы успешно зарегистрировались!",
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
const TranslationSwitcher = ({ language, setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  return (
    <div className="language-switcher flex justify-end mt-1 z-10 h-6">
      {/* Mobile Menu Icon */}
      <button
        className="md:hidden p-2 "
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
              setMenuOpen(false);
            }}
          >
            Uzb
          </button>
          <button
            className="px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setLanguage("en");
              setMenuOpen(false);
            }}
          >
            Eng
          </button>
          <button
            className="px-4 py-2 text-gray-700 hover:bg-gray-200"
            onClick={() => {
              setLanguage("ru");
              setMenuOpen(false);
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
  );
};

export { TranslationSwitcher, translations };
