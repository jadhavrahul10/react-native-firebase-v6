import React from 'react';
import AppNavigator from './navigator/stack';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native'
import store from './Redux/Store';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
// import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
// import { persistCache } from 'apollo-cache-persist';
import { ApplicationProvider, IconRegistry, useTheme } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, light, dark } from '@eva-design/eva';
// import { default as dark } from './custom-theme.json'; // <-- Import app theme
import { ThemeContext } from './theme-context';

const themes = { light, dark };
console.reportErrorsAsExceptions = false;


const App = () => {

	const [theme, setTheme] = React.useState('dark');
	const currentTheme = themes[theme];

	const toggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
	};
	const themee = useTheme();
	console.log("I am theme", themee);
	return (
		<React.Fragment>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider mapping={mapping} theme={currentTheme}>
					<StatusBar backgroundColor={theme == "light" ? "white" : currentTheme["color-basic-800"] } barStyle={theme == "light" ? "dark-content" : "light-content"} />
					<Provider store={store}>
							<NavigationContainer ref={navigationRef}>
								<AppNavigator />
							</NavigationContainer>
					</Provider>
				</ApplicationProvider>
			</ThemeContext.Provider>
		</React.Fragment>
	);
};

export default App;
