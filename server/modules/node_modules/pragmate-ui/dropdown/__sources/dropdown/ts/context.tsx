import React, { useContext, PropsWithChildren } from "react";
const DropdownContext = React.createContext(null);
export const useDropdownContext = () => useContext(DropdownContext);

type props = { isToggle?: boolean; onToggle: any; isClose: boolean };
export /*bundle*/ function DropdownProvider(props: PropsWithChildren<props>): React.ReactElement {
  const { children, isToggle, onToggle, isClose } = props;
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const value = {
    showMenu,
    setShowMenu,
    isToggle,
    onToggle,
    isClose,
  };
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}
