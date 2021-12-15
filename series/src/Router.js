import { createAppContainer, createStackNavigator } from "react-navigation";
import LoginScreen from "./pages/LoginScreen";
import NewSerieScreen from "./pages/NewSerieScreen";
import SerieDetailScreen from "./pages/SerieDetailScreen";
import SeriesScreen from "./pages/SeriesScreen";


const AppNavigator = createStackNavigator({
  'Login': {
    screen: LoginScreen,
    navigationOptions: {
      title: "Bem vindo"
    }
  },
  'NewSerieScreen': {
    screen: NewSerieScreen,
    navigationOptions: ({navigation}) => {
      if(navigation.state.params && navigation.state.params.serieToEdit){
        return {
          title: navigation.state.params.serieToEdit.title
        }
      }
      return {
        title: "Nova série"
      }
    }
  },
  'Main': {
    screen: SeriesScreen
  },
  'SerieDetail': {
    screen: SerieDetailScreen,
    navigationOptions: ({navigation}) => {
      const {serie} = navigation.state.params;
      return {
        title: serie.title
      }
    }
  },
}, {
  defaultNavigationOptions: {
    title: "Minhas Séries",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#003994',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
