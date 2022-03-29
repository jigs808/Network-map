import { count, nodeInfoArr,  colorCodesMap, rowNodeMap, cy } from './data.js';

export default class Edge {
      addEdge(edgeId, edgeSrc, edgeDest, edgeColor,edgeType) {
        cy.add([{ group: 'edges', data: { id: edgeId, source: edgeSrc, target: edgeDest } }]);
        this.setEdgeColor(edgeId, edgeColor);
        this.setEdgeType(edgeId, edgeType); 
      }
      
      setEdgeType(edgeId, edgeType){
        cy.style().selector(`edge[id="${edgeId}"]`).style('line-style', edgeType); 
      }

      setEdgeColor(edgeId, edgeColor){
        const seColorHexCodes = {
            'green' : '#3dcd58', 
            'blue' : '#47b4e6', 
            'red'  : 'red'
        }; 
        
        let hexCode = seColorHexCodes[edgeColor]; 
        cy.style().selector(`edge[id="${edgeId}"]`).style('line-color', hexCode); 
      }

      removeEdge(edgeId) {
        cy.remove(`edge[id="${edgeId}"]`);
      }
}    

export { Edge };