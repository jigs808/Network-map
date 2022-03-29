
//imports
import {Node} from './nodeUtils.js';
import {count, nodeInfoArr, colorCodesMap, rowNodeMap, cy } from './data.js';
import { Edge } from './edgeUtils.js'; 
// import Pager from './Pagination';

//instantiate 
const node = new Node(); 
const edge = new Edge(); 

const loader = document.querySelector("#loading");
function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}
displayLoading()

node.calcHtWidth()
createNewOrLoadExisting()
$('.save-map-button').on('click', saveBtnClickModalPopUp)



function getTableColumnCount(){
  return $(`table> thead > tr:nth-child(2) > th`).length
}

cy.on('mouseup', function (e) {
  let tg = e.target;
  if (tg.group != undefined && tg.group() == 'nodes') {
      let w = cy.width();
      let h = cy.height();
      if (tg.position().x > w) tg.position().x = (w-200);
      if (tg.position().x < 0) tg.position().x = 100;
      if (tg.position().y > h) tg.position().y = (h-200);
      if (tg.position().y < 0) tg.position().y = 100;
  }
})

//delete the row && delete the node && modify dropdowns
$('body').on('click', '.delete-table-row-button', function (event) {

  let rowToBeDeleted = $(this).parent().parent() // button->td->tr
  let nodeToBeDeleted = $(this).parent().parent().find("td:first").text() // parent : td parent.parent : tr
  $(rowToBeDeleted).remove()
  node.removeNode(nodeToBeDeleted)
})

$('body').on('DOMSubtreeModified', 'tr td', function (event) {
  constructGraphFromInput(event.currentTarget)

  
})
const ChildPos = 2
$('.add-cn-btn').on('click', () => {
  var ThNodePos = parseInt($('#node').attr('colspan'))
  let nodeColspan = ThNodePos +1 ;
  // console.log('nodeColspan', nodeColspan)

  $('#node').attr('colspan', nodeColspan);
  let NextTH = ChildPos + nodeColspan
  
  // Change all next th class
  for (let index = NextTH; index < $(`table> thead > tr:nth-child(2) > th`).length; index++) {
    
    $(`table> thead > tr:nth-child(2) > th:eq(${index})`).attr('class', `th${index +1}`)
    $(`table> tbody > tr > td:eq(${index})`).attr('class', `td${index +1}`)
  }
 
  //Add th tag
  $(`table> thead > tr:nth-child(2) > th:eq(${ChildPos +ThNodePos})`).after(`<th class="th${NextTH}">Child Node</th>`);
  
  // Add td tag for each
  $("table > tbody > tr").each(function (i) {
    
    for (let index = NextTH; index < $(`table> thead > tr:nth-child(2) > th`).length; index++) {
      $(this).find(`td:eq(${index})`).attr('class', `td${index + 1}`)
    }
    $(this).find(`td:eq(${ChildPos + ThNodePos})`).after(returnFullyPopulatedDropdown('', NextTH));
  });

  $('select').select2();
})



$('.add-new-row-button').on('click', ()=>{
  let rows = $('tr').length-1
  createNewRow(rows-2)
  
})
   

// $('body').on('change', 'input[type=radio]', function (event) {
//   // let row = $(this).attr('id')
//   let rowNo = parseInt($(this).parent().parent().attr('class').substring(2)) 
//   // let nameAttr = $(this).attr('name')
//   let inType = $(this).val()
//   console.log(`row is  rowno is ${rowNo} nameAttr is  inType is ${inType}`)

// //   if (nameAttr == `color${rowNo}`) {
// //    addColor(rowNo, event.currentTarget)
// //    console.log("COlor target",event.currentTarget)
// //  }

// //   else if (nameAttr.split("-")[1].replace(/\d+/g, '') == "type") {
    
// //    let edgeNo = nameAttr.split("-")[0].replace(/\D/g, '')
// //    addTypeForEdge(rowNo, event.currentTarget, edgeNo)
// //  }

// //  else{
// //    let edgeNo = parseInt(nameAttr.split("-")[0].replace(/\D/g, ''))
// //    addColorForEdge(rowNo, event.currentTarget, edgeNo)
// //  }
 
// })

