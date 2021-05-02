import React, { useContext, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { THEME } from '../theme'
import { AppCard } from '../components/UI/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppButton } from '../components/UI/AppButton'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { TodoContext } from '../context/todoContext/todoContext'
import { ScreenContext } from '../context/screenContext/screenContext'

export const TodoScreen = () => {

  const { todos, updateTodo, removeTodo } = useContext(TodoContext)
  const { todoId, changeScreen } = useContext(ScreenContext)

  const [modal, setModal] = useState(false)

  const todo = todos.find(t => t.id === todoId)

  const saveHandler = async title => {
    await updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal value={todo.title}
                 visible={modal}
                 onCancel={() => setModal(false)} onSave={saveHandler}/>
      <AppCard styles={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => {setModal(true)}}>
          <FontAwesome name={'edit'} size={20}/>
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
            <AntDesign name={'back'} size={20} color={'#fff'}/>
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={() => {removeTodo(todo.id)}}>
            <FontAwesome name={'remove'} size={20} color={'#fff'}/>
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
})
