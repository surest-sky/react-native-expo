import Empty from '../../resource/images/empty.png';
import { View, Image } from 'react-native';

const EmptyComponent = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
            <Image source={Empty}></Image>
        </View>
    );
};

export default EmptyComponent;