// let edgeNo = 0 
$('body').on('change', 'tr select', function (event) {
  let rowNo = parseInt($(this).parent().parent().attr('class').substring(2)) 
  
  let colNo = parseInt($(this).parent().attr('class').substring(2)) //($(this) : select;$(this).parent() : td.11
  let key = $('#inputs tr:nth-child(2)').find(`.th${colNo}`).text().trim()

  // let edgecol =  getTableColumnCount() - (4 + parseInt($('#node').attr('colspan')) ) 
  
  let dropdownValSelected = $(this).val()
  // let dropdownType = $(this).attr('label')
  let rowObj = nodeInfoArr[rowNo]
  if (key == "Source") {
    // need to change Math.ceil((colNo - 9<total column num>)/4<sub column num>) 
    // let edgeNo = parseInt($(`tbody > .tr0 > .td${colNo+2}`).attr('name').split("-")[0].replace(/\D/g, '')) + 1

    // let edgeNo = Math.ceil((colNo - edgecol) / 3)
    // console.log('Source > edgeNo', edgeNo)

    // if (nodeInfoArr[rowNo].hasOwnProperty(`src${edgeNo}`) == false) {
    //   nodeInfoArr[rowNo][`src${edgeNo}`] = undefined 
    //   nodeInfoArr[rowNo][`dest${edgeNo}`] = undefined
    //   nodeInfoArr[rowNo][`ecolor${edgeNo}`] = undefined
    //   nodeInfoArr[rowNo][`etype${edgeNo}`] = undefined
    //   nodeInfoArr[rowNo]["eCount"]++
    // } 
    
   
    // if (edgeExists(rowObj, edgeNo)) {
    //   edge.removeEdge(`eRow${rowNo}-Edge${edgeNo}`)
    //   nodeInfoArr[rowNo][`src${edgeNo}`] = dropdownValSelected
    //   cy.add([{ group: 'edges', data: { id: `eRow${rowNo}-Edge${edgeNo}`, source: nodeInfoArr[rowNo][`src${edgeNo}`], target: nodeInfoArr[rowNo][`dest${edgeNo}`] } }]);
    // }


    // else {
    //   nodeInfoArr[rowNo][`src${edgeNo}`] = dropdownValSelected 
    // }

    
  }

  else if (key == "Destination") {
    // need to change Math.ceil((colNo - 9<total column num>)/4<sub column num>)
    //edgeNo--

    
    if (dropdownValSelected != 'select') {

      let edgeNo = parseInt($(`tbody > .tr0 > .td${colNo+1}`).attr('name').split("-")[0].replace(/\D/g, ''))
  
      //let edgeNo = Math.ceil(((colNo-1) - edgecol) / 3)
      console.log('destination > edgeNo', edgeNo)
      

      if (nodeInfoArr[rowNo].hasOwnProperty(`src${edgeNo}`) == false) {
        nodeInfoArr[rowNo][`src${edgeNo}`] = undefined 
        nodeInfoArr[rowNo][`dest${edgeNo}`] = undefined
        nodeInfoArr[rowNo][`ecolor${edgeNo}`] = undefined
        nodeInfoArr[rowNo][`etype${edgeNo}`] = undefined
        nodeInfoArr[rowNo]["eCount"]++
      }

      if (edgeExists(rowObj, edgeNo)) {
        edge.removeEdge(`eRow${rowNo}-Edge${edgeNo}`)
        nodeInfoArr[rowNo][`src${edgeNo}`] = nodeInfoArr[rowNo].nodeName
        nodeInfoArr[rowNo][`dest${edgeNo}`] = dropdownValSelected
        cy.add([{ group: 'edges', data: { id: `eRow${rowNo}-Edge${edgeNo}`, source: nodeInfoArr[rowNo][`src${edgeNo}`], target: nodeInfoArr[rowNo][`dest${edgeNo}`] } }]);
      }
      else {
        nodeInfoArr[rowNo][`src${edgeNo}`] = nodeInfoArr[rowNo].nodeName
        nodeInfoArr[rowNo][`dest${edgeNo}`] = dropdownValSelected

        cy.add([{ group: 'edges', data: { id: `eRow${rowNo}-Edge${edgeNo}`, source: nodeInfoArr[rowNo][`src${edgeNo}`], target: nodeInfoArr[rowNo][`dest${edgeNo}`] } }]);
      }

      var SourceType = $(`tbody > .tr${rowNo} > .td1 > select`).val()

      for (let index = 0; index < nodeInfoArr.length; index++) {
        if (nodeInfoArr[index].nodeName == dropdownValSelected) {
          var DestinationType = $(`tbody > .tr${index} > .td1 > select`).val()
        }
        // const DestinationType = nodeInfoArr[index] ;
        
        
      }

    
      $(`tbody > .tr${rowNo} > .td${colNo-1}`).text( nodeInfoArr[rowNo].nodeName )
      $(`tbody > .tr${rowNo} > .td${colNo+1}`).text(`${SourceType} to ${DestinationType}`)
      console.log('source to dest types', `${SourceType} to ${DestinationType}`)
      addTypeForEdge(rowNo, `${SourceType} to ${DestinationType}`, edgeNo)
      
    } else {

      $(`tbody > .tr${rowNo} > .td${colNo-1}`).text('')
      $(`tbody > .tr${rowNo} > .td${colNo + 1}`).text('')
      console.log('val for select ',dropdownValSelected)
      
    }

  }

  else if (key == "Entity-Type") {
    // let dropdownType = $(this).text()
    console.log('dropdownVal', dropdownValSelected)
    
    addColor(rowNo, dropdownValSelected)
      
    console.log("COlor target", event.currentTarget)
    
    
  }
  // else if (key == "Edge-Type") {
	  
  //   let nameAttr = $(this).attr('name')
  //   let edgeNo = nameAttr.split("-")[0].replace(/\D/g, '')
  //   console.log('dropdownVal NameAttr  edge no', dropdownValSelected, nameAttr, edgeNo)
    
  //   addTypeForEdge(rowNo, dropdownValSelected, edgeNo)
    
  // }
  else if (key == "Child Node") { 
    let parentNodeName = rowObj.nodeName
    if (dropdownValSelected != 'select') {
      addChildNode(dropdownValSelected, parentNodeName)
    }
    else {
      node.addNode(rowNo)
    }
    
  }

  else if (key == "Zone") {
    // let dropdownType = $(this).text()
    console.log('dropdownVal', dropdownValSelected)
    
    addZone(rowNo, dropdownValSelected)
    
      
    console.log("ZOne target",event.currentTarget)
    
    
  }
  //console.log($(this).val())
  console.log(key, "<--key colno--> ", colNo)
})




// function addColorForEdge(rowNo, that, edgeNo) { // remove store add
//   let edgeColor = $(that).val()
   
//   edgeNo++
//   console.log(`edgecolr is ${edgeColor} edgeNo is ${edgeNo}`)
//   edge.removeEdge(`eRow${rowNo}-Edge${edgeNo}`, edgeColor) //`eRow2Edge1 2-> rowno 1 edge no 
//   nodeInfoArr[rowNo][`ecolor${edgeNo}`] = edgeColor
//   let src = nodeInfoArr[rowNo][`src${edgeNo}`]
//   let dest = nodeInfoArr[rowNo][`dest${edgeNo}`]
//   edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src , dest , edgeColor, '') 
// }

function addTypeForEdge(rowNo, type, edgeNo) { // remove store add

  // edgeNo++
  console.log(`edgetype is ${type} edgeNo is ${edgeNo}`)
  edge.removeEdge(`eRow${rowNo}-Edge${edgeNo}`)

  let src = nodeInfoArr[rowNo][`src${edgeNo}`]
  let dest = nodeInfoArr[rowNo][`dest${edgeNo}`]
  // look for edge type
  if (type == "SE User to SE User" || type == "SE User to Other User" || type == "Other User to Other User" || type == "Other User to SE User") {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "green"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "solid"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "green", "solid")
    
  } 
  else if (type == "SE User to SE System" || type == "SE System to SE User" || type == "SE System to SE System" || type == "SE System to Other User" || type == "Other User to SE System")  {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "green"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "dashed"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "green", "dashed")
    
  }
  else if (type == "SE User to Vendor User" || type == "Vendor User to SE User" || type == "Vendor User to Vendor User" || type == "Vendor User to Other User" || type == "Other User to Vendor User") {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "blue"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "solid"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "blue", "solid")
    
  }
  
  else if (type == "SE User to Vendor System" || type == "Vendor System to SE User" || type == "SE System to Vendor User" || type == "Vendor User to SE System" || type == "SE System to Vendor System" || type == "Vendor System to SE System" || type=="Vendor User to Vendor System" || type=="Vendor System to Vendor User" || type =="Vendor System to Vendor System" || type == "Vendor System to Other User" || type == "Other User to Vendor System") {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "blue"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "dashed"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "blue", "dashed")
    
  }
  else if (type == "SE User to Data Subject" || type == "Data Subject to SE User" || type =="Vendor User to Data Subject" || type =="Data Subject to Vendor User" || type == "Other User to Data Subject" || type == "Data Subject to Other User" || type == "Data Subject to Data Subject") {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "red"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "solid"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "red", "solid")
    
  }
  else if (type=="SE System to Data Subject" || type=="Data Subject to SE System" || type == "Vendor System to Data Subject" || type == "Data Subject to Vendor System") {
     
    nodeInfoArr[rowNo][`ecolor${edgeNo}`] = "red"
    nodeInfoArr[rowNo][`etype${edgeNo}`] = "dashed"
    edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src, dest, "red", "dashed")
    
  }
  // let edgeType = type
   
  // edgeNo++

  // edge.removeEdge(`eRow${rowNo}-Edge${edgeNo}`) //`eRow2Edge1 2-> rowno 1 edge no 
  // nodeInfoArr[rowNo][`etype${edgeNo}`] = edgeType
  // let src = nodeInfoArr[rowNo][`src${edgeNo}`]
  // let dest = nodeInfoArr[rowNo][`dest${edgeNo}`]
  // edge.addEdge(`eRow${rowNo}-Edge${edgeNo}`, src , dest , '',edgeType) 
  
  /*
  elected >select</option>
    
-----SE User to SE User</option>
 
-----SE User to SE System</option>
-----SE User to Vendor User</optio
------SE User to Other User</option
-------SE User to Data Subject</opti
-------SE User to Vendor System</opt
-------SE System to Data Subject</op
------SE System to SE System</optio
-------SE System to Other User</opti
-------SE System to Vendor User</opt
-------SE System to Vendor System
------Vendor User to Vendor System<
----Vendor User to Vendor User</o

------Vendor User to Other User</op
-----Vendor System to Other User</
---Vendor System to Vendor System
--------Vendor User to Data Subject</
-------Vendor System to Data Subject
-----Other User to Other User</opt
----Other User to Data Subject</o
-------Data Subject to Data Subject</select>   
     
  */
}

