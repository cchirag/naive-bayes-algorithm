import "./Button.styles.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={`button button--${props.variant}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
