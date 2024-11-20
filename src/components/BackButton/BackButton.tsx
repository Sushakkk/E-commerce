import PaginationIcon from "components/PaginationIcon";
import { useNavigate } from "react-router-dom";
import Text from 'components/Text/Text';
import styles from './BackButton.module.scss';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.button__container}>
          <div className={styles.button__back} onClick={() => navigate(-1)}>
            <PaginationIcon />
            <Text view="p-20">Назад</Text>
          </div>
        </div>
    );
};

export default BackButton;