$('.delete-map-button').on('click', ()=>{
  apiCallForMapDeletion()
})

function returnFullyPopulatedDropdown(selectedOption, colNo){
  let jsonArr = cy.json().elements.nodes
  // console.log("jsonArr",jsonArr)
  
  let td = `<td class="td${+colNo} "><select name="D1"><option value="select">select</option>`
          
  for(let i=0; i<jsonArr.length; i++){
    let option = cy.json().elements.nodes[i].data.name
    td+= (selectedOption!=option)? '<option value="'+ option+'">'+ option+'</option>'
     :'<option value="'+selectedOption+'" selected>'+ selectedOption+'</option>'
  }
  $('select[name=D1]').select2();
 // console.log(td)
  return td + ` </select></td> `
  
}

function returnColorDivForNode(m, selectedOption) {

  const EntityList = [
    'SE User',
    'SE System',
  
    'Other User',
    'Vendor User',
    'Vendor System',
    
    'Data Subject'
  ]
   
  m = +m
 // console.log(rowNo + 1)
 let td =  `<td class="td${m - 1}"> <select class="select is-rounded" ><option value="select">select</option>`
              
  for (let i = 0; i < EntityList.length; i++) { 
    let option = EntityList[i]
    td+= (selectedOption!=option) ? '<option value="'+ option+'">'+ option+'</option>'
    :'<option value="'+selectedOption+'" selected>'+ selectedOption+'</option>'
  };
  
    return td + '</select></td> ' 
}

function returnTypeDivForEdge(m, rowNo, e, selectedOption) {
  
//   const EdgeList = [
//     'SE User to SE User',
//     'SE User to SE System',
//     'SE User to Vendor User',
//     'SE User to Other User',
//     'SE User to Data Subject',
//     'SE User to Vendor System',
//     'SE System to Data Subject',
//     'SE System to SE System',
//     'SE System to Other User',
//     'SE System to Vendor User',
//     'SE System to Vendor System',
//     'Vendor User to Vendor System',
//     'Vendor User to Vendor User',
//     'Vendor System to Vendor System',
//     'Vendor User to Other User',
//     'Vendor System to Other User',
//     'Vendor User to Data Subject',
//     'Vendor System to Data Subject',
//     'Other User to Other User',
//     'Other User to Data Subject',
//     'Data Subject to Data Subject'
//   ]
   
//   m = +m
//  // console.log(rowNo + 1)
//  let td = `<td class="td${m - 1}" ><select class="select is-rounded" name="edge${e}-type${rowNo}"><option value="select">select</option>`
        
//  for (let i = 0; i < EdgeList.length; i++) {
//   let option = EdgeList[i]
//   td+= (selectedOption!=option) ? '<option value="'+ option+'">'+ option+'</option>'
//   :'<option value="'+selectedOption+'" selected>'+ selectedOption+'</option>'
// };
//   return td + '</select></td> '
  
  var td = `<td class="td${m - 1}" name="edge${e}-type${rowNo}">${selectedOption}</td>`

  return td
  
}

function SourceText( index, text) {
  return `<td class="td${index}" >${text}</td>`
}
  
// adding new edges
$('.add-edge-btn').on('click', ()=>{ 
  let edgecol = parseInt($('#edge').attr('colspan'))
  // console.log('nodeColspan', nodeColspan)
  var edgeColspan =edgecol +3 ;
  $('#edge').attr('colspan', edgeColspan);
  // let src = $('#dyn-src option:selected').val()
  // let dest = $('#dyn-dest option:selected').val()
  let m = getTableColumnCount()
  // let rowNo = rowNodeMap[src] // to find the row no of the src;  selected attr must be added
  // console.log("rowNodeMap", rowNodeMap)

  
  
  // let eCount =  nodeInfoArr[rowNo].hasOwnProperty("eCount") == true?nodeInfoArr[rowNo]['eCount']:0
  let edgeNo = Math.ceil(( (edgeColspan+2) - 3) / 3) // get the proper calculation
  
  // console.log('edgeNo =  Math.ceil((m - 3)/3)',m,edgeNo)
  
  
  $(`table> thead > tr:nth-child(2) > th:eq(${m-1})`).attr('class',`th${m+2}`)
  $(`table> thead > tr:nth-child(2) > th:eq(${m-2})`).after(`<th class="th${m-1}">Source</th><th class="th${m}">Destination</th><th class="th${m+1}">Edge-Type</th>`)
  
  $("table > tbody > tr").each(function (i) { // append Source,e-dest, e-color, e-type for every row
    let rowNo = parseInt($(this).attr('class').substring(2)) 
    let tdStr = SourceText( m-1 , '' ) + returnFullyPopulatedDropdown('', m) + 
      returnTypeDivForEdge(m + 2, rowNo, edgeNo-1, '') // returnColorDivForEdge(m+2, rowNo, edgeNo-1) +
    
    $(this).find(`td:eq(${m-1})`).attr('class',`td${m+2}`)
    $(this).find(`td:eq(${m-2})`).after(tdStr);
  });

  $('select').select2();
  
  // console.log()
  
  // $(`.tr${rowNo} .td${m}  option[value="${src}"]`).attr("selected", "selected") // selected attr must be added for the edge youve added 
  // $(`.tr${rowNo} .td${m+1}  option[value="${dest}"]`).attr("selected", "selected")

  // console.log(rowNo)
  // console.log("jquery express",$(`#inputs .tr${rowNo} .td${m-3}`))
  // // console.log('eCount-edge',`Edge${eCount+1}`)
  
  // nodeInfoArr[rowNo][`src${eCount+1}`] = src
  // nodeInfoArr[rowNo][`dest${eCount+1}`] = dest
  // nodeInfoArr[rowNo][`ecolor${eCount+1}`] = '#3dcd58'
  // nodeInfoArr[rowNo][`type${eCount+1}`] = 'dashed'
  // nodeInfoArr[rowNo]["eCount"]++
  // edge.addEdge(`Edge${eCount+1}`, src, dest,'' ,'')
})



function getLocalStorageData() {
  let fileId = localStorage.getItem('fileId')
  console.log(fileId)
  return fileId
}

function createNewOrLoadExisting() {
  
    loadNewTable()
    $('#loading').hide()
  
}

function returnZone(m) {
   
  m = +m
 // console.log(rowNo + 1)
  return `
        <td class="td${m - 1}">
          
          
            <select class="select is-rounded" >
              <option value="select">select</option>
              <option >A</option>
              <option >B</option>
              <option >C</option>
              
            </select>
            
        </td>   
    `
}



// function returnColorDivForEdge(m, rowNo,e) {
   
