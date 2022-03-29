let count = 0
let nodeInfoArr = []



//Mapping Color to SE Hex Codes
let colorCodesMap ={
  'green' :'#3dcd58', 
  'blue' : '#42b4e6', 
  'red' : 'red'
}

let rowNodeMap={}

//cyto structure
let cy = cytoscape({
  container: document.getElementById('cy'), // container to render in
  elements: [],
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#fff',
        "background-image": "green-user.png"
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#3dcd58',
        // 'arrow-scale': 3,
        // 'target-arrow-color': '#3dcd58',
        // 'target-arrow-shape': 'triangle',
        
        'font-size': '12px',
        'color': '#777'
      }
    },
    // {
    //   selector: "edge[arrow]",
    //   style: {
    //     'arrow-scale': 2,
    //     'target-arrow-color': '#3dcd58',
    //     'target-arrow-shape': 'triangle',
    //     'target-arrow-fill' : 'filled',
    //   }
    // },
    {
      selector: 'core',
      style: {
        'active-bg-color': 'blue'
      }
    }

  ],

  style: cytoscape.stylesheet()
    .selector('edge')
    .css({
      'width': 2,
      'line-color': '#3dcd58',
      // 'arrow-scale': 3, 
      // 'target-arrow-color': '#3dcd58',
      // 'target-arrow-shape': 'triangle',
      
      'font-size': '9px',
      'color': '#777'
    })

    // .selector("edge[arrow]")
    // .css({
    //   'arrow-scale': 2,
    //     'target-arrow-color': '#3dcd58',
    //     'target-arrow-shape': 'triangle',
    //     'target-arrow-fill' : 'filled',
    // })
    .selector('core')
    .css({
      'active-bg-color': 'blue'
    })
    .selector('node')
    .css({
      'background-color': '#fff',
      'text-valign': 'bottom',
      'text-halign': 'center',
      "background-image": "green-user.png",
      "background-width": "14px",
      "background-height": "14px",
      "label": "data(id)",
      "font-size": 12,
      "font-weight": 400,
      "color": "#676469",
    }),
    // .selector(':selected')
    // .css({
    //   'background-color': 'black',
    //   'line-color': 'black',
    //   'target-arrow-color': 'black',
    //   'source-arrow-color': 'black',
    //   'target-arrow-shape': 'triangle',
    //   'text-outline-color': 'black'
    // }),
  layout: {
    name: 'grid',
    rows: 1
  },

  zoomingEnabled: false,
  panningEnabled:false
  

}
);

console.log('cytoscape ',cy)

export {count, nodeInfoArr,  colorCodesMap, rowNodeMap, cy }