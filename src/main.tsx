import ReactDOM from "react-dom/client";
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <FluentProvider theme={teamsLightTheme}>
      <App />
    </FluentProvider>,
);
