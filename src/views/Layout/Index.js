import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from '../Home/Index';
import Publish from '../Publish/Index';
import Account from '../Account/Index';
import { AuthCheck } from '../../utils/action';

// { key: 'home', title: '我的库', icon: 'card-text-outline' },
// { key: 'publish', title: '发布', icon: 'plus-circle-outline' },
// { key: 'account', title: '我的', icon: 'account' },

const MyComponent = ({ navigation, route }) => {
    React.useEffect(() => {
        AuthCheck();
    }, []);
    const HomeRoute = () => <Home navigation={navigation} />;
    const PublishRoute = () => <Publish navigation={navigation} />;
    const AccountRoute = () => <Account navigation={navigation} />;
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: '我的库', icon: 'card-text-outline' },
        { key: 'publish', title: '发布', icon: 'plus-circle-outline' },
        { key: 'account', title: '我的', icon: 'account' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        publish: PublishRoute,
        account: AccountRoute,
    });

    return <BottomNavigation navigationState={{ index, routes }} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default MyComponent;
