import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todoContext/todoContext'
import { ScreenContext } from '../context/screenContext/screenContext'
import { AppLoader } from '../components/UI/AppLoader'
import { AppText } from '../components/UI/AppText'
import { AppButton } from '../components/UI/AppButton'

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext)
  const { changeScreen } = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      // calculate display's width
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }
    // as soon as display's wide will be changed, addEventListener will be called.
    Dimensions.addEventListener('change', update)
    // use callback function to remove addEventListener
    return () => Dimensions.removeEventListener('change', update)
  })

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (<Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>)}
                data={todos}/>
    </View>
  )

  if (todos.length === 0) {
    content = (<View style={styles.imgWrap}>
      <Image style={styles.image} source={require('../../assets/noItems.png')}/>
    </View>)
  }

  if (loading) {
    return <AppLoader/>
  }

  if(error){
    return  <View style={styles.center}>
      <AppText style={styles.error}>{error}</AppText>
      <AppButton onPress={loadTodos}>Try again</AppButton>
    </View>
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  center:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error:{
    fontSize: 20,
    color: THEME.DANGER_COLOR
  }
})
