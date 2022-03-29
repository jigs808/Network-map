


// function hideLoading() {
//   loader.classList.remove("display");
// }
 

  
readJson()

   function readJson(){
    let reqBody = {
      "request": {
          "requestType": "Get",
          "requestAction": "GetAtackMapJson"
      }
    }
    
   let count = 0
   let reqBodyStr = JSON.stringify(reqBody);
   let firstRowBoxes = ''
   let BoxStr = ''
    $.ajax({
        type: "POST",
      // url: "https://n7tojee20h-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap",
      url: "https://2mww8tpa1j-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap-v2",
        data: reqBodyStr,
        success: function (data) {
            console.log(data)
            $.each(data, function (key, val) { 
              let id= key.substring(2)
              let newBox = `
                <div class="box" id="${key}" name="${val["name"]}">
                  <h2>${val["name"]}</h2>
                  
                  <a href="map.html" class ="view-edit">Open Map</a> <i class="delete-map-button fa fa-trash fa-2x " aria-hidden="true"></i>
                </div>
                 `
              if(count<3){
                firstRowBoxes += newBox
              }
              else{
                BoxStr =  BoxStr + newBox
              }
              count++
            })
            firstRowBoxes+= getHelp()
            $('.boxes').append(firstRowBoxes)
            BoxStr+= newAttackBox()
            $('.boxes-1').append(BoxStr)
         } 
            
    }
    );
   
    //  hideLoading();
    //  
}
  

  function newAttackBox(){
    $('#loading').hide()
    return `<div class="box" style="background-color: #fff; color: #3dcd58">
    <h2 style="color: #3dcd58">
      Add new attack profile
    </h2>
    <a class="create-new" href="map.html" style="color: #676469" ><i class="fa fa-plus" aria-hidden="true"style="margin-right: 5px; color: #3dcd58"></i>New Map</a>
  </div>`
    
  }
  function getHelp(){
    return `
    <div class="box help-faq">
          <h2>Help/FAQ</h2>
          <p>
            If you have any question<br />
            <a href="javascript:void(0)"> Click here</a> to get help
          </p>
        </div>
    
    `
}
  


function apiCallForMapDeletion(dataId){
  // var dataId = localStorage.getItem('fileId')
  console.log(dataId)
  
  let reqBody = {
    "request": {
        "requestType": "Put",
        "requestAction": "DeleteMap", 
        "mapId" : dataId 
    }
  }
 let reqBodyStr = JSON.stringify(reqBody);
  $.ajax({
      type: "POST",
    // url: "https://n7tojee20h-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap",
    url: "https://2mww8tpa1j-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap-v2",
      data: reqBodyStr,
      success: function (data) {
        console.log(data)
        
          window.location.href = "index.html"
      }
  });
}


// function apiCallForMapDeletion(dataId){

//     let reqBody = {
//       "request": {
//           "requestType": "Put",
//           "requestAction": "DeleteMap",
//           "mapId" : dataId
//       }
//     }
//    let reqBodyStr = JSON.stringify(reqBody);
//     $.ajax({
//         type: "POST",
//         url: "https://n7tojee20h-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap",
//         data: reqBodyStr,
//         success: function (data) {
//             console.log(data,'deleted')
//         }
//     });
//  }

$('body').on('click', '.delete-map-button', function() {
  let dname = $(this).parent().attr("name")
  let did = $(this).parent().attr("id")
  // alert('Map'+dId+'Will be deleted')
  if (confirm('Do you Want to delete Map name -->  ' + dname)) {
    console.log(did,dname)
    apiCallForMapDeletion(did)
    
  }

})


$('body').on('click', '.view-edit', function() {
  let dataId = $(this).parent().attr("id") 
  localStorage.setItem('fileId',dataId)
  // localStorage.setItem('fileId',dataId)         
  window.location.href ='map.html';            
  console.log(dataId)   
  
}
);

$('body').on('click', '.create-new', function() {
  localStorage.setItem('fileId','new')
  localStorage.setItem('date','new')
  window.location.href = 'map.html';
});

