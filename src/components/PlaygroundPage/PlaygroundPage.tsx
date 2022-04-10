import "./PlaygroundPage.styles.css";

interface PlaygroundPageProps {
  children: React.ReactNode;
}

const PlaygroundPage = (props: PlaygroundPageProps) => {
  return <div className="playground-page">{props.children}</div>;
};

export default PlaygroundPage;
