import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

interface IContext {
    userStore: UserStore,
    deviceStore: DeviceStore
}

export const Context = createContext<IContext>({} as IContext);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Context.Provider value={{
        userStore: new UserStore(),
        deviceStore: new DeviceStore()
    }}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Context.Provider>
);
