import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter"

import { Home } from './src/Screens/Home';

import { Background } from './src/components/Background';
import { Loanding } from './src/components/Loanding';

export default function App() {

  const [fontsLoader] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  })

  if(!fontsLoader) {

  }

  return (
    <Background >
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      { fontsLoader  ? <Home /> : <Loanding /> }

    </Background>
  )
};
