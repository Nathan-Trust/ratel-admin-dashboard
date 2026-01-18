"use client";
import { ChangeEvent } from "react";

export interface FileModelData {
  name: string;
  url: string;
  file: File | null;
}

export class FileData implements FileModelData {
  name: string;
  url: string;
  file: File | null;

  constructor(data: FileModelData) {
    this.name = data.name;
    this.url = data.url;
    this.file = data.file;
  }

  static create(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      return new FileData({
        name: event.target.files[0].name,
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
    }
  }

  static createFromFiles(file: File) {
    return new FileData({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    });
  }

  static createAll(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const files = event.target.files;
      const newFiles: FileData[] = [];

      for (let i = 0; i < files.length; i++) {
        const item = files.item(i)!;
        newFiles.push(
          new FileData({
            name: item.name,
            url: URL.createObjectURL(item),
            file: item,
          }),
        );
      }

      return newFiles;
    }
  }
}
