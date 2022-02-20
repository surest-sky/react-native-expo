import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade, ShineOverlay } from 'rn-placeholder';
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const PlaceHolderItem = () => {
    return (
        <View>
            <Placeholder styles={{ marginTop: 20 }}>
                <PlaceholderLine width={width} />
                <PlaceholderLine />
                <PlaceholderLine width={width} />
            </Placeholder>
            <Placeholder styles={{ marginTop: 20 }}>
                <PlaceholderLine width={width} />
                <PlaceholderLine />
                <PlaceholderLine width={width} />
            </Placeholder>
        </View>
    );
};

export default PlaceHolderItem;
