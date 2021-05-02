import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import { THEME } from '../theme'
import {AntDesign} from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {

  const [value, setValue] = useState('')

  const onPressHandler = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
      return
    }
    Alert.alert('Название дела не может быть пустым!')
  }
  return (
    <View style={styles.block}>
      <TextInput style={styles.input}
                 value={value}
                 onChangeText={setValue}
                 placeholder='Введите название дела'
                 autoCorrect={false}
                 autoCapitalize={'none'}/>
      <AntDesign.Button onPress={onPressHandler} name={'pluscircleo'}>
        Add
      </AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
    padding: 5
  }
})
