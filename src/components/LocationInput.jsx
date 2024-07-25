import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const LocationInput = ({ placeholder, onChangeText, value, focused, onFocus, onBlur, urlFocus, urlBlur }) => {
    return (
        <View style={[!focused && styles.containerBlur, focused && styles.containerFocus]}>
            <View style={styles.subcontainer}>
                <Image style={styles.icon} source={focused ? urlFocus : urlBlur} />
                <TextInput
                    style={[styles.input, !focused && styles.blurInput, focused && styles.focusedInput]}
                    placeholder={placeholder}
                    placeholderTextColor={'#faffff'}
                    onChangeText={onChangeText}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </View>
        </View>
    );
};

export default LocationInput;

const styles = StyleSheet.create({
    containerFocus: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00e5ff',
        borderRadius: 10
    },
    containerBlur: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#B7BDC9',
        borderRadius: 10
    },
    subcontainer: {
        width: '97%',
        height: '80%',
        backgroundColor: '#2D364A',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 0,
        gap: 10,
    },
    icon: {
        marginLeft: 10,
        width: 20,
        height: 20
    },
    input: {
        width: '85%',
        height: '100%',
        fontSize: 15,
    },
    blurInput: {
        color: '#B7BDC9',
    },
    focusedInput: {
        color: '#00e5ff'
    }
});
