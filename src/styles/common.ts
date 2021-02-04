export const buttonLinkStyle = {
  background: "none",
  cursor: "pointer",
};

export const buttonStyle = {
  outline: 0,
  fontSize: "1rem",
  padding: ".375rem .75rem",
  textDecoration: "none",
  textTransform: "none",
  border: "1px solid transparent",
  borderRadius: ".25rem",
  textAlign: "center",
  "&.link": {
    extend: buttonLinkStyle,
  },
};
