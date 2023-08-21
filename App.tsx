import { NativeBaseProvider } from 'native-base';

import { Root } from '@/components/RootComponent';

export default function App() {
  return (
    <NativeBaseProvider>
      <Root />
    </NativeBaseProvider>
  );
}
