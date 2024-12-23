import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

function Quiz({ navigation }) {
    const [question, setQuestion] = useState();
    const [ques, setQues] = useState(0);
    const [option, setOption] = useState([]);
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        setIsLoading(true);
        const url = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
        const res = await fetch(url);
        const data = await res.json();
        setQuestion(data.results);
        setOption(generateOptionsAndShuffle(data.results[0]));
        setIsLoading(false);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    const handleOnPressNext = () => {
        setQues(ques + 1);
        setOption(generateOptionsAndShuffle(question[ques + 1]));
    };

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [..._question.incorrect_answers];
        options.push(_question.correct_answer);
        shuffleArray(options);
        return options;
    };

    const handleSelectedOption = (_option) => {
        if (_option === question[ques].correct_answer) {
            setScore(score + 10);
        }
        if (ques !== 9) {
            handleOnPressNext();
        }
        if (ques === 9) {
            navigation.navigate("Result", {
                score: score
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>LOADING...</Text>
                </View>
            ) : question && (
                <ImageBackground source={{ uri: 'https://your-image-link-here.jpg' }} style={styles.backgroundImage}>
                    <View style={styles.quizContainer}>
                        <View style={styles.top}>
                            <Text style={styles.que}>Q. {decodeURIComponent(question[ques].question)}</Text>
                        </View>

                        <View style={styles.options}>
                            {option.map((opt, index) => (
                                <TouchableOpacity key={index} style={styles.optionWrapper} onPress={() => handleSelectedOption(opt)}>
                                    <Text style={styles.opt}>{decodeURIComponent(opt)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.bottom}>
                            {ques !== 9 ? (
                                <TouchableOpacity onPress={handleOnPressNext} style={styles.button}>
                                    <Text style={styles.buttonText}>Next Question</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Result", {
                                        score: score
                                    });
                                }} style={styles.button}>
                                    <Text style={styles.buttonText}>See Results</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ImageBackground>
            )}
            <StatusBar style="auto" />
        </View>
    );
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        padding: 30,
    },
    top: {
        marginBottom: 20,
    },
    que: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    options: {
        flex: 1,
        justifyContent: 'center',
    },
    optionWrapper: {
        paddingVertical: 15,
        backgroundColor: '#1abc9c',
        marginVertical: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    opt: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },
    bottom: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    buttonText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
});