//   m = +m
//  // console.log(rowNo + 1)
//   return `
//         <td class="td${m - 1}">
//           <div class="input-label">
//             <input type="radio" id="red-ec-${rowNo}" name="edge${e}-color${rowNo}" value="red" class="radio${rowNo}"><label for="red-ec-${rowNo}">Red</label>
//             <input type="radio" id="blue-ec-${rowNo}" name="edge${e}-color${rowNo}" value="blue" class="radio${rowNo}"><label for="blue-ec-${rowNo}">Blue</label>
//             <input type="radio" id="green-ec-${rowNo}" name="edge${e}-color${rowNo}" value="green" class="radio${rowNo}"><label for="green-ec-${rowNo}">Green</label>
//           </div>   
//         </td>       
//     `
// }


  

function loadNewTable() {
  let m = getTableColumnCount()
  // console.log("getTableColumnCount()",m)
  let tr0 = '<tr class="tr0">' 
  let e = 0
  for (let i = 0; i < m ; i++) {
    let key = $('#inputs tr:nth-child(2)').find(`.th${i}`).text().trim()
    // nested edge inputs
    
        // if (key == "Edge-Color") {
        
        //   tr0 += returnColorDivForEdge(i + 1, 0, e)

        // }
  
        // else
    if (key == "Edge-Type") {
       tr0 += returnTypeDivForEdge(i + 1, 0, e, '')
          e++
        }
        
    else if (key == "Destination" || key == 'Child Node') { //|| key == 'Child Node'
      tr0 += `<td class="td${i}">
        <select name="D1"> <option value="select">select</option></select>
      </td>`
    }
    else if(key=="Entity-Type"){
      tr0 += returnColorDivForNode(i+1,'')
      
    }
      
    else if (key == "Source") {
      tr0 += SourceText( i, '')
    }
      
    // else if (key == "Zone") {
    //   tr0+= returnZone(i+1)
    // }
      
    else if(key == "Delete-row"){
    tr0+= `
      <td class="td${i}">
        <i class="delete-table-row-button fa fa-trash fa-2x is-success is-focused" aria-hidden="true"></i>
        </td>`
    }
    // <button class="button is-success is-small is-focused is-rounded delete-table-row-button" style="height:25px">Delete</button>
    else{
        tr0 += `<td class="td${i}" contenteditable="true"></td> `
    } 
  }
  $('#inputs tbody').append(tr0)
  
  $('select').select2();

  

}

// function apiCallToGetExistingGraph(fileId) {
//   let reqBody = {
//     "request": {
//       "requestType": "Get",
//       "requestAction": "GetAtackMapJson"
//     }
//   }

//   $.ajax({
//     type: "POST",
//     url: "https://2mww8tpa1j-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap-v2",
//     data: JSON.stringify(reqBody),
//     success: function (data) {
//       console.log(data)
//       // console.log(data[fileId]['id'])
//       //var dataId = data[fileId]["id"]
//       localStorage.setItem('Graph', JSON.stringify(data))
//       let m = constructGraphFromJson(fileId, data)
//       constructTableFromJson(fileId, data, m)
//       constructNodeInfoArr(fileId, data)

//       node.populateDropdownForEdges()
//       $('select[name=D1]').select2();
//     }
//   });
// }

