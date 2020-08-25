import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import NewsView from "./src/View/NewsView";
import newsReducer from "./src/Reducers/newsReducer";
import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createSagaMiddleware from "redux-saga";
import mySaga from "./src/js/sagas";

const sagaMiddleWare = createSagaMiddleware();

const Stack = createStackNavigator();

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, newsReducer);

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleWare));
let persistor = persistStore(store);
sagaMiddleWare.run(mySaga);

export default function App({ navigation }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="News" component={NewsView} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
