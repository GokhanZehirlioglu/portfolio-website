import { describe, it, expect } from "vitest";
import {
    techLogos,
    certificates,
    badges,
    networkingProjects,
    linuxAdminProjects,
    microsoftEnterpriseProjects,
    cloudSecurityProjects,
    homelabProjects,
    portfolioCategories,
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

    it("portfolioCategories has 4 categories", () => {
        expect(portfolioCategories.length).toBe(4);
        const ids = portfolioCategories.map(c => c.id);
        expect(ids).toContain('networking');
        expect(ids).toContain('sysadmin');
        expect(ids).toContain('cloud');
        expect(ids).toContain('homelab');
    });

    it("networkingProjects have valid paths under /projekte/networking/", () => {
        expect(networkingProjects.length).toBeGreaterThan(0);
        networkingProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekte\/networking\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("linuxAdminProjects have valid paths under /projekte/linux/", () => {
        expect(linuxAdminProjects.length).toBeGreaterThan(0);
        linuxAdminProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekte\/linux\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("cloudSecurityProjects have valid paths under /projekte/cloud/", () => {
        expect(cloudSecurityProjects.length).toBeGreaterThan(0);
        cloudSecurityProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekte\/cloud\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("homelabProjects have valid paths under /projekte/homelab/", () => {
        expect(homelabProjects.length).toBeGreaterThan(0);
        homelabProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekte\/homelab\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("microsoftEnterpriseProjects have valid paths under /projekte/microsoft/", () => {
        expect(microsoftEnterpriseProjects.length).toBeGreaterThan(0);
        microsoftEnterpriseProjects.forEach((project) => {
            expect(project.path).toMatch(/^\/projekte\/microsoft\//);
            expect(project.label).toBeTruthy();
            expect(project.logos.length).toBeGreaterThan(0);
        });
    });

    it("all project paths are unique", () => {
        const allPaths = [
            ...networkingProjects.map((p) => p.path),
            ...linuxAdminProjects.map((p) => p.path),
            ...microsoftEnterpriseProjects.map((p) => p.path),
            ...cloudSecurityProjects.map((p) => p.path),
            ...homelabProjects.map((p) => p.path),
        ];
        const uniquePaths = new Set(allPaths);
        expect(uniquePaths.size).toBe(allPaths.length);
    });

    it("backward-compat exports filter only active status", () => {
        // featuredProjects = active homelab projects
        featuredProjects.forEach(p => expect(p.status).toBe('active'));
        // linuxProjects = active linux projects
        linuxProjects.forEach(p => expect(p.status).toBe('active'));
        // ciscoProjects = active networking projects
        ciscoProjects.forEach(p => expect(p.status).toBe('active'));
    });

    it("projects backward-compat array matches featuredProjects", () => {
        expect(projects).toEqual(featuredProjects.map((p) => p.label));
    });

    it("every project has a valid status", () => {
        const allProjects = [
            ...networkingProjects,
            ...linuxAdminProjects,
            ...microsoftEnterpriseProjects,
            ...cloudSecurityProjects,
            ...homelabProjects,
        ];
        allProjects.forEach((p) => {
            expect(['active', 'coming-soon', 'planned']).toContain(p.status);
        });
    });
});
