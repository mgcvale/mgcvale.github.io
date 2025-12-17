import type { Component } from 'svelte';

export class ProjectEntry {
    id: number;
    englishName: string;
    portugueseName: string;
    englishDescription: string;
    portugueseDescription: string;
    years: string
    content: Component;

    public constructor(id: number, englishName: string, englishDescription: string, portugueseName: string, portugueseDescription: string, years: string, content: Component) {
        this.id = id;
        this.englishName = englishName;
        this.englishDescription = englishDescription;
        this.portugueseDescription = portugueseDescription;
        this.portugueseName = portugueseName;
        this.years = years;
        this.content = content;
    }
}