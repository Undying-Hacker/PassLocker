import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { Text, Input } from 'galio-framework';
import * as firebase from 'firebase';

export default ({ route, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(err => console.log(err.message));
    }
    return (
        <View style={styles.container}>
            <View style={{ ...StyleSheet.absoluteFill }}>
                <Image
                    preserveAspectRatio
                    source={require('../assets/bg.jpeg')}
                    style={{ flex: 1, width: null, height: null }}
                />
            </View>
            <Text style={styles.title} h1 color='white'>BE WILD</Text>
            <View style={styles.inputBox}>
                <Text color='white' p style={{ textAlign: 'center' }}>
                    Email
                </Text>
                <Input autoCapitalize='none' color='#FFF' style={{ borderColor: '#fff', width: '100%', backgroundColor: 'transparent' }} email rounded />
            </View>
            <View style={styles.inputBox}>
                <Text color='white' style={{ textAlign: 'center' }} p>
                    Password
                </Text>
                <Input autoCapitalize='none' color='#FFF' style={{ borderColor: '#fff', width: '100%', backgroundColor: 'transparent' }} password viewPass rounded />
            </View>
            <TouchableOpacity style={{width: '100%', alignItems: 'center', elevation: 5}} onPress={() => navigation.navigate('Main')}>
                <Text style={styles.lgBtn}>
                    Sign In
                </Text>
            </TouchableOpacity>

            <View style={styles.actionBox}>
                <Text style={{ color: '#fff', marginRight: 16, marginTop: 20 }}>
                    Forgot Password?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#fff', marginRight: 16, marginTop: 20 }}>
                        Don't have an account? Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'monospace',
        color: '#fdcb6e'
    },
    lgBtn: {
        paddingVertical: 12,
        width: '80%',
        textAlign: 'center',
        backgroundColor: '#fff',
        color: '#2d3436',
        borderRadius: 35,
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
    }
    ,
    inputBox: {
        marginTop: 10,
        width: '80%',
    },
    actionBox: {
        width: '80%',
        color: 'white',
        display: 'flex',
        flexDirection: 'row'
    }
});