import Button from "../Button/Button";
import "./PlaygroundPagesHeader.styles.css";

interface PlaygroundPagesHeaderProps {
  title: string;
  nextStep: () => void;
  prevStep: () => void;
  hasNextStep: boolean;
  hasPrevStep: boolean;
}

const PlaygroundPagesHeader = (props: PlaygroundPagesHeaderProps) => {
  return (
    <div className="playground-pages-header">
      <div className="playground-pages-header-action">
        {props.hasPrevStep ? (
          <Button onClick={props.prevStep} variant="secondary">
            BACK
          </Button>
        ) : null}
      </div>
      <div className="playground-pages-header-title">
        <h1>{props.title}</h1>
      </div>
      <div className="playground-pages-header-action">
        {props.hasNextStep ? (
          <Button onClick={props.nextStep} variant="secondary">
            NEXT
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PlaygroundPagesHeader;
