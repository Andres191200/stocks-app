import { SORT_TYPES } from "../../utils/filter-types";
import styles from "./styles.module.scss";

type ButtonProps = ( ILinkButton & {kind:'link'} | IBaseButton & {kind:'default'} | IToggleButton & {kind: 'toggle'})

interface IBaseButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

interface ILinkButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href: string;
  anchorProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
}

interface IToggleButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  active: boolean;
}

function LinkButton({ href, text, anchorProps, ...props }: ILinkButton) {
  return (
    <button className={styles.buttonComponent} {...props}>
      <a href={href} {...anchorProps}>{text}</a>
    </button>
  );
}

function ToggleButton({ onClick, text, active, ...props }: IToggleButton) {
    return(
      <button className={`${styles.buttonComponent} ${active ? styles.active : ''}`} onClick={onClick} {...props}>
        {text}
      </button>
    )
}

function DefaultButton({ onClick, text, ...props }: IBaseButton) {
  return (
    <button className={styles.buttonComponent} onClick={onClick} {...props}>
      {text}
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
        case 'toggle':
            return <ToggleButton {...props} text={props.text} onClick={props.onClick} active={props.active}/>
    }
}
