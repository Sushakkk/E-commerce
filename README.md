# 🛒 E-commerce Web App

Современное e-commerce веб-приложение, разработанное с использованием **React**, **MobX**, **Vite/Webpack**, **CSS Modules** и других инструментов. Поддерживает адаптивный интерфейс, офлайн-доступ через PWA и интерактивный функционал, включая бонусную механику при заказе.

## 🔗 Приложение

👉 [Открыть демо](https://sushakkk.github.io/E-commerce)

## 🔧 Стек технологий

- **Frontend:** React, MobX, React Router
- **Сборка:** Vite → Webpack + Babel
- **Стилизация:** CSS Modules
- **Хранилище:** MobX stores
- **Интеграции:** Email.js
- **PWA:** Установка как приложение
- **Кроссбраузерность:** BrowserStack

## 🚀 Возможности

- Адаптивный дизайн
- Авторизация и регистрация
- Личный кабинет с редактированием профиля
- Работа с корзиной и локальным хранилищем
- Управление товарами: фильтрация, поиск, пагинация
- Система бонусов и скидок при покупке
- Email-уведомление о заказе
- Интеграция с API

## 🏗️ Структура MobX-сторов

- **AuthStore** – управление данными пользователя, авторизация
- **BasketStore** – корзина с синхронизацией с LocalStorage
- **ProductsStore** – загрузка и обновление товаров
- **ProductDetailsStore** – детали конкретного товара
- **FilterStore** – фильтрация и сортировка
- **QueryStore** – управление URL-параметрами

## 📸 Скриншоты

### 🏠 Главная страница
<img src="./screenshots/home.png" width="600"/>
<br/>
<img src="./screenshots/home_2.png" width="600"/>
<hr/>

### 🔐 Авторизация
<img src="./screenshots/login.png" width="500"/>
<hr/>

### 🛍️ Список товаров
<img src="./screenshots/products.png" width="600"/>
<hr/>

### 🧾 Детальная карточка товара
<img src="./screenshots/product_details.png" width="600"/>
<hr/>

### 👤 Личный кабинет
<img src="./screenshots/user.png" width="500"/>
<hr/>

### 🎁 Бонусная механика
<img src="./screenshots/fortune.png" width="500"/>
<br/>
<img src="./screenshots/bonus.png" width="500"/>
<br/>
<img src="./screenshots/discount.png" width="500"/>
<br/>
<img src="./screenshots/discount_2.png" width="500"/>
<hr/>

### 📧 Email-уведомление
<img src="./screenshots/email.png" width="500"/>
<hr/>

### 📘 Уведомления
<img src="./screenshots/notion.png" width="600"/>
<hr/>

## 📦 Установка

```bash
git clone https://github.com/Sushakkk/E-commerce.git
cd E-commerce
yarn install
yarn dev
````

## 🧪 Сборка продакшена

```bash
yarn build
```
