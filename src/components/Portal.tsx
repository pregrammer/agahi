import ReactDOM from "react-dom";

interface Prop {
  children: React.ReactNode;
}

const Portal = ({ children }: Prop) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("portal-root")!
  );
};

export default Portal;
