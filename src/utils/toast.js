import Toast from 'react-native-root-toast';
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
        let color = COLOR_INFO;
        switch (type) {
            case 'success':
                color = COLOR_SUCCESS;
                break;
            case 'warning':
                color = COLOR_WARNING;
                break;
            default:
                break;
        }
        const toast = Toast.show(messsage, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            backgroundColor: color,
            textColor: 'white',
            shadow: true,
            animation: true,
            hideOnPress: true,
        });
        setTimeout(function () {
            Toast.hide(toast);
        }, 1000);
    }
}

export default ToastAction;
