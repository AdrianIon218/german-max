import supabase from "./supabase";

export const insertMessage = async function (
  email: string,
  topic: string,
  message: string,
) {
  const { data, error } = await supabase
    .from("message")
    .insert({ email_sender: email, topic, message })
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not do the insertion of the message!");
  }

  return data;
};
