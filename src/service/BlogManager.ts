import type { Component } from "svelte";

export class BlogEntry {
    name: string;
    smallname: string
    year: number;
    month: number;
    description: string;
    blog: Component;

    public constructor(name: string, smallname: string, year: number, month: number, description: string, blog: Component) {
        this.smallname = smallname;
        this.name = name;
        this.year = year;
        this.month = month;
        this.description = description;
        this.blog = blog;
    }
}
