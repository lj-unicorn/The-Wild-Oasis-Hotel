import supabase from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  // console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function createEditCabin(newCabin, id) {
  // Only get the file if it's not a string (i.e., it's a File or FileList)
  const imageFile = typeof newCabin.image === "string" ? null : newCabin.image;

  let imageName, imagePath;
  if (imageFile) {
    imageName =
      `${Math.floor(Math.random() * 1e9)}-${imageFile.name}`.replaceAll(
        "/",
        ""
      );
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  } else {
    imageName = null;
    imagePath = newCabin.image; // existing image URL
  }

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    if (id) {
      throw new Error("Cabin could not be edited");
    } else {
      throw new Error("Cabin could not be created");
    }
  }

  // Only upload if a new file was selected
  if (imageFile) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, imageFile);

    if (storageError) {
      await query.delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Cabin could not be uploaded and cabin was not created");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
