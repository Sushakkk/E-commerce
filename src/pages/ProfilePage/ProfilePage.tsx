import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProfilePage.module.scss'; 
import Button from 'components/Button';
import { observer } from 'mobx-react-lite';
import rootStore from 'stores/RootStore/instance';


const ProfilePage: React.FC = observer(() => {


  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    const user = rootStore.AuthStore.user; 
    console.log(user)
    if (user) {
      setEmail(user.email || ''); 
      setFullName(user.fio || ''); 
      setProfilePicture(user.image || null); 
    }
  }, [rootStore.AuthStore.user]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSaveProfile = useCallback(() => {
    if (!email || !fullName) {
      alert('Please fill in all fields.');
      return;
    }
    rootStore.AuthStore.updateUserProfile(email, fullName, profilePicture ? profilePicture : '');
    alert('Profile updated successfully!');
  }, [email, fullName, profilePicture, rootStore.AuthStore]);

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
                style={{ display: 'none' }}
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
            <div className={styles.profile__info}>
              <div className={styles.profile__field}>
                <div className={styles.profile__infoItem}>
                <label htmlFor="email" className={styles.profileLabel}>
                  Email
                </label>
                <input
                  readOnly
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={styles.profileInput}
                />
                </div>
                {!email && <span className={styles.errorText}>Email is required</span>}
              </div>
              <div className={styles.profile__field}>
                <div className={styles.profile__infoItem}>
                <label htmlFor="fullName" className={styles.profileLabel}>
                  Fio
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your fio"
                  className={styles.profileInput}
                />
                </div>
                {!fullName && <span className={styles.errorText}>Fio is required</span>}
              </div>
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
});

export default ProfilePage;
