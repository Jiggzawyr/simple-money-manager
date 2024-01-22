import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Archive from "./archive/archive";
import RecordList from "./record-list/record-list";
import Chart from "./chart/chart";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ExpensesCategory, Record, RecordType } from "../models/record";
import { retrieveSummaries } from "../utils/storage";
import { getSummary } from "../utils/calculations";
import { Summary, SummaryStatus } from "../models/summary";
import { COLORS } from "../utils/color";

const Tab = createMaterialTopTabNavigator();

const Wrapper = () => {
  const recordsTest: Record[] = [];
  for (let i = 0; i < 15; i++) {
    recordsTest.push({
      id: i,
      name: "Name " + i,
      type: RecordType.EXPENSE,
      category: ExpensesCategory.HOUSING,
      amount: 1000 * i,
      date: new Date(),
    });
  }

  const [summary, setSummary] = useState<Summary>({});
  const [summaries, setSummaries] = useState<Summary[]>([]);

  // Load summaries when the component mounts
  useEffect(() => {
    retrieveSummaries().then((summaries) => {
      if (summaries.length === 0) {
        console.log("No saved summaries");
        const newSummary: Summary = getSummary([]);
        newSummary.status = SummaryStatus.ACTIVE;
        summaries.push(newSummary);
      }
      console.log("***summaries***");
      console.log(summaries);
      setSummaries(summaries);
      const activeSummary = summaries.find(
        (summary) => summary.status === SummaryStatus.ACTIVE
      );
      setSummary(activeSummary);
    });
  }, []);

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
              case "Records":
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
                color={focused ? COLORS.tabIconFocused : COLORS.tabIcon}
              />
            );
          },
          showLabel: true,
          tabBarContentContainerStyle: {
            backgroundColor: COLORS.tabBackground,
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          },
          tabBarItemStyle: { height: 50 },
          tabBarLabelStyle: {
            fontSize: 10,
            width: "100%", // Ensure the labels take up the entire tab width
            margin: 0,
            color: COLORS.text,
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
        <Tab.Screen name="Archive">
          {(props) => (
            <Archive
              summaries={summaries}
              setSummary={setSummary}
              setSummaries={setSummaries}
              navigation={props.navigation}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Records">
          {() => (
            <RecordList
              summary={summary}
              summaries={summaries}
              setSummary={setSummary}
              setSummaries={setSummaries}
              navigation={undefined}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Chart">
          {() => <Chart records={summary.records} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Wrapper;
