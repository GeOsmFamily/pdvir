import type { ContentImageType } from "../enums/ContentImageType";

interface ContentImage {
    preview: string;
    type: ContentImageType;
}
export interface ContentImageFromUserFile extends ContentImage {
    name: string;
    type: ContentImageType.CONTENT_IMAGE_FROM_USER_FILE;
    file: File;
}

export interface ContentImageFromUrl extends ContentImage {
    type: ContentImageType.CONTENT_IMAGE_FROM_URL;
    url: string;
}