function Validation(values,){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if(values.id ===""){
        error.id ="Student ID should not be empty"
    }
    
    else{
        error.id=""
    }
    if(values.name ===""){
        error.name ="Fullname should not be empty"
    }
    
    else{
        error.name=""
    }
    if(values.email ===""){
        error.email ="Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email ="Email didn't match"
    }
    else{
        error.email=""
    }
    if(values.password ===""){
        error.password ="password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password ="password didn't match"
    }
    else{
        error.password=""
    }
    if(values.day ==="Day"){
        error.day ="day should not be empty"
    }
    
    else{
        error.day=""
    }
    if(values.month ==="Month"){
        error.month ="month should not be empty"
    }
    
    else{
        error.month=""
    }
    if(values.year ==="Year"){
        error.year ="year should not be empty"
    }
    
    else{
        error.year=""
    }
    if(values.gender ==="Gender"){
        error.gender ="grade should not be empty"
    }
    
    else{
        error.gender=""
    }
    if(values.major ==="Major"){
        error.major ="grade should not be empty"
    }
    
    else{
        error.major=""
    }
    if(values.grade ==="Grade"){
        error.grade ="grade should not be empty"
    }
    
    else{
        error.grade=""
    }
    if(values.tenlop ===""){
        error.tenlop ="class should not be empty"
    }
    
    else{
        error.tenlop=""
    }

    
    return error

}
export default Validation;