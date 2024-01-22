import { View } from "react-native";
import { Record } from "../../models/record";
import { VictoryLegend, VictoryPie } from "victory-native";
import { getChartData } from "../../utils/calculations";
import { COLORS } from "../../utils/color";

const Chart = ({ records }): { records: Record[] } => {
  const colors = [
    "#104d9d",
    "#0e3672",
    "#e61d7b",
    "#ef7858",
    "#fbb72c",
    "#f0e31a",
    "#4caf46",
    "#6cbf99",
    "#69a6db",
    "#d1d1d0",
  ];

  const chartData = getChartData(records);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <VictoryLegend
        x={115}
        y={100}
        height={100 + chartData.length * 30}
        width={400}
        padding={5}
        orientation="vertical"
        style={{
          title: { fontSize: 20 },
          data: {
            stroke: "black",
            strokeWidth: 1,
            fillOpacity: 0.8,
          },
          labels: { fontSize: 14 },
        }}
        colorScale={colors}
        data={chartData}
      />

      <VictoryPie
        colorScale={colors}
        data={chartData}
        width={500}
        padding={100}
        labels={[]}
        style={{
          data: {
            stroke: COLORS.border,
            strokeWidth: 1.5,
            fillOpacity: 0.8,
          },
          labels: {
            fontSize: 6,
            fill: COLORS.chartLabel,
            fontWeight: "bold",
          },
        }}
      />
    </View>
  );
};

export default Chart;
