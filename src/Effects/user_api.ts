import supabase from "./supabase";
import * as bcrypt from 'bcryptjs'; 

export const selectUserByEmail = async function(emailSearch:string){
    let { data: user, error } = await supabase.from('user').select("*").eq('email', emailSearch);
    if(error){
        console.error(error);
        throw new Error(`There is no user with the email address of ${emailSearch} !`);
    }
    return user;
}

export const insertUser = async function(email:string, password:string, name:string, lastLevel:string){
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword)

    const { data, error } = await supabase
    .from('user')
    .insert([
      { email, password:hashPassword, name, lastLevel },
    ])
    .select();

    if(error){
        console.error(error);
        throw new Error(`Could not do the insertion of the user!\nmail:${email}\npassword:${password}\nname:${name}\nlastLevel:${lastLevel}\n`);
    }

    return data;
}

export const comparePasswords = async(unhashedPass:string, hashedPass:string)=>{
    if (await bcrypt.compare(unhashedPass, hashedPass)){
        return true;
    }
    return false;
}

export const addExpiringCode = async (email:string, code:string, expire_at:string)=>{
    const { data, error } = await supabase.from('expiring_code').insert([
        { email, code, expire_at },
       ]).select();

    if(error){
      console.error(error);
      throw new Error("Could not insert the expiring_code!");
    }

    return data;
}