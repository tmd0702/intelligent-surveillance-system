
// Softzone Base Styles
import colors from "assets/theme-dark/base/colors";
import borders from "assets/theme-dark/base/borders";
import boxShadows from "assets/theme-dark/base/boxShadows";

// Softzone Helper Function
import rgba from "assets/theme-dark/functions/rgba";

const { background, grey } = colors;
const { borderWidth, borderRadius } = borders;
const { xs } = boxShadows;

const card = {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundImage: "none",
      backgroundColor: background.card,
      backgroundClip: "border-box",
      border: `${borderWidth[1]} solid ${grey[800]}`,
      borderRadius: borderRadius.lg,
      boxShadow: xs,
      overflow: "visible",
    },
  },
};

export default card;
