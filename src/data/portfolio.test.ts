import { describe, it, expect } from "vitest";
import {
    techLogos,
    certificates,
    badges,
    featuredProjects,
    linuxProjects,
    ciscoProjects,
    projects,
} from "./portfolio";

describe("Portfolio Data Integrity", () => {
    it("techLogos have valid structure", () => {
        expect(techLogos.length).toBeGreaterThan(0);
        techLogos.forEach((logo) => {
            expect(logo.src).toBeTruthy();
            expect(logo.alt).toBeTruthy();
            expect(logo.title).toBeTruthy();
        });
    });

    it("certificates is not empty", () => {
        expect(certificates.length).toBeGreaterThan(0);
        certificates.forEach((cert) => {
            expect(cert.length).toBeGreaterThan(0);
        });
    });

    it("badges is not empty", () => {
        expect(badges.length).toBeGreaterThan(0);
    });

    it("featuredProjects have valid paths and labels", () => {
        expect(featuredProjects.length).toBeGreaterThan(0);
        featuredProjects.forEach((project) => {
            expect(project.path).toMatch(/^\//);
            expect(project.label).toBeTruthy();
            expect(project.description).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("linuxProjects have valid paths under /projekt/linux/", () => {
        expect(linuxProjects.length).toBeGreaterThan(0);
        linuxProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekt\/linux\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("ciscoProjects have valid paths under /projekt/cisco/", () => {
        expect(ciscoProjects.length).toBeGreaterThan(0);
        ciscoProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekt\/cisco\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("all project paths are unique", () => {
        const allPaths = [
            ...featuredProjects.map((p) => p.path),
            ...linuxProjects.map((p) => p.path),
            ...ciscoProjects.map((p) => p.path),
        ];
        const uniquePaths = new Set(allPaths);
        expect(uniquePaths.size).toBe(allPaths.length);
    });

    it("projects backward-compat array matches featuredProjects", () => {
        expect(projects).toEqual(featuredProjects.map((p) => p.label));
    });
});
