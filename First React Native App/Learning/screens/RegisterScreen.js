import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default ({ navigation }) => {
    navigation.setOptions({
        title: 'FUCk Is ReAl',
        headerStyle: {
            backgroundColor: '#FE2472'
        }
    });
    useFocusEffect(() => {
        console.log('Focusing Register Screen');
        const unsubscribe = navigation.addListener('blur', () => console.log('Register Screen blurred'));
        return unsubscribe
    });
    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>
            <Button title='GO back to loading screen' onPress={() => navigation.navigate('Load')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});