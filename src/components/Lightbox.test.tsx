import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Lightbox from "./Lightbox";

describe("Lightbox Component", () => {
    it("renders nothing when src is null", () => {
        const { container } = render(<Lightbox src={null} onClose={() => {}} />);
        expect(container.innerHTML).toBe("");
    });

    it("renders image when src is provided", () => {
        render(<Lightbox src="/test.jpg" onClose={() => {}} />);
        const img = screen.getByAltText("Vergrößerte Projektansicht");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/test.jpg");
    });

    it("renders custom alt text", () => {
        render(<Lightbox src="/test.jpg" alt="Custom Alt" onClose={() => {}} />);
        expect(screen.getByAltText("Custom Alt")).toBeInTheDocument();
    });

    it("calls onClose when backdrop is clicked", () => {
        const onClose = vi.fn();
        render(<Lightbox src="/test.jpg" onClose={onClose} />);
        const dialog = screen.getByRole("dialog");
        fireEvent.click(dialog);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose when close button is clicked", () => {
        const onClose = vi.fn();
        render(<Lightbox src="/test.jpg" onClose={onClose} />);
        const closeBtn = screen.getByLabelText("Vorschau schließen");
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalled();
    });

    it("calls onClose on Escape key press", () => {
        const onClose = vi.fn();
        render(<Lightbox src="/test.jpg" onClose={onClose} />);
        fireEvent.keyDown(document, { key: "Escape" });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("has correct ARIA attributes", () => {
        render(<Lightbox src="/test.jpg" onClose={() => {}} />);
        const dialog = screen.getByRole("dialog");
        expect(dialog).toHaveAttribute("aria-modal", "true");
        expect(dialog).toHaveAttribute("aria-label", "Bildvorschau");
    });
});