function constructGraphFromJson(fileId, data) {
  console.log(data[fileId])
  let maxEdges = 0

  //1st traversal : add nodes to avoid any excep
  $.each(data[fileId].graph, function (key, val) { // loop twice to add nodes since edges with d1 may not be created; alt:recursion system stack might overflow so no
    $.each(val, function (key1, val1) {
      console.log("LINE %#&",key1,val1)
      if (key1.trim() == "info") {
        cy.add([{ group: 'nodes', data: { id: val1.Name , name: val1.Name } , position: { x: +val1.xCoor, y: +val1.yCoor } }]);
        
        //let userSystem = node.findUserSytem(val1.Type, val1.Color)
        if (val1['Entity-Type'] == "SE User" || val1['Entity-Type'] == "Other User") {
          
          node.addImgAndLabelBasedOnType( node.findUserSytem('user', 'green') , val1.Name)
  
      
        }
        else if (val1['Entity-Type'] == "SE System" || val1['Entity-Type'] == "SE Application") {
          node.addImgAndLabelBasedOnType( node.findUserSytem('system', 'green') , val1.Name)
          
        }
        else if (val1['Entity-Type'] == "Vendor User") {
          node.addImgAndLabelBasedOnType( node.findUserSytem('user', 'blue') , val1.Name)
        }
        else if (val1['Entity-Type'] == "Vendor System" || val1['Entity-Type'] == "Vendor Application") {
          node.addImgAndLabelBasedOnType( node.findUserSytem('system', 'blue') , val1.Name)
          
        }
        else if (val1['Entity-Type'] == "Data Subject") {
          node.addImgAndLabelBasedOnType( node.findUserSytem('user', 'blue') , val1.Name)
        }
      }
    })
  })
 
  //2nd traversal : add childnodes, edges
  $.each(data[fileId].graph, function (key, val) { // add childNodes and edges in 2nd trav

    for(let i=0; i<val["childNodes"].length; i++){
      addChildNode(val["childNodes"][i], key)
    }

    if (val["edges"].length != 0) {
      let i=0
      $.each(val["edges"], function (key1, val1) {
        console.log("Edge1 " + key1,val1)
        
          

          // let edgeColor = (val1.hasOwnProperty("Edge-Color") == true) ? val1["Edge-Color"] : ''
          // let edgeType = (val1.hasOwnProperty("Edge-Type") == true) ? val1["Edge-Type"] : ''
        
        if (val1["Edge-Type"] == "SE User to SE User" || val1["Edge-Type"] == "SE User to Other User" || val1["Edge-Type"] == "Other User to Other User" || val1["Edge-Type"] == "Other User to SE User") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'green', 'solid')
        }
        else if (val1["Edge-Type"] == "SE User to SE System" || val1["Edge-Type"] == "SE System to SE User" || val1["Edge-Type"] == "SE System to SE System" || val1["Edge-Type"] == "SE System to Other User" || val1["Edge-Type"] == "Other User to SE System") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'green', 'dashed')
        }
        else if (val1["Edge-Type"] == "SE User to Vendor User" || val1["Edge-Type"] == "Vendor User to SE User" || val1["Edge-Type"] == "Vendor User to Vendor User" || val1["Edge-Type"] == "Vendor User to Other User" || val1["Edge-Type"] == "Other User to Vendor User") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'blue', 'solid')
        }
        else if (val1["Edge-Type"] == "SE User to Vendor System" || val1["Edge-Type"] == "Vendor System to SE User" || val1["Edge-Type"] == "SE System to Vendor User" || val1["Edge-Type"] == "Vendor User to SE System" || val1["Edge-Type"] == "SE System to Vendor System" || val1["Edge-Type"] == "Vendor System to SE System" || val1["Edge-Type"]=="Vendor User to Vendor System" || val1["Edge-Type"]=="Vendor System to Vendor User" || val1["Edge-Type"] =="Vendor System to Vendor System" || val1["Edge-Type"] == "Vendor System to Other User" || val1["Edge-Type"] == "Other User to Vendor System") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'blue', 'dashed')
        }
        else if (val1["Edge-Type"] == "SE User to Data Subject" || val1["Edge-Type"] == "Data Subject to SE User" || val1["Edge-Type"] =="Vendor User to Data Subject" || val1["Edge-Type"] =="Data Subject to Vendor User" || val1["Edge-Type"] == "Other User to Data Subject" || val1["Edge-Type"] == "Data Subject to Other User" || val1["Edge-Type"] == "Data Subject to Data Subject") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'red', 'solid')
        }
        else if (val1["Edge-Type"]=="SE System to Data Subject" || val1["Edge-Type"]=="Data Subject to SE System" || val1["Edge-Type"] == "Vendor System to Data Subject" || val1["Edge-Type"] == "Data Subject to Vendor System") {

          edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], 'red', 'dashed')
        }
        

          // edge.addEdge(val1["Edge-Id"], val1["Source"], val1["Destination"], edgeColor, edgeType)
          i++
      })
      
      maxEdges = Math.max(maxEdges, i)
      
    }
  })
  // console.log('maxEdges',maxEdges)
  return maxEdges
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function constructTableFromJson(fileId, data, m) { 
  let rowNo = -1
  
  let prevCols = getTableColumnCount()  // no of cols in orig table ie without any extra chilnodes, edges etc 
  console.log(`max for edges is ${m}`)
  // m = 4 + parseInt($('#node').attr('colspan')) + 3 * m;
  // console.log(m + "<--new col -- old col --> " + prevCols)
  // m = Math.max(m, prevCols)
  // m: no edges; can find constant by looping through table if u wanna be accurate

  
  
  var maxChild = 0
  
  $.each(data[fileId].graph, function (key, val) { // add childNodes and edges in 2nd trav

    maxChild = Math.max(maxChild ,val["childNodes"].length)
      
  })

  console.log('maxChild', maxChild)
  
  var totalcol = 4 + maxChild + 3 * m;
  console.log(totalcol + "<--new col -- old col --> " + prevCols)
  totalcol = Math.max(totalcol, prevCols)

  if (m!=0) {
    
    $('#edge').attr('colspan', m * 3);
  }
  
  if(totalcol > prevCols){ // edges ahve been added using button
    let newCols = ''

    console.log(`prev cols is ${prevCols} m is${totalcol}`)
    for(let i=prevCols; i<(totalcol-3); i+=3){
      console.log(`i is ${i}`)
      newCols += `<th class="th${i}">Source</th><th class="th${i + 1}">Destination</th><th class="th${i + 2}">Edge-Type</th>`
      
      
    }

    // console.log(newCols)
    $(`table> thead > tr:nth-child(2) > th:eq(${prevCols - 2})`).after(newCols)
    // $(`table> thead > tr:nth-child(2) > th:eq(${prevCols - 2})`).attr('class', `th${totalcol}`)
  }




  $.each(data[fileId].graph, function (key, val) { // looping thru each node "graph" :{"a" :{}, "b" :{}}
    // let edgeColorCol = {}
    // let edgeTypeCol  = {}
    let newRow = `<tr class="tr${rowNo + 1}">`
    let i = 0
    // let nodeColor
    

    
    $.each(val["info"], function (infoKey, infoVal) {
      if (i <= 2) { // name, type,zone,color
        if (i == 1) { // color is a div of radio btns
          // nodeColor = infoVal
          newRow += returnColorDivForNode( i + 1 , infoVal )
          
            // for(let i=0; i<jsonArr.length; i++){
            //   let option = cy.json().elements.nodes[i].data.name
            //   td+= (selectedOption!=option)? '<option value="'+ option+'">'+ option+'</option>'
            //   :'<option value="'+selectedOption+'" selected>'+ selectedOption+'</option>'
            // }
          // newRow +=
            
          //   returnColorDivForNode(i + 1)

          
        }
        else {
          newRow += `<td class="td${i}" contenteditable="true">${infoVal}</td>`
        }
      }
      else {
        return false
      }
      i++
    })
    
    // newRow += `
    //   <td class="td${i}">
    //     <button class="button is-success is-small is-focused is-rounded delete-table-row-button" style="height:25px">Delete</button>
    //   </td>` // delete button
    // newRow += `<td class="td${i}" contenteditable="true"></td>` //box s
    
    // i++

    // loop for Adding Child node Tags and shift other tags
    var ThNodePos = parseInt($('#node').attr('colspan')) //least number of child tags needed
    if ( ThNodePos < maxChild ) {
    for (let j = 0; j < val["childNodes"].length - 1; j++){
      
        $('#node').attr('colspan', j+2 );
        $(`table> thead > tr:nth-child(2) > th:eq(${i })`).after(`<th class="th${i}">Child Node</th>`);
        for (let index = (i+1) ; index < $(`table> thead > tr:nth-child(2) > th`).length; index++) {
          
          $(`table> thead > tr:nth-child(2) > th:eq(${index})`).attr('class', `th${index }`)
        }
      }
    }

    let j = -1
    if (maxChild != 0) {
      for ( j = 0; j < val["childNodes"].length ; j++){
      
        newRow += returnFullyPopulatedDropdown(val["childNodes"][j], i++)
        // returnFullyPopulatedDropdown(child, i++)
        // `<td class="td${i++}" contenteditable="true">${val["childNodes"][j]}</td> `
        
        
      }
    }

    while(j<maxChild){ // atleast number childnodes cols mst be there 
      newRow += returnFullyPopulatedDropdown('', i++)
      
        //`<td class="td${i++}" contenteditable="true"></td> `
        // returnFullyPopulatedDropdown('', i++)
      j++
    }

    // loop for Adding edge node Tags and shift other tags

    // var ThEdgePos = parseInt($('#edge').attr('colspan')) //least number of child tags needed
    // if ( ThEdgePos < (m*3)  ) {
      
      
    //   for (let j = 0; j < (val["edges"].length - 1); j++){
        
    //     $(`table> thead > tr:nth-child(2) > th:eq(${i+2})`).after(`<th class="th${i+3}">Source</th><th class="th${i+4}">Destination</th><th class="th${i+5}">Edge-Type</th>`)
        
    //     for (let index = (i+6) ; index < $(`table> thead > tr:nth-child(2) > th`).length; index++) {
          
    //       $(`table> thead > tr:nth-child(2) > th:eq(${index})`).attr('class', `th${index }`)
    //     }
    //   }
    //   $('#edge').attr('colspan', val["edges"].length*3 );
    // }
  
    
    
    let e = 0
    $.each(val["edges"], function (key1, val1) { //val[egdes] -> arr;  key->index val -> egde 
      //console.log("check edge src " + val1["Source"] + " " + val1["Destination"] + " " + i + " " + (i+1))
      
        console.log("Edge2 " + key1)
      let src = val1["Source"]
      let  dest = val1["Destination"]
      newRow += SourceText( i , src ) + returnFullyPopulatedDropdown(dest,i+1)

      // let edgeColor = (val1.hasOwnProperty("Edge-Color") == true)? val1["Edge-Color"] : 'green' //if edgecolor prop isnt selected, choose 3dcd
      // let edgeType = (val1.hasOwnProperty("Edge-Type") == true)? val1["Edge-Type"] : 'solid' 
      // edgeColorCol[i+2] =  [edgeColor, edgeType]
      // newRow += `<td class="td${i +2 } "><select ><option selected >${val1["Edge-Type"]}</option>`
      newRow += returnTypeDivForEdge(i + 3, rowNo + 1, e, val1["Edge-Type"]) 
      e++
      i+=3
    
    })
    
    console.log(` i after inserting rows is ${i}`)
    
    
    // console.log('')

    console.log(i + "<-- cols remaining before" )
    while (i < totalcol-1) { // if edge cols; for not option is selected
      newRow += SourceText( i , '' ) + returnFullyPopulatedDropdown('',i+1)
      // newRow += `<td class="td${i +3 } "><select name="D1"><option selected >${val1["Edge-Type"]}</option>`
      newRow += returnTypeDivForEdge(i + 3, rowNo + 1, e,'') 
      i+=3
      e++
      console.log(i + "<-- cols remaining after" )
    }
    
      newRow += `
      <td class="td${i}">
      <i class="delete-table-row-button fa fa-trash fa-2x is-success is-focused" aria-hidden="true"></i>
      </td>` // delete button
    
    $('#inputs tbody').append(newRow)
    // $(`.tr${rowNo + 1} .td3 input[type='radio'][value ='${nodeColor}']`).prop("checked", true) // check node color prop
    

    //select color, type in radio btns 
    // for(let key in edgeColorCol){
    //   console.log(edgeColorCol[key][0])
    //   $(`.tr${rowNo + 1} .td${key} input[type='radio'][value ='${edgeColorCol[key][0]}']`).prop("checked", true)
    //   $(`.tr${rowNo + 1} .td${(+key)+1} input[type='radio'][value ='${edgeColorCol[key][1]}']`).prop("checked", true)
    // }

    rowNo++
  })

}

