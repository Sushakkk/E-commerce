import PaginationIcon from "components/PaginationIcon";
import { useNavigate } from "react-router-dom";
import Text from 'components/Text/Text';
import styles from './BackButton.module.scss';

const BackButton = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-3);
        window.scrollTo(0, 0); 
    };

    return (
        <div className={styles.button__container}>
            <div className={styles.button__back} onClick={handleBackClick}>
                <PaginationIcon />
                <Text view="p-20">Назад</Text>
            </div>
        </div>
    );
};

export default BackButton;
