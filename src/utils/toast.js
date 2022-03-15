import Toast from 'react-native-toast-message';
import { COLOR_INFO, COLOR_WARNING, COLOR_SUCCESS } from './color';

class ToastAction {
    static success(message) {
        this.show('success', message);
    }

    static info(message) {
        this.show('info', message);
    }

    static warning(message) {
        this.show('warning', message);
    }

    static show(type, messsage) {
        Toast.show({
            type: 'success',
            text1: messsage,
            // text2: 'This is some something 👋'
        });
    }
}

export default ToastAction;
