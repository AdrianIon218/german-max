import supabase from "./supabase";

export const getCoursesInfo = async function(){
    let { data: courses, error } = await supabase.from('course').select('*');

    if(error){
        console.error(error);
        throw new Error(`Could not read the available courses`);
    }

    return courses;
}

