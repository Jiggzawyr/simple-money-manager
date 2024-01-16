import { View } from "react-native";
import { Record } from "../../models/record";
import { VictoryPie } from "victory-native";
import { getChartData } from "../../utils/calculations";
import { COLORS } from "../../utils/color";

const Chart = ({ records }): { records: Record[] } => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <VictoryPie
        colorScale={[
          "aquamarine",
          "greenyellow",
          "lightcoral",
          "blueviolet",
          "chocolate",
          "darkcyan",
          "darkorchid",
          "gold",
        ]}
        data={getChartData(records)}
        width={500}
        padding={100}
        style={{
          data: {
            fillOpacity: 0.6,
            stroke: "black",
            strokeWidth: 1.5,
          },
          labels: {
            fontSize: 12,
            fill: COLORS.chartLabel,
            fontWeight: "bold",
          },
        }}
      />
    </View>
  );
};

export default Chart;
