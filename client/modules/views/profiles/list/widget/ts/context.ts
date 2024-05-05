import React from 'react';

interface IContext {
	permissions: Map<string, Record<string, string>>;
}

export const ProfilesListContext = React.createContext({} as IContext);
export const useProfilesListContext = () => React.useContext(ProfilesListContext);