function constructNodeInfoArr(fileId, data) {
  $('tbody').find('tr').each(function (rowNo, item1) { //skip 0th row[header], n-1th row[new & empty]{Jignesh added :not(:nth-child(2))}
    if (nodeInfoArr[rowNo] == undefined) { // creating a new Node / adding info to a new row
      nodeInfoArr[rowNo] = emptyRowObj()
    }

    let nodeName
    let m = $(this).find("td").length
    let e = 1

    $(this).find("td").each(function (i, item) {
      let key = $('#inputs tr:nth-child(2)').find(`.th${i}`).text().trim()
      let val = (key=='Destination' || key=='Entity-Type' || key == "Child Node") ? $(this).find('option:selected').val()  : $(this).text().trim();
	  
    //   let val = (key == 'Color' || key=='Edge-Color' || key=='Edge-Type') ? $(`.tr${rowNo} .td${i} input[type='radio']:checked`).val()
    //   :(key=='Source'|| key=='Destination')? $(this).find('option:selected').val()  : $(this).text().trim();
		
      let cNo = 0
      if (val != '' && val!= undefined && val!='select' && val !='Delete' ) {
        if (key == "Name") {
          nodeName = val
          nodeInfoArr[rowNo]["nodeName"] = val
			rowNodeMap[val] = rowNo
			nodeInfoArr[rowNo][camelize(key)] = val
        }
		else if (key == "Entity-Type") {
			if (val == "SE User" || val == "Other User") {
				console.log('This is constructNodeInfo type', val)
				
				  nodeInfoArr[rowNo]["color"] = "green"
				  nodeInfoArr[rowNo]["type"] = "user"
				
			  }
			  else if (val == "SE System" || val == "SE Application") {
				console.log('This is constructNodeInfo type', val)
				
				  nodeInfoArr[rowNo]["color"] = "green"
				  nodeInfoArr[rowNo]["type"] = "system"
				
			  }
			  else if (val == "Vendor User") {
				console.log('This is constructNodeInfo type', val)
				
				  nodeInfoArr[rowNo]["color"] = "blue"
				  nodeInfoArr[rowNo]["type"] = "user"
				
			  }
			  else if (val == "Data Subject") {
				console.log('This constructNodeInfo type', val)
				
				  nodeInfoArr[rowNo]["color"] = "red"
				  nodeInfoArr[rowNo]["type"] = "user"
				
			  }
			  else if (val == "Vendor System" || val == "Vendor Application") {
				console.log('This is constructNodeInfo type', val)
				
				  nodeInfoArr[rowNo]["color"] = "blue"
				  nodeInfoArr[rowNo]["type"] = "system"
				
			  }

		}
        else if (key == "Zone") { // zone  
          nodeInfoArr[rowNo][camelize(key)] = val
        }
        else if(key == "Child Node"){
          nodeInfoArr[rowNo][`child${cNo++}`] = val
		}
        else {
          if (key == 'Source') {
            console.log(`edge src ${i}`)
            nodeInfoArr[rowNo][`src${e}`] = val
            nodeInfoArr[rowNo][`eCount`]++
            rowNodeMap[val] = rowNo
            
		}
		else if(key=="Destination"){
		  console.log(`edge dest ${i}`)
		  nodeInfoArr[rowNo][`dest${e}`] = val
		}
          
		else if (key == "Edge-Type") {
            console.log(`edge color ${i}`)
            // val = $(`.tr${rowNo} > .td${i} > select`).val()
			  console.log(`key color is ${key} val is ${val}  i  is ${i}`)

			  if (val == "SE User to SE User" || val == "SE User to Other User" || val == "Other User to Other User") {
     
				nodeInfoArr[rowNo][`ecolor${e}`] = "green"
				nodeInfoArr[rowNo][`etype${e}`] = "solid"
				
				
			  } 
			  else if (val == "SE User to SE System" || val == "SE System to SE System" || val == "SE System to Other User") {
				 
				nodeInfoArr[rowNo][`ecolor${e}`] = "green"
				nodeInfoArr[rowNo][`etype${e}`] = "dashed"
				
				
			  }
			  else if (val == "SE User to Vendor User" || val == "Vendor User to Vendor User" || val == "Vendor User to Other User") {
				 
				nodeInfoArr[rowNo][`ecolor${e}`] = "blue"
				nodeInfoArr[rowNo][`etype${e}`] = "solid"
				
				
			  }
			  
			  else if (val == "SE User to Vendor System" || val == "SE System to Vendor User" || val == "SE System to Vendor System" || val=="Vendor User to Vendor System" || val =="Vendor System to Vendor System" || val == "Vendor System to Other User") {
				 
				nodeInfoArr[rowNo][`ecolor${e}`] = "blue"
				nodeInfoArr[rowNo][`etype${e}`] = "dashed"
				
				
			  }
			  else if (val == "SE User to Data Subject" || val =="Vendor User to Data Subject" || val == "Other User to Data Subject" || val == "Data Subject to Data Subject") {
				 
				nodeInfoArr[rowNo][`ecolor${e}`] = "red"
				nodeInfoArr[rowNo][`etype${e}`] = "solid"
				
			  }
			  else if (val=="SE System to Data Subject" || val == "Vendor System to Data Subject") {
				 
				nodeInfoArr[rowNo][`ecolor${e}`] = "red"
				nodeInfoArr[rowNo][`etype${e}`] = "dashed"
				
			  }

			  e++
			//   nodeInfoArr[rowNo][`ecolor${e}`] = val
			//   nodeInfoArr[rowNo][`etype${e}`] = val
          }
        //   else {
        //     // val = $(`.tr${rowNo} .td${i} select`).val()
        //     console.log(`edge type ${i}`)
        //     console.log(`key type is ${key} val is ${val}`)
        //     nodeInfoArr[rowNo][`etype${e}`] = val
        //     e++
        //   }
        }
      }
      //console.log(` ${i} key is ${key} val is ${val}`)
    });
    
  });
  console.log("Node Arr on rowNo", nodeInfoArr)
  console.log('cy.elements().jsons()', cy.elements().jsons() );
  $('select').select2();
  // hideLoading()
  $('#loading').hide();
}







