"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the data structure for the mindmap nodes
interface NodeData {
  name: string;
  children?: NodeData[] | null;
  _children?: NodeData[] | null;
}

const data: NodeData = {
  name: "Parts of Speech",
  children: [
    {
      name: "Noun",
      children: [
        {
          name: "Types of Nouns",
          children: [
            { name: "Proper Noun" },
            { name: "Common Noun" },
            { name: "Collective Noun" },
            { name: "Abstract Noun" },
          ],
        },
        {
          name: "Functions of Nouns",
          children: [
            { name: "Subject" },
            { name: "Object" },
            { name: "Predicate Nominative" },
          ],
        },
      ],
    },
    {
      name: "Adjective",
      children: [
        {
          name: "Types of Adjectives",
          children: [
            { name: "Descriptive" },
            { name: "Quantitative" },
            { name: "Demonstrative" },
          ],
        },
      ],
    },
    {
      name: "Verb",
      children: [
        {
          name: "Types of Verbs",
          children: [
            { name: "Action Verb" },
            { name: "Linking Verb" },
            { name: "Helping Verb" },
          ],
        },
        {
          name: "Tenses",
          children: [
            { name: "Present Tense" },
            { name: "Past Tense" },
            { name: "Future Tense" },
          ],
        },
      ],
    },
    {
      name: "Adverb",
      children: [
        { name: "Adverb of Time" },
        { name: "Adverb of Place" },
        { name: "Adverb of Manner" },
      ],
    },
    { name: "Pronoun" },
    { name: "Determiner" },
    { name: "Conjunction" },
    { name: "Preposition" },
    { name: "Interjection" },
  ],
};

const D3Mindmap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Define sizes and margins
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = 1600;
    const height = 3000;
    const duration = 750;

    // Remove old SVG to prevent duplicates
    d3.select(svgRef.current).select("svg").remove();

    // Create main SVG and group element
    const rootY = 100;
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style("overflow", "visible")
      .append("g")
      .attr("transform", `translate(${margin.left},${rootY})`);

    // Create D3 hierarchy from the data
    let i = 0; // This variable must be `let` as it is incremented
    const root = d3.hierarchy<NodeData>(data, (d) => d.children);
    root.x0 = 0;
    root.y0 = 0;

    // Define colors for the nodes
    const colors = [
      "#e74c3c", "#f39c12", "#f1c40f", "#2ecc71", "#3498db",
      "#9b59b6", "#34495e", "#1abc9c", "#e67e22",
    ];

    // Helper function to get color based on node depth
    const getColor = (d: d3.HierarchyNode<NodeData>) => {
      if (d.depth === 0) return "#34495e";
      const firstLevelAncestor = d
        .ancestors()
        .find((ancestor) => ancestor.depth === 1);
      if (firstLevelAncestor) {
        const index = root.children?.indexOf(firstLevelAncestor) ?? 0;
        return colors[index % colors.length];
      }
      return "#555";
    };

    // Helper function to wrap text for multiline display
    function wrapText(text: d3.Selection<SVGTextElement, d3.HierarchyNode<NodeData>, any, any>, width: number) {
      text.each(function () {
        const textEl = d3.select(this);
        const words = textEl.text().split(/\s+/).reverse();
        let line: string[] = [];
        let lineNumber = 0;
        const lineHeight = 1.1;
        const y = textEl.attr("y");
        const dy = parseFloat(textEl.attr("dy"));
        let tspan = textEl
          .text(null)
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", dy + "em");
        let word: string | undefined;
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));
          if ((tspan.node()?.getComputedTextLength() ?? 0) > (width - 20)) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = textEl
              .append("tspan")
              .attr("x", 0)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
      });
    }

    // Click handler to expand/collapse nodes
    const click = (_event: MouseEvent, d: d3.HierarchyNode<NodeData>) => {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    };

    // Main update function for the mindmap
    function update(source: d3.HierarchyNode<NodeData>) {
      // Correctly generate the tree layout and link data
      const treeData = d3.tree<NodeData>().size([height, width])(root);
      const nodes = treeData.descendants().reverse();
      const links = root.links(); // This is the correct way to get links

      // Set node positions
      nodes.forEach((d) => {
        d.y = d.depth * 250;
      });

      // Update the nodes
      const node = svg.selectAll<SVGGElement, d3.HierarchyNode<NodeData>>("g.node")
        .data(nodes, (d) => d.id || (d.id = ++i));

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
        .on("click", click);

      nodeEnter
        .append("rect")
        .attr("class", "node-rect")
        .attr("width", 160)
        .attr("height", 50)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("x", -80)
        .attr("y", -25)
        .style("fill", "#fff")
        .style("stroke-width", "2px")
        .style("stroke", getColor);

      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .text((d) => d.data.name)
        .call(wrapText, 150);

      // Merge new and old nodes
      const nodeUpdate = nodeEnter.merge(node);

      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      nodeUpdate
        .select(".node-rect")
        .style("fill", (d) => (d.depth === 0 ? "#2c3e50" : "#f0f0f0"))
        .style("stroke", getColor);

      nodeUpdate
        .select("text")
        .style("fill", (d) => (d.depth === 0 ? "white" : "#333"));

      // Transition exiting nodes to the parent's new position.
      node.exit()
        .transition()
        .duration(duration)
        .remove();

      // Update the links
      const link = svg.selectAll<SVGPathElement, d3.HierarchyPointLink<NodeData>>("path.link")
        .data(links, (d) => d.target.id);

      // Enter any new links at the parent's previous position.
      link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", () => {
          const o = { x: source.x0, y: source.y0 };
          return d3.linkHorizontal<any, { x: number; y: number }>()({ source: o, target: o });
        })
        .attr("stroke", (d) => getColor(d.target))
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .merge(link)
        .transition()
        .duration(duration)
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x)
        );

      // Transition exiting links to the parent's new position.
      link.exit().transition().duration(duration).remove();

      // Stash the old positions for transition.
      root.eachBefore((d) => {
        const node = d as any;
        node.x0 = node.x;
        node.y0 = node.y;
      });
    }

    // Start rendering the mindmap from the root
    update(root);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 bg-[#F5F5DC] min-h-screen">
      <h1 className="text-center text-4xl font-bold text-gray-800 mb-8 font-inter">
        Grammar Mindmap
      </h1>
      <div className="relative w-full max-h-[800px] overflow-auto bg-white p-4 rounded-xl shadow-lg border-2 border-gray-200">
        <style jsx>{`
          .node text {
            font-family: sans-serif;
            fill: #333;
            font-weight: 500;
          }
          .node-rect {
            cursor: pointer;
            transition: transform 0.2s ease-in-out;
          }
          .node-rect:hover {
            transform: scale(1.05);
          }
          .link {
            fill: none;
            stroke-width: 2px;
          }
        `}</style>
        <div ref={svgRef}></div>
      </div>
    </main>
  );
};

export default D3Mindmap;
