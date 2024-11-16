import * as React from 'react';
import { render } from 'react-dom';
import style from './style.module.scss';
import sun from './sun.png'; 
import Button from 'components/Button/Button';
import "regenerator-runtime"

render(
  <div className={style.title}>
    React приложение 5
    <div
      className={style.picture}
      style={{ backgroundImage: `url(${sun})` }} // Используем импортированное изображение
    ></div>
    <Button object={null}>Click</Button>
  </div>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
