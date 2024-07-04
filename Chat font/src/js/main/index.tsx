import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import StoreContextProvider from '../utils/userStore'


import Main from "./main";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StoreContextProvider>
        <Main />
    </StoreContextProvider>
);
