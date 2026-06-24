import type { Preview } from "@storybook/react-vite";
import { CssBaseline } from "@mui/material";
import { MemoryRouter } from "react-router-dom";
import { ColorModeProvider } from "../src/app/providers/ColorModeProvider";
import { installStorybookApiMocks } from "./mockApi";
import "../src/shared/i18n/i18n";
import "../src/styles/index.css";

installStorybookApiMocks();

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const routerParameters = context.parameters.router as
        | { initialEntries?: string[] }
        | undefined;
      const initialEntries = routerParameters?.initialEntries ?? ["/"];

      return (
        <MemoryRouter initialEntries={initialEntries}>
          <ColorModeProvider>
            <CssBaseline />
            <div style={{ padding: 16 }}>
              <Story />
            </div>
          </ColorModeProvider>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
