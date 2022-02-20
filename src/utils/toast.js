import Toast from 'react-native-root-toast';
import { COLOR_INFO, COLOR_WARNING, COLOR_SUCCESS } from './color';

class ToastAction {
    static BOTTOM = Toast.positions.BOTTOM;
    static TOP = Toast.positions.TOP;
    static CENTER = Toast.positions.CENTER;

    static success(message, position = Toast.positions.BOTTOM) {
        this.show('success', message, position);
    }

    static info(message, position = Toast.positions.BOTTOM) {
        this.show('info', message, position);
    }

    static warning(message, position = Toast.positions.BOTTOM) {
        this.show('warning', message, position);
    }

    static show(type, messsage, position) {
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
        console.log('position', position);
        const toast = Toast.show(messsage, {
            duration: Toast.durations.LONG,
            position: position,
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
