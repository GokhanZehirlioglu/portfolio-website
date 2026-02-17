import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Smoke Test", () => {
    it("renders without crashing", () => {
        const { container } = render(<App />);
        expect(container).toBeTruthy();
    });

    it("renders the home page by default", async () => {
        render(<App />);
        const headings = await screen.findAllByText(/gökhan zehirlioglu/i);
        expect(headings.length).toBeGreaterThan(0);
    });
});
