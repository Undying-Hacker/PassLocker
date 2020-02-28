import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useUser } from '../context/UserContext';

const HomeScreen = ({ navigation }) => {
    const [startAnime] = useState(new Animated.Value(0));
    const user = useUser()[0];
    const { width, height } = Dimensions.get('window');
    return (
        <>
            <Animated.View style={{
                ...styles.container,
                bottom: startAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, height]
                })
            }}>
                <View style={{ ...StyleSheet.absoluteFill }}>
                    <Image style={{ flex: 1, width: null, height: null }} source={require('../assets/homebg.jpg')} />
                </View>
                <LinearGradient style={{ ...StyleSheet.absoluteFill }} colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.6)']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} />
                <Animated.Text style={{ ...styles.brand, marginLeft: width * 0.15 }}>Pass Locker</Animated.Text>
                <View style={{ width: '70%' }}>
                    <Text style={styles.moto}>All your passwords in one secure place</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    Animated.timing(
                        startAnime, {
                        toValue: 1,
                        duration: 500
                    }
                    ).start();
                }} >
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </Animated.View>
            <View style={{flex: 1, alignItems: 'center', backgroundColor: user.theme === 'light'? '#fff': 'rgb(18, 18, 18)'}}>
                <Text style={{...styles.title, color: user.theme === 'light'? '#000': 'rgb(245, 246, 250)'}}>Home</Text>
                <View style={{...styles.card, width:  width - 48}}>
                    <View style={StyleSheet.absoluteFill}>
                        <Image style={{flex: 1, borderRadius: 10, height: null, width: null}} source={require('../assets/blocks.png')} />
                    </View>
                </View>
                <Text style={styles.adsTxt}>Safely store your accounts and password locally or sync them across devices</Text>
                <View style={{...styles.card, width: width - 48}}>
                    <View style={StyleSheet.absoluteFill}>
                        <Image style={{flex: 1, borderRadius: 10, height: null, width: null}} source={require('../assets/customize.png')} />
                    </View>
                </View>
                <Text style={styles.adsTxt}>Customize the appearance and language of your preference</Text>
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
        marginTop: 60,
        fontSize: 64,
        color: '#FFF',
    },
    moto: {
        marginTop: 12,
        fontFamily: 'monospace',
        fontSize: 24,
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
        height: 200,
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
        width: '90%',
        textAlign: 'center'
    }
});

export default HomeScreen;