import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { MainLayout } from './src/components/MainLayout'
import { TodoState } from './src/context/todoContext/TodoState'
import { ScreenState } from './src/context/screenContext/ScreenState'

const loadApplication = async () => {
  await Font.loadAsync({
    'roboto-regular': require('./assets/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/Roboto-Bold.ttf')
  })
}

const App = () => {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return <AppLoading startAsync={loadApplication}
                       onError={err => console.log(err)}
                       onFinish={() => setIsReady(true)}/>
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout/>
      </TodoState>
    </ScreenState>
  )
}

export default App
