import type { Component } from 'svelte';

export class ProjectEntry {
    name: string;
    description: string;
    years: string
    content: Component;

    public constructor(name: string, description: string, years: string, content: Component) {
        this.name = name;
        this.description = description;
        this.years = years;
        this.content = content;
    }
}