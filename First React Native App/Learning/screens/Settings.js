import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Dimensions, Text, View, Switch, Picker } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

//Actions
import { setTheme, setLanguage, setSearchMode } from '../actions/userActions';

export default function Passwords({ navigation }) {
    const [user, userDispatch] = useUser();
    const { width } = Dimensions.get('window');

    //Theme
    const [colorAnime] = useState(new Animated.Value(user.theme === 'light' ? 0 : 1));
    const textColor = user.theme === 'light' ? '#000' : '#ecf0f1'
    const backgroundColor = colorAnime.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(245, 246, 250)', 'rgb(18, 18, 18)']
    });

    return (
        <Animated.View style={{
            ...styles.container,
            backgroundColor
        }}>
            <View style={styles.header}>
                <Text style={{ ...styles.title, marginLeft: width * 0.01, color: textColor }}>Settings</Text>
            </View>
            <View style={styles.userInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar containerStyle={{ borderColor: 'tomato', borderWidth: 3, marginRight: 8 }} size={80} rounded source={{ uri: 'https://phunugioi.com/wp-content/uploads/2019/12/anh-avatar-lam-dai-dien-Faceook-dep.jpg' }} />
                    <View style={styles.userName}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: textColor }}>Kapil Mohan</Text>
                        <Text style={{ color: '#636e72' }}>mohankpil@gmail.com</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <AntDesign name='right' size={28} color='#636e72' />
                </TouchableOpacity>
            </View>
            <View style={{ ...styles.settings, paddingVertical: 32 }}>
                <View style={styles.optionBar}>
                    <View style={{ ...styles.icon, backgroundColor: '#2c3e50' }}>
                        <Entypo name='moon' size={32} color='#fdcb6e' />
                    </View>
                    <Text style={{ ...styles.optionTxt, color: textColor }}>Dark mode</Text>
                    <Switch style={{ marginLeft: 'auto' }} value={user.theme === 'dark'} onValueChange={() => {
                        setTheme(userDispatch, user.theme === 'light' ? 'dark' : 'light');
                        if (user.theme === 'light') {
                            Animated.timing(
                                colorAnime, {
                                toValue: 1,
                                duration: 300
                            }
                            ).start()
                        }
                        else {
                            Animated.timing(
                                colorAnime, {
                                toValue: 0,
                                duration: 300
                            }
                            ).start()
                        }
                    }} />
                </View>
                <Text style={{ fontWeight: 'bold', color: '#636e72', marginVertical: 16 }}>Passwords</Text>
                <View style={styles.optionBar}>
                    <View style={{ ...styles.icon, backgroundColor: '#3498db' }}>
                        <AntDesign name='search1' size={32} color='#ecf0f1' />
                    </View>
                    <Text style={{ ...styles.optionTxt, color: textColor }}>Search by</Text>
                    <View style={{ marginLeft: 'auto' }}>
                        <TouchableOpacity onPress={() => {
                            setSearchMode(userDispatch, user.searchMode === 'Platform'? 'Email/Username': 'Platform')
                        }}>
                            <Text style={{ ...styles.TxtChooser, borderColor: textColor, color: textColor }}>{user.searchMode}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', color: '#636e72', marginVertical: 16 }}>Regional</Text>
                <View style={styles.optionBar}>
                    <View style={{ ...styles.icon, backgroundColor: '#6c5ce7' }}>
                        <FontAwesome name='language' size={32} color='#ecf0f1' />
                    </View>
                    <Text style={{ ...styles.optionTxt, color: textColor }}>Language</Text>
                    <View style={{ marginLeft: 'auto' }}>
                        <TouchableOpacity onPress={() => {
                            setLanguage(userDispatch, user.language === 'English'? 'Tiếng Việt': 'English')
                        }}>
                            <Text style={{ ...styles.TxtChooser, borderColor: textColor, color: textColor }}>{user.language}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ ...styles.optionBar, marginTop: 16 }}>
                    <View style={{ ...styles.icon, backgroundColor: '#eb4d4b' }}>
                        <AntDesign name='logout' size={32} color='#ecf0f1' />
                    </View>
                    <Text style={{ ...styles.optionTxt, color: textColor }}>Log Out</Text>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        paddingTop: 64,
        padding: 16
    },
    userInfo: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    settings: {
        width: '90%',
    },
    icon: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22.5,
        marginRight: 16
    },
    optionBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionTxt: {
        fontWeight: 'bold',
        fontSize: 14
    },
    TxtChooser: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 50,
        fontWeight: 'bold'
    }
})
