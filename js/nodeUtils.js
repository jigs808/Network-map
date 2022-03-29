import { count, nodeInfoArr,  colorCodesMap, rowNodeMap, cy } from './data.js';


//es6 classes
export default class Node {

    constructor() {
        this.zoneALeft = this.zoneBLeft = this.zoneCLeft = this.zoneATop = this.zoneBTop = this.zoneCTop = 0;
        this.ZONE_A_LEFT = this.ZONE_A_RIGHT = this.ZONE_B_LEFT = this.ZONE_B_RIGHT =  this.ZONE_C_LEFT = this.ZONE_C_RIGHT = 0;
        this.ZONE_TOP =  this.ZONE_BOTTOM = 0; 
        this.PERSONA_SPACING = 40 // spacing betw each persona [horiz&&vertical]
        this.cyHt = this.cyWidth = 0;
    }

    calcHtWidth() {
        this.cyHt = $('#cy').innerHeight();
        this.cyWidth = $('#cy').innerWidth();
      
        //horizontal division 
        this.ZONE_A_LEFT = 20; 
        this.ZONE_A_RIGHT = this.cyWidth/3;
      
        this.ZONE_B_LEFT = this.ZONE_A_RIGHT + 20; 
        this.ZONE_B_RIGHT = 2 * this.cyWidth / 3;
      
        this.ZONE_C_LEFT = this.ZONE_B_RIGHT + 20; 
        this.ZONE_C_RIGHT = this.cyWidth - 20;
        
        //vertical division
        this.ZONE_TOP = 20
        this.ZONE_BOTTOM = this.cyHt - 20
        
        //ptrs
        this.zoneALeft = this.ZONE_A_LEFT
        this.zoneBLeft = this.ZONE_B_LEFT
        this.zoneCLeft = this.ZONE_C_LEFT
      
        this.zoneATop = this.zoneBTop = this.zoneCTop = this.ZONE_TOP  // zone = a/b/c top = 20, bottom = cyht-20
    }
      
    findUserSytem(type, color) {
        let persona = ''; 
        let typeIgnoreCase = type.toLowerCase(); 

        if (typeIgnoreCase == "user") {
          persona = (color == "green") ? "seUser" : (color == "red") ? "dataSubject" : "nonseUser";
        }
      
        else if(typeIgnoreCase == "system"){
          persona = (color == "green") ? "seSystem" : (color == "blue") ? "inScope" : "outOfScope";
      }
      
      return persona;
  }
    
    addImgAndLabelBasedOnType(userSystem, nodeName){
        //Mapping Persona to Img
        let userImgMap = {
            'dataSubject': 'red-user.png',
            'nonseUser': 'blue-user.png',
            'seUser': 'green-user.png',
            'inScope': 'in-scope.png',
            'outOfScope': 'out-scope.png',
            'seSystem': 'se-system.png',
        
        };  
    
        let img = userImgMap[userSystem];
        cy.style().selector(`node[id="${nodeName}"]`).style('background-image',`images/${img}`); // cache selector
        cy.style().selector(`node[id="${nodeName}"]`).style('label', `${nodeName}`);
      }
    
    addNode(rowNo) {
        let nodeName = nodeInfoArr[rowNo].nodeName
        let zone = nodeInfoArr[rowNo].zone
        let type = nodeInfoArr[rowNo].type
        let color = nodeInfoArr[rowNo].color
      
        if (zone == undefined || type == undefined || nodeName == undefined || color == undefined || nodeName=='') { // error checks
          return
        }
      
        let persona = this.findUserSytem(type, color) //find persona based on the color & type
        
        let xCoor, yCoor//define xcoor,ycoor for persona
      
        if (zone.toUpperCase() == "A") { // place the persona like in a matrix
          if(this.zoneATop < this.ZONE_BOTTOM){
            if(this.zoneALeft + 40 < this.ZONE_A_RIGHT){ 
                this.zoneALeft+= this.PERSONA_SPACING
            }
            else{
                this.zoneALeft = this.PERSONA_SPACING
                this.zoneATop+= 40
            }
          }
          xCoor = this.zoneALeft
          yCoor = this.zoneATop

        }         
      
        else if (zone.toUpperCase() == "B") {//se user - zone a - green
          if(this.zoneBTop < this.ZONE_BOTTOM){
            if(this.zoneBLeft + 40 < this.ZONE_B_RIGHT){
                this.zoneBLeft+= this.PERSONA_SPACING
            }
            else{
                this.zoneBLeft = this.ZONE_B_LEFT
                this.zoneBTop+= this.PERSONA_SPACING
            }
          }
          xCoor = this.zoneBLeft
          yCoor = this.zoneBTop
        }
      
        else if(zone.toUpperCase() == "C"){
          if(this.zoneCTop < this.ZONE_BOTTOM){
            if(this.zoneCLeft  + 40 < this.ZONE_C_RIGHT){
                this.zoneCLeft+= this.PERSONA_SPACING
            }
            else{
                this.zoneCLeft = this.ZONE_C_LEFT
                this.zoneCTop+= this.PERSONA_SPACING
            }
          }
          xCoor = this.zoneCLeft
          yCoor = this.zoneCTop
        }
      
        console.log(xCoor + " " + yCoor)
        cy.add([{ group: 'nodes', data: { id: nodeName, name: nodeName }, position: { x: xCoor, y: yCoor } }])
        this.addImgAndLabelBasedOnType(persona, nodeName)
        this.populateDropdownForEdges(nodeName)
    }
    
    populateDropdownForEdges(val){
      if(cy.json().elements.hasOwnProperty('nodes') == false) return;
      
      let jsonArr = cy.json().elements.nodes
      // console.log("jsonArr",jsonArr)
        $('select[name=D1]').each(function(){
          let tmp = $(this).find('option:selected').val() // selected val 
          //console.log(tmp)
          $(this).find('option').slice(1).remove() // empyt dd
    
          for(let i=0; i<jsonArr.length; i++){
            let option = cy.json().elements.nodes[i].data.name
            $(this).append('<option value="'+ option+'">'+ option+'</option>');
          }
    
          $(this).val(tmp);
        });
    }

    removeNode(nodeName) {
        cy.remove(`node[id="${nodeName}"]`);
        //populateDropdownForEdges()
    }
    
    nodeExists(rowObj) { // nope use cy.jsons to check 
        return rowObj.nodeName != undefined && rowObj.zone != undefined && rowObj.type != undefined
    }
}

export { Node };