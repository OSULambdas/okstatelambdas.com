// Your family data (replace with your family information)
const familyData = {
    name: 'John Doe',
    children: [
        { name: 'Jane Doe', children: [] },
        { name: 'Bob Doe', children: [
            { name: 'Alice Doe', children: [] },
            { name: 'Charlie Doe', children: [] }
        ] },
        { name: 'Eva Doe', children: [] }
    ]
};

// Create a hierarchical tree layout
const treeLayout = d3.tree().size([800, 600]);

// Create a root node for the tree
const rootNode = d3.hierarchy(familyData);

// Apply the tree layout to the root node
treeLayout(rootNode);

// Create an SVG container
const svg = d3.select('#family-tree-section').append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${treeLayout.size()[0]}, ${treeLayout.size()[1]}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .append('g')
    .attr('transform', 'translate(50, 20)');

// Create links between nodes
const links = rootNode.links();

// Create a diagonal function to draw curved lines
const diagonal = d3.linkVertical()
    .x(d => d.x)
    .y(d => d.y);

// Draw links
svg.selectAll('.link')
    .data(links)
    .enter().append('path')
    .attr('class', 'link')
    .attr('d', diagonal);

// Draw nodes
const nodes = svg.selectAll('.node')
    .data(rootNode.descendants())
    .enter().append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x},${d.y})`);

// Draw circles for nodes
nodes.append('circle')
    .attr('r', 10);

// Add text labels for nodes
nodes.append('text')
    .attr('dy', '.35em')
    .attr('y', d => (d.children ? -20 : 20))
    .style('text-anchor', 'middle')
    .text(d => d.data.name);

// ... (continue with any additional customization)

// Optional: Add zooming functionality
const zoom = d3.zoom()
    .scaleExtent([0.5, 2])
    .on('zoom', () => {
        svg.attr('transform', d3.event.transform);
    });

svg.call(zoom);

