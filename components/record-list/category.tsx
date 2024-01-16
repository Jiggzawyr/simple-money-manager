import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExpensesCategory, IncomeCategory } from "../../models/record";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { COLORS } from "../../utils/color";

const iconSize = 18;
const iconColor = "olivedrab";

const Category = ({ recordCategory }: { recordCategory: string }) => {
  switch (recordCategory) {
    case IncomeCategory.SALARY:
      return (
        <MaterialIcons name="attach-money" size={iconSize} color={iconColor} />
      );
    case IncomeCategory.BONUS:
      return (
        <FontAwesome5
          name="money-bill-wave"
          size={iconSize}
          color={COLORS.recordIcon}
        />
      );
    case IncomeCategory.OTHER:
      return (
        <Foundation name="clipboard-notes" size={iconSize} color={iconColor} />
      );
    case ExpensesCategory.FOOD:
      return (
        <MaterialCommunityIcons
          name="food-croissant"
          size={18}
          color={COLORS.recordIcon}
        />
      );
    case ExpensesCategory.UTILITIES:
      return (
        <MaterialIcons
          name="lightbulb"
          size={iconSize}
          color={COLORS.recordIcon}
        />
      );
    case ExpensesCategory.RENT_MORTGAGE:
      return <Entypo name="home" size={iconSize} color={COLORS.recordIcon} />;
    case ExpensesCategory.TRANSPORTATION:
      return (
        <FontAwesome name="car" size={iconSize} color={COLORS.recordIcon} />
      );
    case ExpensesCategory.HEALTHCARE:
      return (
        <MaterialIcons
          name="healing"
          size={iconSize}
          color={COLORS.recordIcon}
        />
      );
    case ExpensesCategory.CLOTHING:
      return (
        <FontAwesome5
          name="hat-cowboy"
          size={iconSize}
          color={COLORS.recordIcon}
        />
      );
    case ExpensesCategory.TRAVEL:
      return (
        <FontAwesome name="plane" size={iconSize} color={COLORS.recordIcon} />
      );
    case ExpensesCategory.OTHER:
      return (
        <Foundation
          name="clipboard-notes"
          size={iconSize}
          color={COLORS.recordIcon}
        />
      );
  }
};

export default Category;
