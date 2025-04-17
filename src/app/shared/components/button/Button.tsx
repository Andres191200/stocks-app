import styles from "./styles.module.scss";

type ButtonProps = ( ILinkButton & {kind:'link'} | IBaseButton & {kind:'default'})

const ButtonKind = {
  link: LinkButton,
  toggle: ToggleButton,
  default: DefaultButton,
} as const;

interface IBaseButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}

interface ILinkButton extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  href: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
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

function LinkButton({ href, text, anchorProps, ...props }: ILinkButton) {
  // WRAP IN THE BUTTON COMPONENT
  return (
    <button {...props}>
      <a href={href} {...anchorProps}>{text}</a>
    </button>
  );
}

export default function Button(props: ButtonProps) {
    const {kind} = props;
    switch(kind){
        case 'link':
            return <LinkButton {...props} text={props.text} href={props.href} anchorProps={props.anchorProps}/>
        case 'default':
            return <DefaultButton {...props} text={props.text} onClick={props.onClick} />
    }
}
