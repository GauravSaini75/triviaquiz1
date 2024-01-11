import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { Button } from '../components';
import { styles } from '../theme/Style';
import data from '../helpers/data.json';
import { RootStackParamList } from '../route/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../theme/Colors';
import { TouchableOpacity } from 'react-native';

export type ObjectType = typeof data[0];

type Props = NativeStackScreenProps<RootStackParamList, 'QuizScreen'>
const QuizScreen = ({navigation}: Props): JSX.Element => {
    const [questions, setQuestions] = React.useState<ObjectType[]>(data);
	const [time, setTime] = React.useState<number>(45);
    const ref = React.useRef<FlatList>(null);
    const [start, setStart] = React.useState(0);
    const [showReasult, setShowReasult] = React.useState(false)

	React.useEffect(() => {
        let timer: NodeJS.Timeout;
    
        if (time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            onPressNext(start + 1)
        }
    
        return () => {
            clearInterval(timer);
        };
	}, [time]);

  
	const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
	};

    const onPressOption = (index: number, value: string) => {
        let arr = [...questions];
        arr[index].selected = value;
        setQuestions(arr);
    }
  
	const onPressNext = (num: number) => {
        console.log(start > 9)
        if(num > 9) {
            setShowReasult(true)
        } else {
            setTime(45);
            ref.current?.scrollToIndex({animated: true, index: num})
            setStart(num)
        }
	};

    let correct = questions.filter(item => item.selected === item.correctAnswer).length;

    const onGoBack = () => {
        setQuestions(data);
        setTimeout(() => {
            navigation.goBack();
        }, 400);
    }

    const _renderItem = ({item, index}: { item: ObjectType; index: number}) => {
        return <>
            <View style={{ flex: 1, width: Dimensions.get('window').width, paddingHorizontal: 16  }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: colors.black }}>{`Q.${index + 1}.) ` + item?.question?.text}</Text>
                {item?.allAnswers.map((el: string, i: number) => {
                    let selected = item.selected  == el
                    return (
                        <TouchableOpacity key={i} onPress={() => onPressOption(index, el)} >
                            <Text style={{ fontSize: 16, fontWeight: '400', color: selected ? colors.primary : colors.black, marginTop: 6 }}>{`(${i + 1}) ` + el}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    }

    return (
        <View style={[styles.container]}>
            {!showReasult ?
                <>
                    <View style={{ paddingTop:16, paddingHorizontal: 16, alignItems: 'flex-end' }}>
                        <Text style={{ color: colors.primary , fontWeight:'500', fontSize: 16 }}>{formatTime(time)}</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        ref={ref}
                        scrollEnabled={false}
                        horizontal
                        data={questions}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={_renderItem}
                        extraData={questions}
                    />
                    <View style={{ padding: 16 }}>
                        <Button label='Next' onPress={() => onPressNext(start + 1)} />
                    </View>
                </>
                :
                <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Correct: {correct}</Text>
                    <Text>Score: {correct*10}/{questions.length*10}</Text>
                    <Button label='Go Back' onPress={() => onGoBack()} style={{ marginTop: 20 }} />
                </View>
            }
        </View>
    )
}

export { QuizScreen }