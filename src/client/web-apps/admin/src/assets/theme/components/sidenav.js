
// Softzone base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";


import pxToRem from "assets/theme/functions/pxToRem";

const { white } = colors;
const { borderRadius } = borders;

const sidenav = {
  styleOverrides: {
    root: {
      width: pxToRem(222),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(222),
      backgroundColor: white.main,
      height: `calc(100vh - ${pxToRem(16)})`,
      margin: pxToRem(8),
      borderRadius: borderRadius.lg,
      border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};

export default sidenav;