// function apiCallForMapDeletion(){
//   var dataId = localStorage.getItem('fileId')
//   console.log(dataId)
  
//   let reqBody = {
//     "request": {
//         "requestType": "Put",
//         "requestAction": "DeleteMap", 
//         "mapId" : dataId 
//     }
//   }
//  let reqBodyStr = JSON.stringify(reqBody);
//   $.ajax({
//       type: "POST",
//       url: "https://2mww8tpa1j-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap-v2",
//       data: reqBodyStr,
//       success: function (data) {
//         console.log(data)
        
//           window.location.href = "index.html"
//       }
//   });
// }

$('#cancel-button').on('click', () => {
  $('.dropdown-addition-modal').removeClass('is-active');
  
})

$('#save-button').on('click', () => {
  let enteredValue = $('.dropdown-addition-modal input').val();
  if (enteredValue == '') {
    alert('Your Map name is empty')
  }
  apiCallForSave(enteredValue)
  $('.dropdown-addition-modal').addClass('is-active')
  $('.content').show();
  
  setTimeout(() => {
    
    window.open('index.html',"_self")
      
    
  }, 2000);
} )

$('.dropdown-addition-modal .modal-close').on('click', () => {
  $('.dropdown-addition-modal').removeClass('is-active');
})

function saveBtnClickModalPopUp() {
  $('.dropdown-addition-modal').addClass('is-active')
  $('.content').hide();
}

function constructGraphObjForSave() {
  let graphObj = {}
  $('tbody').find('tr').each(function (j, item1) { 
    // let m = getTableColumnCount()
    let infoObj = {}
    let edges = []
    let childNodes = []
    let edgeObj = {} 
    let nodeObj = { "info": infoObj,"childNodes" : childNodes,  "edges": edges }
    let nodeName
    
    let e = 0 // initial edge count
    if($(this).find(".td0").text()==''){
      return false
    }

    $(this).find("td").each(function (i, item) {
      
      let key = $('#inputs tr:nth-child(2)').find(`.th${i}`).text().trim()
      let val = (key=='Destination' || key=='Entity-Type' || key == "Child Node") ? $(this).find('option:selected').val()  : $(this).text().trim();
      
      
      
      if (val != '' && val!= undefined && val!='select' && val !='Delete' ) { //val=='select' in the dropdowns since we're traversing accross all
        console.log(`key is ${key} val is ${val}`)
        if (key == 'Name') {
          nodeName = val
        }
        if (i <= 2) {  // type zone color; CONSTANTS 
          infoObj[key] = val
        }
        else if(key.startsWith("Child Node")) {        //no.childNodes not const
          childNodes.push(val)
        }
          
        else {
          if (key == 'Source') {
            

            if (Object.keys(edgeObj).length != 0) {   // when u see the next edge-src ie 1 edge is traversed, push the cur obj, reset edge obj to empty
              
              edges.push(edgeObj)

              edgeObj = {};
              e++
            }
            
            edgeObj[`Edge-Id`] = `eRow${j}-Edge${e}`
            edgeObj[key] = val
            }
          else {
            console.log(`else key is ${key} val is ${val}`)
            edgeObj[key] = val
          }
        }
        // else {
        //   edgeObj[key] = val
        // }
         
        
      }
      console.log(` ${i} key is ${key} val is ${val}`)
    });
    

    if (Object.keys(edgeObj).length != 0) {// edge case -> last edge or only 1 edge
      edges.push(edgeObj)
    }
   // console.log(edges)
  //  console.log(infoObj)
    var xpos = cy.elements(`node[id="${nodeName}"]`).position('x')
    var ypos = cy.elements(`node[id="${nodeName}"]`).position('y')

    infoObj['xCoor'] = isNaN(xpos) ? Math.floor((Math.random() * 300) + 100) : xpos;
    infoObj['yCoor'] = isNaN(ypos) ? 20 : ypos;
    graphObj[nodeName] = nodeObj 

  });
  
  console.log("Full grapf object",graphObj)
  return graphObj
}

function apiCallForSave(name) {
  let graphObj = constructGraphObjForSave()
  console.log(graphObj)
  $('.dropdown-addition-modal').removeClass('is-active');
  let fileId = getLocalStorageData()
  fileId = (fileId == undefined) ? datetime : fileId
  let overallObj = {
    "name": name,
    "exists": (fileId == "new" ? "false" : "true"),
    "id": fileId, // to make deletion easier 
    "graph": graphObj


  }

  console.log("overallObj" , overallObj)

  let reqBody = {
    "request": {
      "requestType": "Put",
      "requestAction": "PutAtackMapJson",
      "jsonData": overallObj
    }
  }

  $.ajax({
    type: "POST",
    url: "https://2mww8tpa1j-vpce-06e2f74570634aea4.execute-api.eu-west-1.amazonaws.com/dev/attackmap-v2",
    data: JSON.stringify(reqBody),
    success: function (data) {
      console.log(data);
    }
  });

}

function createNewRow(rowNo) { // gets triggered on any row's 1st col edit
  console.log("new row")
  let m = getTableColumnCount()
  let lastRowNo = $('table tr:last').attr('class').substring(2) // get last row no
  let e =0

	console.log(' triggered and last row',rowNo ,lastRowNo)
  if(rowNo != lastRowNo){ // was triggered by wrong row
    return 
  }

  else { // was triggered by last row
    let newRow = `<tr class="tr${rowNo + 1}">`

    for (let i = 0; i < m; i++) {
      let key = $('#inputs tr:nth-child(2)').find(`.th${i}`).text().trim()

      // if(key=="Edge-Color"){
      //   newRow +=  returnColorDivForEdge(i+1, rowNo+1, e)
      // }

      // else 
      if (key == "Edge-Type") {
        newRow +=  returnTypeDivForEdge(i+1, rowNo+1, e,'')
        e++
      }

      else if(key=="Entity-Type"){
        newRow += returnColorDivForNode(i+1,'')
      }

      else if(key == "Delete-row"){
        newRow+= `
        <td class="td${i}">
          <i class="delete-table-row-button fa fa-trash fa-2x is-success is-focused" aria-hidden="true"></i>
          </td>`
      }

      else if( key=="Destination" || key == "Child Node"){ //|| key == "Child Node"
        newRow += `
        <td class="td${i}">
          <select name="D1"> <option value="select">select</option></select>
        </td> 
        `  
      }
        
        else if (key=="Source") {
          newRow += SourceText( i, '')
      }
        
        // else if (key == 'Zone') {
        //    newRow +=returnZone(i+1)
        // }
      else{
        newRow += `<td class="td${i}" contenteditable="true"></td>`
      } 
    }
    
   
    $('#inputs tbody').append(newRow)
  }
  // $('select[name=D1]').select2();
  $('select').select2();

  var rowpos = $('table tr:last').position();

  $('table').scrollTop(rowpos.top);
  // console.log('rowpos',rowpos,'rowpos.top',rowpos.top)
}



