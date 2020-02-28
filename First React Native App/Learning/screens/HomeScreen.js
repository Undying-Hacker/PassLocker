import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, Animated, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
    const [startAnime] = useState(new Animated.Value(0));
    const { width, height } = Dimensions.get('window');
    const screen = useRef();
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            startAnime.setValue(0);
        });

        return unsubscribe;
    })
    return (
            <Animated.View ref={screen} style={{
                ...styles.container, right: startAnime.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, width]
                })
            }}>
                <View style={{...StyleSheet.absoluteFill}}>
                    <Image style={{flex: 1, width: null, height: null}} source={require('../assets/homebg.jpg')} />
                </View>
                <LinearGradient style={{...StyleSheet.absoluteFill}} colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.6)']} start={{x: 0, y: 1}} end={{x: 1, y: 0}} /> 
                <Animated.Text style={{...styles.brand, marginLeft: width * 0.15}}>Pass Locker</Animated.Text>
                <View style={{ width: '70%' }}>
                    <Text style={styles.moto}>All your passwords in one secure place</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Passwords')} >
                    <Text style={styles.btnText}>Get Started</Text>
                </TouchableOpacity>
            </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "relative"
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
    }
});

export default HomeScreen;