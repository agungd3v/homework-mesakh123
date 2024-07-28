import { writeFile, unlink } from "fs/promises";
import path from "path";

export const storeImage = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");

  try {
    await writeFile(
      path.join(process.cwd(), "public/images/" + filename),
      buffer
    );

    return {status: true, message: filename}
  } catch (error: any) {
    return {status: false, message: error.message};
  }
}

export const deleteImage = async (filename: string) => {
  try {
    await unlink(process.cwd() + "/public/images/" + filename);

    return {status: true, message: "Delete oke!"};
  } catch (error: any) {
    return {status: false, message: error.message};
  }
}