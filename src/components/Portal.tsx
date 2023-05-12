import ReactDOM from "react-dom";

interface Prop {
  children: React.ReactNode;
}

// for displaying modals properly, they should placed in another div than root.
const Portal = ({ children }: Prop) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("portal-root")!
  );
};

export default Portal;
