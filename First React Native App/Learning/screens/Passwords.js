import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Modal, Text } from 'react-native';
import { validateAccount } from '../util/validators';
import { Input } from 'galio-framework';
import { addPassword, editPassword, deletePassword } from '../actions/passwordActions';
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import { useUser } from '../context/UserContext';
import { Button } from 'react-native-elements';
import { cardColors } from '../Constants/colors';
import { usePassword } from '../context/PasswordContext';
import Card from '../components/Card.component';
import { FlatList } from 'react-native-gesture-handler';

export default function Passwords({ navigation }) {
    //Hooks
    const [search, setSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [passwords, passwordDispatch] = usePassword();
    const user = useUser()[0];
    //Modal Values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEdit, setIsEdit] = useState(0);
    const [platform, setPlatform] = useState('');
    const [errors, setErrors] = useState([]);
    const [focused, setFocused] = useState(false);

    //Animated
    const { width, height } = Dimensions.get('window');

    //Helper Functions
    const clearModal = () => {
        setModalVisible(false);
        setEmail('');
        setPassword('');
        setPlatform('');
    }
    const handleEdit = (item, index) => {
        setEmail(item.email);
        setPassword(item.password);
        setPlatform(item.platform);
        setModalVisible(true);
        setIsEdit(index);
    }
    const handleDelete = (index) => {
        deletePassword(passwordDispatch, index);
    }

    const handleAddPassword = () => {
        const item = { email, password, platform };
        const result = validateAccount(item);
        if (!result.valid) setErrors(result.errors);
        else {
            setErrors([]);
            if (typeof isEdit === 'number') {
                editPassword(passwordDispatch, isEdit, item)
                setIsEdit(false);
            }
            else addPassword(passwordDispatch, item);
            clearModal();
        }
    }

    return (
        <View style={{...styles.container, backgroundColor: user.theme === 'light'? 'rgb(245, 246, 250)': 'rgb(18, 18, 18)'}}>
            <SearchBar
                placeholder={`Search by ${user.searchMode.toLowerCase()}...`}
                value={search}
                lightTheme={user.theme === 'light'}
                onChangeText={setSearch}
                containerStyle={{ width: width, paddingTop: width / 10, backgroundColor: user.theme === 'light'? 'rgba(255, 255, 255, 0.8)':'rgba(24, 24, 24, 0.6)' }}
            />
            <View style={{ flex: 1 }}>
                <FlatList data={!search? passwords: passwords.filter(item => {return user.searchMode === 'Platform'? item.platform.match(new RegExp(search, 'gi')): item.email.match(new RegExp(search, 'gi'))})} style={styles.pwContainer} keyExtractor={item => item.email} renderItem={({ item, index }) => <Card data={item} edit={() => handleEdit(item, index)} color={cardColors[index % cardColors.length]} deleteItem={() => handleDelete(index)} delay={50 * index} />} />
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                <AntDesign name='plus' color='#fff' size={32} />
            </TouchableOpacity>
            <Modal
                animationType='slide'
                presentationStyle='formSheet'
                backgroundColor={user.theme === 'light'? 'rgb(245, 246, 250)': 'rgb(18, 18, 18)'}
                visible={modalVisible}
                onRequestClose={() => {
                    clearModal();
                    setErrors([]);
                    if (isEdit) setIsEdit(false);
                }}>
                <View style={{...styles.modal, backgroundColor: user.theme === 'light'? 'rgb(245, 246, 250)': 'rgb(18, 18, 18)'}}>
                    {errors.length > 0 &&
                        <View style={styles.error}>
                            {errors.map((error, i) => <Text key={i} style={styles.errorTxt}>{error}</Text>)}
                        </View>}
                    <Input
                        style={{ width: '80%', height: 60, borderWidth: 1, borderColor: focused === 0 ? '#3498db' : 'gray', backgroundColor: user.theme === 'light'? 'rgb(245, 246, 250)': 'rgba(24, 24, 24, 0.6)' }}
                        placeholder="Email/Username"
                        right
                        placeholderTextColor={user.theme === 'light'? 'rgba(0, 0, 0, 0.8)': 'rgba(236, 240, 241, 0.8)'}
                        icon="email"
                        autoCapitalize='none'
                        autoFocus
                        onFocus={() => setFocused(0)}
                        value={email}
                        onChangeText={setEmail}
                        family="MaterialIcons"
                        iconSize={28}
                        iconColor={focused === 0 ? '#3498db' : 'gray'}
                    />
                    <Input
                        right
                        icon="key"
                        autoCapitalize='none'
                        value={password}
                        placeholderTextColor={user.theme === 'light'? 'rgba(0, 0, 0, 0.8)': 'rgba(236, 240, 241, 0.8)'}
                        onFocus={() => setFocused(1)}
                        onChangeText={setPassword}
                        family="antdesign"
                        iconSize={28}
                        iconColor={focused === 1 ? '#3498db' : 'gray'}
                        style={{ width: '80%', height: 60, borderWidth: 1, borderColor: focused === 1 ? '#3498db' : 'gray', backgroundColor: user.theme === 'light'? 'rgb(245, 246, 250)': 'rgba(24, 24, 24, 0.6)' }} placeholder="Password/Key" />
                    <Input
                        right
                        icon="apps"
                        value={platform}
                        placeholderTextColor={user.theme === 'light'? 'rgba(0, 0, 0, 0.8)': 'rgba(236, 240, 241, 0.8)'}
                        onFocus={() => setFocused(2)}
                        onChangeText={setPlatform}
                        family="MaterialCommunityIcons"
                        iconSize={28}
                        iconColor={focused === 2 ? '#3498db' : 'gray'}
                        style={{ width: '80%', height: 60, borderWidth: 1, borderColor: focused === 2 ? '#3498db' : 'gray', backgroundColor: user.theme === 'light'? 'rgb(245, 246, 250)': 'rgba(24, 24, 24, 0.6)' }} placeholder="Platform/App" />
                    <View style={styles.modalBtnContainer}>
                        <Button buttonStyle={{ ...styles.modalBtn, backgroundColor: '#c23616' }} onPress={() => {
                            clearModal();
                            setErrors([]);
                            if (isEdit) setIsEdit(false);
                        }} title='Cancel' />
                        <Button buttonStyle={styles.modalBtn} title='Save' onPress={handleAddPassword} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtn: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBtnContainer: {
        flexDirection: 'row',
    },
    modalBtn: {
        width: 120,
        height: 60,
        margin: 16,
        borderRadius: 8
    },
    error: {
        padding: 16,
        marginBottom: 24,
        backgroundColor: '#ff7979',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c0392b'
    },
    errorTxt: {
        fontSize: 14,
        color: '#c0392b',
        fontWeight: 'bold'
    }
})