import React, { useState } from 'react';
import styles from './ProfilePage.module.scss'; // Путь к вашему стилю
import Button from 'components/Button';

const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  // Обработчик загрузки картинки
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Обработчик сохранения данных профиля
  const handleSaveProfile = () => {
    if (!email || !fullName) {
      alert('Please fill in all fields.');
      return;
    }
  };

  return (
    <main id="main" className="page">
      <div className="page__main-block">

        <div className={styles.profile__content}>
          <div className={styles.profile__details}>
          <div className={styles.profile__image}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        id="uploadImage"
        className={styles.uploadInput}
        style={{ display: 'none' }}  // Скрыть input
      />
      <label htmlFor="uploadImage" className={styles.uploadLabel}>
        <div className={styles.profileImageWrapper}>
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.defaultImage}>Upload Image</div>
          )}
          <div className={styles.overlay}>
            <span className={styles.updateText}>Update Image</span>
          </div>
        </div>
      </label>
    </div>

            {/* Правая сторона с данными пользователя */}
            <div className={styles.profile__info}>
              <div className={styles.profile__infoItem}>
                <label htmlFor="email" className={styles.profileLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.profileInput}
                />
                {!email && <span className={styles.errorText}>Email is required</span>}
              </div>

              <div className={styles.profile__infoItem}>
                <label htmlFor="fullName" className={styles.profileLabel}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={styles.profileInput}
                />
                {!fullName && <span className={styles.errorText}>Full Name is required</span>}
              </div>

              {/* Кнопка Сохранить */}
              <div className={styles.profile__button}>
                <Button
                  type="button"
                  className={styles.saveButton}
                  onClick={handleSaveProfile}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>

         
        </div>

      </div>
    </main>
  );
};

export default ProfilePage;
