import { StatusBar } from 'expo-status-bar';
import { DataProvider } from './src/context/dataContext';
import { Router } from './src/routes/router';


export default function App() {
  return (
    <DataProvider>
    <StatusBar style='light'/>
    <Router/>
    </DataProvider>
  );
}

