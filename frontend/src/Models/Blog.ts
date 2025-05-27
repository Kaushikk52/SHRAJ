import { User } from "./User";

export type Blog = {
    id:string;
    type:BlogType;
    title:string;
    content:string;
    tags:string[];
    heroImage:string;
    images:string[];
    author:User;
    createdAt:Date;
    updatedAt:Date;
}

enum BlogType {
    PRODUCT = "PRODUCT",
    BLOG = "BLOG",
}