import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Archive from "./components/archive";
import RecordList from "./components/record-list";
import Chart from "./components/chart";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            switch (route.name) {
              case "Archive":
                iconName = focused ? "archive" : "archive";
                break;
              case "RecordList":
                iconName = focused ? "list-alt" : "list";
                break;
              case "Chart":
                iconName = focused ? "pie-chart" : "pie-chart-outlined";
                break;
            }
            return (
              <MaterialIcons
                name={iconName}
                size={20}
                color={focused ? "mediumvioletred" : "darkslateblue"}
              />
            );
          },
          showLabel: true,
          tabBarContentContainerStyle: {
            backgroundColor: "khaki",
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          },
          tabBarItemStyle: { height: 50 },
          tabBarLabelStyle: {
            fontSize: 10,
            width: "100%", // Ensure the labels take up the entire tab width
            margin: 0,
          },
          tabBarIconStyle: {
            alignItems: "center", // Center the icons vertically
            justifyContent: "center", // Center the icons horizontally
          },
          showIcon: true,
        })}
        initialRouteName="RecordList"
        tabBarPosition="bottom"
      >
        <Tab.Screen name="Archive" component={Archive} />
        <Tab.Screen name="RecordList" component={RecordList} />
        <Tab.Screen name="Chart" component={Chart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
