import React, { useState } from 'react';
import { View, Image, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { useUser } from '../context/UserContext';

const HomeScreen = ({ navigation }) => {
    const [startAnime] = useState(new Animated.Value(0));
    const user = useUser()[0];
    const { width, height } = Dimensions.get('window');
    const _renderItem = ({ item, index }) => (
        <>
            <View style={{ ...styles.card, width: width - 48 }}>
                <View style={StyleSheet.absoluteFill}>
                    <Image style={{ flex: 1, borderRadius: 10, height: null, width: null }} source={item.imgSrc} />
                </View>
            </View>
            <Text style={styles.adsTxt}>{item.text}</Text>
        </>
    );
    return (
        <>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: user.theme === 'light' ? '#fff' : 'rgb(18, 18, 18)' }}>
                <Text style={{ ...styles.title, color: user.theme === 'light' ? '#000' : 'rgb(245, 246, 250)' }}>Home</Text>
                <Text style={{...styles.brand, color: user.theme === 'light'? '#000': '#ecf0f1'}}>Pass Locker<Feather name='shield' color={user.theme === 'light'? '#000': '#ecf0f1'} size={36} /></Text>
                <Text style={{...styles.moto, color: user.theme === 'light'? '#000': '#ecf0f1'}}>Unlock the impossible</Text>
                <View style={{ height: 350, marginBottom: 50 }}>
                    <Carousel data={[
                        { text: 'Safely save and store your data locally or sync them across devices', imgSrc: require('../assets/blocks.png') },
                        { text: 'Customize the look and feel of this app to your preference', imgSrc: require('../assets/customize.png') },
                        { text: 'Love this app? Give the creator a thumb up!', imgSrc: require('../assets/like.png') }]}
                        renderItem={_renderItem}
                        sliderWidth={width}
                        autoplay
                        loop
                        firstItem={1}
                        shouldOptimizeUpdates
                        itemWidth={width * 0.9} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Passwords')} style={{
                    padding: 24,
                    width: 300,
                    borderWidth: user.theme === 'light'? 0: 1,
                    borderColor: '#ecf0f1',
                    borderRadius: 30,
                    elevation: 3,
                    backgroundColor: user.theme === 'light'? '#fff': 'transparent',
                }}>
                    <Text style={{...styles.callToAction, color: user.theme === 'light'? '#636e72': '#ecf0f1'}}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute"
    },
    brand: {
        fontFamily: 'monospace',
        fontWeight: 'bold',
        marginTop: 40,
        fontSize: 42,
        marginLeft: 24,
        alignSelf: 'flex-start',
        color: '#FFF',
        textAlign: 'left'
    },
    moto: {
        marginTop: 12,
        fontFamily: 'monospace',
        fontSize: 18,
        marginLeft: 24,
        alignSelf: 'flex-start',
        color: '#FFF',
    },
    btn: {
        padding: 20,
        width: 300,
        borderRadius: 35,
        backgroundColor: '#fff',
        elevation: 5,
        marginTop: 24
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
        color: 'rgba(45, 52, 54,1.0)'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 64,
        marginLeft: 24
    },
    card: {
        height: 250,
        borderRadius: 10,
        marginVertical: 16,
        justifyContent: 'flex-end'
    },
    adsTxt: {
        fontWeight: 'bold',
        color: '#636e72',
        fontSize: 14,
        fontFamily: 'monospace',
        paddingHorizontal: 24,
        width: '100%',
        textAlign: 'center'
    },
    callToAction: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default HomeScreen;