const common_utils = {

    setDataInLocalStorage : function(key, val){
        localStorage.setItem(`${key}`, val);
    },

    getDataFromLocalStorage : function(key){
        return localStorage.getItem(key); 
    },

    redirect : function(page){
        window.location.href = `${page}`;
    },
    //true/false boolean
    changeDisplayProperty : function(selector, status){

        if(status == true) 
            $(`${selector}`).css('display', 'block');
    
        else 
            $(`${selector}`).css('display', 'none');
    
     }, 

     setText : function(selector, val){
        $(`${selector}`).text(val); 
     }
    
}

export { common_utils };

