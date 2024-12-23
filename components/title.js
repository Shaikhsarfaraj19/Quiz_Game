import React from 'react';
import {StyleSheet, Text, View} from "react-native";

function Title() {
    return (
        <View>
            <Text style={styles.title}>Quiz Game</Text>
        </View>
    );
}

export default Title;

const styles = StyleSheet.create({
    title:{
        fontSize:40,
        fontWeight:600,
        marginVertical:50,
    },
});