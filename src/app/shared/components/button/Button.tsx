import styles from "./styles.module.scss";

type ButtonProps = ( ILinkButton & {kind:'link'} | IBaseButton & {kind:'default'})

const ButtonKind = {
  link: LinkButton,
  toggle: ToggleButton,
  default: DefaultButton,
} as const;

interface IButton extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  text: string;
  kind: keyof typeof ButtonKind;
}

interface IBaseButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

interface ILinkButton extends IBaseButton {
  href: string;
}

function ToggleButton({ onClick, text, ...props }: IBaseButton) {
    
}

function DefaultButton({ onClick, text, ...props }: IBaseButton) {
  return (
    <button onClick={onClick} {...props}>
      {text}
    </button>
  );
}

function LinkButton({ href, text, ...props }: ILinkButton) {
  // WRAP IN THE BUTTON COMPONENT
  return (
    <button {...props}>
      <a href={href}>{text}</a>
    </button>
  );
}

export default function Button({
  onClick,
  text,
  kind,
  className,
  ...props
}: ButtonProps) {
  const ButtonComponent = ButtonKind[kind];

  <ButtonComponent text={text} {...props} href="" className=""/>
}