function addColor(rowNo, EntityType) {
  rowNo = parseInt(rowNo)
  let rowObj = nodeInfoArr[rowNo]
  if (EntityType == "SE User" || EntityType == "Other User") {
    console.log('This is se other user type', EntityType)
    // let color = "green"
    // let type = "user"
    if (node.nodeExists(rowObj)) {
      console.log("remove se user")
      node.removeNode(rowObj.nodeName)
      // nodeInfoArr[rowNo][key] = $(that).text()
      // node.removeNode(nodeInfoArr[rowNo].nodeName)
      nodeInfoArr[rowNo]["color"] = "green"
      nodeInfoArr[rowNo]["type"] = "user"
      node.addNode(rowNo) // add a node after you specify the color
    }
    else {
      nodeInfoArr[rowNo]["color"] = "green"
      nodeInfoArr[rowNo]["type"] = "user"
    }
  }
  else if (EntityType == "SE System" || EntityType == "SE Application") {
    console.log('This is se other user type', EntityType)
    
    if (node.nodeExists(rowObj)) {
      console.log("remove se sys")
      node.removeNode(rowObj.nodeName)
      // nodeInfoArr[rowNo][key] = $(that).text()
      // node.removeNode(nodeInfoArr[rowNo].nodeName)
      nodeInfoArr[rowNo]["color"] = "green"
      nodeInfoArr[rowNo]["type"] = "system"
      node.addNode(rowNo) // add a node after you specify the color
    }
    else {
      nodeInfoArr[rowNo]["color"] = "green"
      nodeInfoArr[rowNo]["type"] = "system"
    }
  }
  else if (EntityType == "Vendor User") {
    console.log('This is se other user type', EntityType)
    // let color = "green"
    // let type = "user"
    if (node.nodeExists(rowObj)) {
      console.log("remove ven user")
      node.removeNode(rowObj.nodeName)
      // nodeInfoArr[rowNo][key] = $(that).text()
      // node.removeNode(nodeInfoArr[rowNo].nodeName)
      nodeInfoArr[rowNo]["color"] = "blue"
      nodeInfoArr[rowNo]["type"] = "user"
      node.addNode(rowNo) // add a node after you specify the color
    }
    else {
      nodeInfoArr[rowNo]["color"] = "blue"
      nodeInfoArr[rowNo]["type"] = "user"
    }
  }
  else if (EntityType == "Data Subject") {
    console.log('This is se other user type', EntityType)
    // let color = "green"
    // let type = "user"
    if (node.nodeExists(rowObj)) {
      console.log("remove Data Subject")
      node.removeNode(rowObj.nodeName)
      // nodeInfoArr[rowNo][key] = $(that).text()
      // node.removeNode(nodeInfoArr[rowNo].nodeName)
      nodeInfoArr[rowNo]["color"] = "red"
      nodeInfoArr[rowNo]["type"] = "user"
      node.addNode(rowNo) // add a node after you specify the color
    }
    else {
      nodeInfoArr[rowNo]["color"] = "red"
      nodeInfoArr[rowNo]["type"] = "user"
    }
  }
  else if (EntityType == "Vendor System" || EntityType == "Vendor Application") {
    console.log('This is se other user type', EntityType)
    // let color = "green"
    // let type = "user"
    if (node.nodeExists(rowObj)) {
      console.log("remove vendor")
      node.removeNode(rowObj.nodeName)
      // nodeInfoArr[rowNo][key] = $(that).text()
      // node.removeNode(nodeInfoArr[rowNo].nodeName)
      nodeInfoArr[rowNo]["color"] = "blue"
      nodeInfoArr[rowNo]["type"] = "system"
      node.addNode(rowNo) // add a node after you specify the color
    }
    else {
      nodeInfoArr[rowNo]["color"] = "blue"
      nodeInfoArr[rowNo]["type"] = "system"
    }
  }
  
}

// function addZone(rowNo, EntityZone) {

//   rowNo = parseInt(rowNo)
//   let rowObj = nodeInfoArr[rowNo]
//   if (node.nodeExists(rowObj)) {
//     console.log("remove Zone")
//     node.removeNode(rowObj.nodeName)
//     nodeInfoArr[rowNo]["zone"] = EntityZone
//     node.addNode(rowNo)
//   }
//   else {
//     nodeInfoArr[rowNo]["zone"] = EntityZone
//   }
  
// }


function edgeExists(rowObj, edgeNo) {
  return rowObj[`src${edgeNo}`] != undefined && rowObj[`dest${edgeNo}`] != undefined
}

function emptyRowObj(name, zone, type,color) {
  return {
    "nodeName": name,
    "zone": zone,
    "type": type,
    "color": color, 
    "eCount" : 0
  }
}

function addChildNode(child, parent) {
  
    
  cy.elements(`node[id="${child}"]`).move({parent: `${parent}`});
  cy.style().selector(`node[id="${parent}"]`).style('background-image', `images/oval.png`)
  
}

function constructGraphFromInput(that) {
  let rowNo = parseInt($(that).parent().attr('class').substring(2)) 
  let colNo = parseInt($(that).attr('class').substring(2))
  // let key = $('#inputs tr:nth-child(2)').find(`.th${colNo}`).text().trim()
  // let m = getTableColumnCount()
  
  if (nodeInfoArr[rowNo] == undefined) { // creating a new Node / adding info to a new row
    nodeInfoArr[rowNo] = emptyRowObj()
  }

  let rowObj = nodeInfoArr[rowNo]
  if (colNo == 0) {  //name
    rowNodeMap[$(that).text()] = rowNo
    if (node.nodeExists(rowObj)) { 
      node.removeNode(rowObj.nodeName)
      nodeInfoArr[rowNo].nodeName = $(that).text()
      // $(`tbody > .tr${rowNo} > .td3`).after(SourceText( 4 , $(that).text()))
      node.addNode(rowNo)
    }
    else {
      nodeInfoArr[rowNo].nodeName = $(that).text()
      // $(`tbody > .tr${rowNo} > .td3`).after(SourceText( 4 , $(that).text()))
    }
    
    node.populateDropdownForEdges($(that).text())
    // createNewRow(rowNo)
  }

  else if (colNo == 2) { // no type, only zone
    let key = $('#inputs tr:nth-child(2)').find(`.th${colNo}`).text().trim().toLowerCase()  // type zone  
    if (node.nodeExists(rowObj)) {
      // console.log("remove")
      node.removeNode(rowObj.nodeName)
      nodeInfoArr[rowNo][key] = $(that).text()
      node.addNode(rowNo)
    }
    else {
      nodeInfoArr[rowNo][key] = $(that).text()
    }
    // console.log('This is Node Arr', nodeInfoArr)
    // console.log('This is rowNodeMap',rowNodeMap)

    
  }

  // else if(key.startsWith("Child Node")==true){
  //   let childNodeName = $(that).text()
  //   let parentNodeName = rowObj.nodeName
  //   let cNo = key.replace(/\D/g, '')

  //   if (nodeInfoArr[rowNo].hasOwnProperty(`child${cNo}`) == false) {
  //     nodeInfoArr[rowNo][`child${cNo}`] = $(that).text()
  //   }

  //   addChildNode(childNodeName, parentNodeName)
  // }
  
}









